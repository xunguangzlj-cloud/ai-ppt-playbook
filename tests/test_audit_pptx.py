"""用最小包与故障注入检查审计行为，不证明PowerPoint视觉或完整Schema兼容性。"""

import json
import subprocess
import sys
import tempfile
import unittest
import zipfile
from pathlib import Path

SCRIPT = Path(__file__).resolve().parents[1] / "skills/ai-ppt-playbook/scripts/audit_pptx.py"
P = "http://schemas.openxmlformats.org/presentationml/2006/main"
A = "http://schemas.openxmlformats.org/drawingml/2006/main"
R = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
REL = "http://schemas.openxmlformats.org/package/2006/relationships"


def fixture(path, *, text="原始文字", note="讲者备注", order=(1, 2), media=b"asset", missing_media=False, bad_rid=False, malformed=False):
    parts = {
        "[Content_Types].xml": '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"/>',
        "_rels/.rels": f'<Relationships xmlns="{REL}"><Relationship Id="r1" Type="{R}/officeDocument" Target="ppt/presentation.xml"/></Relationships>',
        "ppt/presentation.xml": f'<p:presentation xmlns:p="{P}" xmlns:r="{R}"><p:sldIdLst>' + "".join(f'<p:sldId id="{255+i}" r:id="r{i}"/>' for i in order) + '</p:sldIdLst></p:presentation>',
        "ppt/_rels/presentation.xml.rels": f'<Relationships xmlns="{REL}">' + "".join(f'<Relationship Id="r{i}" Type="{R}/slide" Target="slides/slide{i}.xml"/>' for i in (1, 2)) + '</Relationships>',
        "ppt/slides/slide1.xml": f'<p:sld xmlns:p="{P}" xmlns:a="{A}" xmlns:r="{R}"><p:sp><p:txBody><a:p><a:r><a:t>{text}</a:t></a:r></a:p></p:txBody></p:sp><a:tbl/><a:blip r:embed="{"missing" if bad_rid else "image"}"/></p:sld>',
        "ppt/slides/slide2.xml": f'<p:sld xmlns:p="{P}" xmlns:a="{A}"><a:t>第二页</a:t></p:sld>',
        "ppt/slides/_rels/slide1.xml.rels": f'<Relationships xmlns="{REL}"><Relationship Id="image" Type="{R}/image" Target="../media/image.png"/><Relationship Id="notes" Type="{R}/notesSlide" Target="../notesSlides/notes1.xml"/></Relationships>',
        "ppt/notesSlides/notes1.xml": f'<p:notes xmlns:p="{P}" xmlns:a="{A}"><p:sp><p:nvSpPr><p:nvPr><p:ph type="body"/></p:nvPr></p:nvSpPr><p:txBody><a:p><a:r><a:t>{note}</a:t></a:r></a:p></p:txBody></p:sp></p:notes>',
        "ppt/media/image.png": media,
    }
    if missing_media:
        parts.pop("ppt/media/image.png")
    if malformed:
        parts["ppt/slides/slide2.xml"] = "<损坏"
    with zipfile.ZipFile(path, "w") as package:
        for name, content in parts.items():
            package.writestr(name, content)


class AuditTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.root = Path(self.tmp.name)
        self.source = self.root / "source.pptx"
        self.result = self.root / "result.pptx"
        fixture(self.source)

    def tearDown(self):
        self.tmp.cleanup()

    def audit(self, *args):
        run = subprocess.run([sys.executable, "-X", "utf8", str(SCRIPT), str(self.result), *map(str, args)], capture_output=True, text=True, encoding="utf-8")
        return run.returncode, json.loads(run.stdout)

    def test_valid_and_preserved(self):
        fixture(self.result)
        code, report = self.audit("--expected-slides", 2, "--compare-source", self.source, "--require-same-media", "--require-native-table-slide", 1)
        self.assertEqual(code, 0)
        self.assertEqual(report["slides"][0]["tables"], 1)

    def test_layout_whitespace_is_allowed(self):
        fixture(self.result, text="原始\n文字")
        self.assertEqual(self.audit("--compare-source", self.source)[0], 0)

    def test_missing_media(self):
        fixture(self.result, missing_media=True)
        self.assertEqual(self.audit()[0], 1)

    def test_unknown_relation_id(self):
        fixture(self.result, bad_rid=True)
        self.assertTrue(any("关系ID缺失" in x for x in self.audit()[1]["issues"]))

    def test_text_change(self):
        fixture(self.result, text="被改写的文字")
        self.assertEqual(self.audit("--compare-source", self.source)[0], 1)

    def test_notes_change(self):
        fixture(self.result, note="被删除的讲稿")
        self.assertTrue(any("notes不同" in x for x in self.audit("--compare-source", self.source)[1]["issues"]))

    def test_media_change(self):
        fixture(self.result, media=b"different-asset")
        self.assertEqual(self.audit("--compare-source", self.source, "--require-same-media")[0], 1)

    def test_slide_order_uses_presentation(self):
        fixture(self.result, order=(2, 1))
        self.assertEqual(self.audit()[1]["slides"][0]["part"], "ppt/slides/slide2.xml")
        self.assertEqual(self.audit("--compare-source", self.source)[0], 1)

    def test_page_count(self):
        fixture(self.result)
        self.assertEqual(self.audit("--expected-slides", 3)[0], 1)

    def test_native_table_required_on_exact_slide(self):
        fixture(self.result)
        self.assertEqual(self.audit("--require-native-table-slide", 2)[0], 1)

    def test_native_chart_required(self):
        fixture(self.result)
        self.assertEqual(self.audit("--require-native-chart-slide", 1)[0], 1)

    def test_invalid_xml(self):
        fixture(self.result, malformed=True)
        self.assertEqual(self.audit()[0], 1)

    def test_invalid_zip(self):
        self.result.write_text("不是PPTX", encoding="utf-8")
        self.assertEqual(self.audit()[0], 1)


if __name__ == "__main__":
    unittest.main()
