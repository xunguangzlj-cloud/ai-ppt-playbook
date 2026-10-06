"""检查PPTX包与设计优化任务的内容保留；不代替视觉或完整Schema检查。"""

import argparse
import hashlib
import json
import posixpath
import re
import sys
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

NS = {
    "a": "http://schemas.openxmlformats.org/drawingml/2006/main",
    "p": "http://schemas.openxmlformats.org/presentationml/2006/main",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    "c": "http://schemas.openxmlformats.org/drawingml/2006/chart",
}


def relation_part(owner):
    return posixpath.join(posixpath.dirname(owner), "_rels", posixpath.basename(owner) + ".rels")


def resolve_target(owner, target):
    if target.startswith("/"):
        return target.lstrip("/")
    return posixpath.normpath(posixpath.join(posixpath.dirname(owner), target))


def normalized_text(root):
    return re.sub(r"\s", "", "".join(node.text or "" for node in root.findall(".//a:t", NS)))


def inspect_pptx(path):
    issues = []
    with zipfile.ZipFile(path) as package:
        names = {name for name in package.namelist() if not name.endswith("/")}
        if bad := package.testzip():
            issues.append(f"ZIP CRC损坏：{bad}")
        roots = {}
        for name in sorted(names):
            if name.endswith((".xml", ".rels")):
                try:
                    roots[name] = ET.fromstring(package.read(name))
                except ET.ParseError as error:
                    issues.append(f"XML无法解析：{name}：{error}")
        relationships = {}
        for name, root in roots.items():
            if not name.endswith(".rels"):
                continue
            if name == "_rels/.rels":
                owner = ""
            else:
                parent, basename = posixpath.split(name)
                owner = posixpath.join(posixpath.dirname(parent), basename[:-5])
            mapping = {}
            for rel in root:
                target = rel.attrib.get("Target", "")
                external = rel.attrib.get("TargetMode") == "External"
                resolved = target if external else resolve_target(owner, target)
                mapping[rel.attrib["Id"]] = (rel.attrib.get("Type", ""), resolved, external)
                if not external and resolved not in names:
                    issues.append(f"内部引用目标缺失：{name} → {resolved}")
            relationships[owner] = mapping
        for owner, root in roots.items():
            if not owner.endswith(".xml"):
                continue
            for node in root.iter():
                for key, value in node.attrib.items():
                    if key in {f"{{{NS['r']}}}id", f"{{{NS['r']}}}embed", f"{{{NS['r']}}}link"}:
                        if value not in relationships.get(owner, {}):
                            issues.append(f"关系ID缺失：{owner}：{value}")
        for required in ("[Content_Types].xml", "ppt/presentation.xml", "_rels/.rels"):
            if required not in roots:
                issues.append(f"必要包部件缺失或无法解析：{required}")
        slides = []
        presentation = roots.get("ppt/presentation.xml")
        if presentation is not None:
            for number, item in enumerate(presentation.findall("./p:sldIdLst/p:sldId", NS), 1):
                rid = item.attrib.get(f"{{{NS['r']}}}id")
                rel = relationships.get("ppt/presentation.xml", {}).get(rid)
                if rel is None or rel[1] not in roots:
                    issues.append(f"第{number}页无法解析")
                    continue
                owner, root = rel[1], roots[rel[1]]
                notes = []
                for rel_type, target, external in relationships.get(owner, {}).values():
                    if not external and rel_type.endswith("/notesSlide") and target in roots:
                        for shape in roots[target].findall(".//p:sp", NS):
                            placeholder = shape.find(".//p:ph", NS)
                            if placeholder is not None and placeholder.attrib.get("type") == "body":
                                notes.append(normalized_text(shape))
                slides.append({
                    "number": number, "part": owner, "text": normalized_text(root),
                    "notes": "".join(notes), "text_shapes": len(root.findall(".//p:sp/p:txBody", NS)),
                    "tables": len(root.findall(".//a:tbl", NS)),
                    "charts": len(root.findall(".//c:chart", NS)),
                    "pictures": len(root.findall(".//p:pic", NS)),
                })
        media = {hashlib.sha256(package.read(name)).hexdigest() for name in names if name.startswith("ppt/media/")}
    return {"path": str(Path(path).resolve()), "sha256": hashlib.sha256(Path(path).read_bytes()).hexdigest(),
            "slides": slides, "media": media, "issues": issues}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("pptx", type=Path)
    parser.add_argument("--expected-slides", type=int)
    parser.add_argument("--compare-source", type=Path)
    parser.add_argument("--require-same-media", action="store_true")
    parser.add_argument("--require-native-table-slide", type=int, action="append", default=[])
    parser.add_argument("--require-native-chart-slide", type=int, action="append", default=[])
    args = parser.parse_args()
    if args.require_same_media and not args.compare_source:
        parser.error("--require-same-media需要--compare-source")
    try:
        result = inspect_pptx(args.pptx)
        if args.expected_slides is not None and len(result["slides"]) != args.expected_slides:
            result["issues"].append(f"页数不符：预期{args.expected_slides}，实际{len(result['slides'])}")
        for key, requested in (("tables", args.require_native_table_slide), ("charts", args.require_native_chart_slide)):
            for number in requested:
                if number < 1 or number > len(result["slides"]) or not result["slides"][number - 1][key]:
                    result["issues"].append(f"第{number}页没有要求的原生对象：{key}")
        if args.compare_source:
            source = inspect_pptx(args.compare_source)
            result["source_sha256"] = source["sha256"]
            result["issues"].extend(f"源文件：{issue}" for issue in source["issues"])
            if len(source["slides"]) != len(result["slides"]):
                result["issues"].append("保留对照：页数不同")
            for original, current in zip(source["slides"], result["slides"]):
                for key in ("text", "notes"):
                    if original[key] != current[key]:
                        result["issues"].append(f"保留对照：第{current['number']}页{key}不同")
            if args.require_same_media and source["media"] != result["media"]:
                result["issues"].append("保留对照：嵌入媒体哈希集合不同")
        result["unique_media_count"] = len(result.pop("media"))
        for slide in result["slides"]:
            slide.pop("text")
            slide.pop("notes")
        result["status"] = "pass" if not result["issues"] else "fail"
        result["scope"] = "包引用、展示页序和原生对象统计；可选文字/备注/媒体对照。未验证完整Schema、视觉、字体、图表数据或目标应用。"
        print(json.dumps(result, ensure_ascii=False, indent=2))
        return 0 if result["status"] == "pass" else 1
    except (OSError, zipfile.BadZipFile, ET.ParseError, KeyError) as error:
        print(json.dumps({"status": "fail", "issues": [str(error)]}, ensure_ascii=False))
        return 1


if __name__ == "__main__":
    sys.exit(main())
