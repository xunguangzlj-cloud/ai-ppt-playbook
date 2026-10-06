/* 《迷魂记》课堂展示 PPT 案例构建脚本
 * 证据与逻辑驱动方法 + 原生可编辑路线的完整实例（14页 · 现场讲述型 · 五人分工）
 *
 * 运行: npm install pptxgenjs && node build.js
 * 资产（剧照/海报/校名图）为可选项：放置到对应路径后自动嵌入，
 * 缺失时跳过（生成纯排版版本）。路径见下方 STILLS / REF 常量。
 */
const pptxgen = require("pptxgenjs");
const fs = require("fs");

const W = 13.33, H = 7.5, M = 0.62;
const BG = "FBFAF8", DARK = "16232B", PRIM = "1E6B5E", ACC = "C2492F";
const TEXT = "24282B", MUT = "6E757B", HAIR = "D9DDDB", TINT = "EAF1EE";
const OND = "EDEFEC", ONDM = "93A7A1", RING = "35544C";
const ZH = "微软雅黑", EN = "Georgia";

const STILLS = "../vertigo-stills/";     // 可选：影片剧照目录
const REF = "../ref_media/";             // 可选：校名图（image3 绿色版 / image4 白色版）

const have = (p) => fs.existsSync(p);
function img(s, path, opts) {
  if (have(path)) s.addImage({ path, ...opts });
}

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.author = "课堂展示小组";
pres.title = "《迷魂记》Vertigo —— 伊伯特影评三重解读";

const bu = () => ({ code: "2022", indent: 12 });

function light() {
  const s = pres.addSlide();
  s.background = { color: BG };
  addSYSU(s, false);
  return s;
}
function dark() {
  const s = pres.addSlide();
  s.background = { color: DARK };
  addSYSU(s, true);
  return s;
}
function addSYSU(s, dark_) {
  if (dark_) {
    img(s, REF + "image4.png", { x: (W - 2.2) / 2, y: 0.52, w: 2.2, h: 1.005 });
  } else {
    img(s, REF + "image3.png", { x: W - M - 1.35, y: 0.42, w: 1.35, h: 0.62 });
  }
}
function rings(s, cx, cy, r0, n, gap, color, wpt) {
  for (let i = 0; i < n; i++) {
    const r = r0 + i * gap;
    s.addShape(pres.shapes.OVAL, {
      x: cx - r, y: cy - r, w: 2 * r, h: 2 * r,
      fill: { type: "none" },
      line: { color: color, width: wpt },
    });
  }
}
function eyebrow(s, t, dark_) {
  s.addText(t, {
    x: M, y: 0.5, w: W - 2 * M, h: 0.34, margin: 0,
    fontFace: ZH, fontSize: 12.5, color: dark_ ? ONDM : MUT, charSpacing: 3,
  });
}
function title(s, t, dark_, size) {
  s.addText(t, {
    x: M, y: 0.88, w: W - 2 * M, h: 0.72, margin: 0, bold: true,
    fontFace: ZH, fontSize: size || 29, color: dark_ ? OND : TEXT,
  });
}
function pageNo(s, n) {
  s.addText(String(n), {
    x: W - M - 0.5, y: H - 0.52, w: 0.5, h: 0.3, margin: 0, align: "right",
    fontFace: EN, fontSize: 12, color: MUT,
  });
}
function quoteBlock(s, x, y, w, text, attrib, fs_) {
  s.addText("\u201C", {
    x: x - 0.06, y: y - 0.42, w: 0.9, h: 0.9, margin: 0,
    fontFace: EN, fontSize: 58, color: PRIM, bold: true,
  });
  s.addText(text, {
    x: x + 0.62, y: y, w: w - 0.62, h: 1.15, margin: 0,
    fontFace: ZH, fontSize: fs_ || 17, color: TEXT, lineSpacingMultiple: 1.28,
  });
  s.addText(attrib, {
    x: x + 0.62, y: y + 1.16, w: w - 0.62, h: 0.3, margin: 0, align: "right",
    fontFace: ZH, fontSize: 12, color: MUT,
  });
}
function takeaway(s, text, y) {
  const yy = y || H - 1.28;
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: yy, w: W, h: 0.78, fill: { color: TINT } });
  s.addText(text, {
    x: M, y: yy, w: W - 2 * M, h: 0.78, margin: 0, valign: "middle",
    fontFace: ZH, fontSize: 15, color: TEXT, bold: true,
  });
}

/* ============ P1 封面 ============ */
(() => {
  const s = dark();
  img(s, STILLS + "00-电影海报-1958原版.jpg", { x: 9.55, y: 1.28, w: 2.95, h: 4.57 });
  s.addText("1958年原版海报 · Saul Bass", {
    x: 9.3, y: 5.95, w: 3.45, h: 0.3, margin: 0, align: "center",
    fontFace: ZH, fontSize: 12, color: ONDM,
  });
  s.addText("影 评 研 读 · 课 堂 展 示", {
    x: M, y: 1.55, w: 7, h: 0.4, margin: 0,
    fontFace: ZH, fontSize: 14, color: ONDM, charSpacing: 4,
  });
  s.addText("VERTIGO", {
    x: M - 0.04, y: 2.05, w: 8.6, h: 1.05, margin: 0,
    fontFace: EN, fontSize: 60, color: OND, charSpacing: 8,
  });
  s.addText("《迷魂记》", {
    x: M, y: 3.18, w: 8, h: 0.85, margin: 0, bold: true,
    fontFace: ZH, fontSize: 40, color: OND,
  });
  s.addText("阿尔弗雷德·希区柯克 · 1958", {
    x: M, y: 4.18, w: 8, h: 0.4, margin: 0, fontFace: ZH, fontSize: 16, color: ONDM,
  });
  s.addText([
    { text: "围绕罗杰·伊伯特《迷魂记》影评（1996）的三重解读", options: { breakLine: true } },
    { text: "赞同与深化 · 批判与质疑 · 社会维度延伸", options: {} },
  ], {
    x: M, y: 4.72, w: 8.2, h: 0.85, margin: 0, fontFace: ZH, fontSize: 16,
    color: OND, lineSpacingMultiple: 1.35,
  });
  s.addText("小组展示 · 五人分工版", {
    x: M, y: 6.55, w: 6, h: 0.4, margin: 0, fontFace: ZH, fontSize: 13, color: ONDM,
  });
  s.addNotes(
    "【同学A · 开场】大家好，我们小组选取的是罗杰·伊伯特于1996年发表的《迷魂记》影评。今天，我们将围绕这篇文章，梳理它的主要观点和论证思路，分析其可取之处，并讨论这一解释是否充分。\n" +
    "来源：Roger Ebert, \"Vertigo,\" Chicago Sun-Times, 1996。"
  );
})();

/* ============ P2 分工与论证路线 ============ */
(() => {
  const s = light();
  eyebrow(s, "分工与论证路线");
  title(s, "五个视角，一条论证链");
  const crew = [
    ["A", "开场引入", "伊伯特\u201C自白说\u201D：判断与三个层次"],
    ["B", "赞同与深化", "男性凝视理论为何强化\u201C自白说\u201D"],
    ["C", "批判与质疑", "男性中心主义盲区：朱迪·米琪·\u201C自白\u201D"],
    ["D", "批判性延伸", "被个人化解读遮蔽的社会维度"],
    ["E", "技巧与总结", "变焦·色彩·配乐如何制造眩晕"],
  ];
  crew.forEach((c, i) => {
    const y = 1.95 + i * 0.92;
    s.addShape(pres.shapes.RECTANGLE, { x: M, y: y, w: 0.52, h: 0.52, fill: { color: PRIM } });
    s.addText(c[0], {
      x: M, y: y, w: 0.52, h: 0.52, margin: 0, align: "center", valign: "middle",
      fontFace: EN, fontSize: 20, bold: true, color: "FFFFFF",
    });
    s.addText([
      { text: c[1] + "　", options: { bold: true, fontSize: 16, color: TEXT } },
      { text: c[2], options: { fontSize: 14, color: MUT } },
    ], {
      x: M + 0.72, y: y, w: 6.1, h: 0.52, margin: 0, valign: "middle", fontFace: ZH,
    });
    if (i < crew.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: M + 0.72, y: y + 0.72, w: 6.0, h: 0, line: { color: HAIR, width: 0.75 },
      });
    }
  });
  const cx = 10.15;
  s.addShape(pres.shapes.LINE, {
    x: cx, y: 2.12, w: 0, h: 4.28, line: { color: HAIR, width: 1.5 },
  });
  const chain = ["伊伯特\u201C自白说\u201D", "为何成立（B）", "盲区何在（C）", "还缺什么（D）", "技巧如何服务（E）", "小组综合评价"];
  chain.forEach((t, i) => {
    const y = 2.0 + i * 0.86;
    const last = i === chain.length - 1;
    s.addShape(pres.shapes.OVAL, {
      x: cx - 0.09, y: y, w: 0.18, h: 0.18, fill: { color: last ? ACC : PRIM },
    });
    s.addText(t, {
      x: cx + 0.28, y: y - 0.14, w: 2.7, h: 0.46, margin: 0, valign: "middle",
      fontFace: ZH, fontSize: 14, color: last ? ACC : TEXT, bold: last,
    });
  });
  pageNo(s, 2);
  s.addNotes(
    "【同学A · 结构预告】接下来，我们将先分析伊伯特观点的说服力（同学B），再讨论其解释的局限和可以拓展的方向（同学C、D），最后回到影片结局与电影技巧，形成小组的综合评价（同学E）。\n" +
    "问答定位：评委问分工或结构时，回到本页路线图。"
  );
})();

/* ============ P3 引入·自白说 ============ */
(() => {
  const s = light();
  eyebrow(s, "同学A · 引入 ｜ Roger Ebert, 1996");
  title(s, "伊伯特的核心判断：一部\u201C自白性\u201D作品");
  s.addShape(pres.shapes.RECTANGLE, { x: M, y: 2.0, w: 6.55, h: 3.55, fill: { color: TINT } });
  s.addText([
    { text: "\u201C自白\u201D是什么", options: { bold: true, fontSize: 17, color: PRIM, breakLine: true } },
    { text: "斯考蒂对女性形象的迷恋与改造，被理解为希区柯克自身欲望和控制倾向在电影中的显露。", options: { fontSize: 15.5, color: TEXT, breakLine: true } },
    { text: "", options: { fontSize: 8, breakLine: true } },
    { text: "边界：这是伊伯特对作品的解读，不是导演直接作出的自我声明。", options: { fontSize: 14, color: MUT } },
  ], {
    x: M + 0.35, y: 2.3, w: 5.85, h: 2.95, margin: 0, fontFace: ZH, lineSpacingMultiple: 1.3,
    valign: "middle",
  });
  quoteBlock(
    s, 7.75, 2.25, 4.95,
    "这是希区柯克整个职业生涯中\u201C唯一一次完全暴露了自己，带着全部的激情与悲伤\u201D。",
    "—— Roger Ebert, 1996（中译）", 16
  );
  img(s, STILLS + "03-1958片场-希区柯克指挥金诺瓦克.jpg", {
    x: 7.75, y: 3.72, w: 4.95, h: 1.85, sizing: { type: "cover", w: 4.95, h: 1.85 },
  });
  s.addText("1958年片场：希区柯克执导金·诺瓦克（剧照）", {
    x: 7.75, y: 5.62, w: 4.95, h: 0.3, margin: 0,
    fontFace: ZH, fontSize: 12, color: MUT,
  });
  takeaway(s, "可取之处：通过人物关系与具体场景，揭示爱情中的理想化如何转变为控制。", 6.0);
  pageNo(s, 3);
  s.addNotes(
    "【同学A · 核心判断】伊伯特的核心判断是：《迷魂记》是一部具有强烈\u201C自白性\u201D的作品。他将斯考蒂对女性形象的迷恋与改造，理解为希区柯克自身欲望和控制倾向在电影中的显露。这里的\u201C自白\u201D，是伊伯特对作品的解读，而不是导演直接作出的自我声明。\n" +
    "【同学A · 可取与问题】这篇文章的可取之处，在于它通过人物关系和具体场景，揭示了爱情中的理想化如何转变为对他人的控制，同时把这个问题延伸到了电影创作和观众理解的层面。但它也留下问题：以导演\u201C自白\u201D为中心的解释，是否充分呈现了朱迪自己的经历与选择？\n" +
    "来源：Roger Ebert, \"Vertigo,\" Great Movies, Chicago Sun-Times, 1996。\n" +
    "问答定位：\u201C自白说\u201D定义追问 → 本页；证据追问 → 第5页原文引文。"
  );
})();

/* ============ P4 三个层次 ============ */
(() => {
  const s = light();
  eyebrow(s, "同学A · 影评的论证结构");
  title(s, "\u201C自白说\u201D的三个相互联系的层次");
  const layers = [
    ["一", "人物的欲望与控制", "斯考蒂执迷心中的玛德琳，要求朱迪改变衣着发型。渴望获得爱情，却难以接受朱迪作为一个具体的人。"],
    ["二", "行为与创作的联系", "塑造朱迪的行为，呼应希区柯克反复呈现的女性形象——这是\u201C自白说\u201D的主要依据。"],
    ["三", "朱迪的处境与观众", "伊伯特也讨论朱迪的痛苦，提醒观众：不要像斯考蒂一样，把朱迪当作一个物件。"],
  ];
  layers.forEach((L, i) => {
    const x = M + i * 4.12;
    s.addShape(pres.shapes.RECTANGLE, { x: x, y: 2.05, w: 3.72, h: 3.15, fill: { color: TINT } });
    s.addText(L[0], {
      x: x + 0.3, y: 2.3, w: 1.0, h: 0.62, margin: 0,
      fontFace: ZH, fontSize: 28, bold: true, color: PRIM,
    });
    s.addText(L[1], {
      x: x + 0.3, y: 2.98, w: 3.15, h: 0.45, margin: 0, bold: true,
      fontFace: ZH, fontSize: 16.5, color: TEXT,
    });
    s.addText(L[2], {
      x: x + 0.3, y: 3.5, w: 3.15, h: 1.55, margin: 0,
      fontFace: ZH, fontSize: 13.5, color: TEXT, lineSpacingMultiple: 1.3,
    });
    if (i < 2) {
      s.addShape(pres.shapes.LINE, {
        x: x + 3.76, y: 3.62, w: 0.32, h: 0, line: { color: MUT, width: 2, endArrowType: "triangle" },
      });
    }
  });
  takeaway(s, "三层次层层递进：个人欲望 → 创作机制 → 观众理解，构成本次讨论的对象。");
  pageNo(s, 4);
  s.addNotes(
    "【同学A · 三个层次】首先，是人物的欲望与控制：斯考蒂执迷于自己心中的玛德琳形象，因此要求朱迪改变衣着和发型；他渴望获得爱情，却难以接受朱迪作为一个具体的人。其次，是人物行为与导演创作之间的联系：伊伯特把斯考蒂塑造朱迪的行为，与希区柯克反复呈现的女性形象联系起来，这也是\u201C自白说\u201D的主要依据。最后，是朱迪的处境与观众的理解：伊伯特明确提醒我们，不要像斯考蒂一样，把朱迪当作一个物件。\n" +
    "来源：Roger Ebert, 1996；分段转述见讲稿。"
  );
})();

/* ============ P5 B·原文证据 ============ */
(() => {
  const s = light();
  eyebrow(s, "同学B · 视角一：赞同与深化");
  title(s, "原文证据：塑造朱迪的，是一种控制");
  img(s, STILLS + "01-酒店绿雾重生-朱迪从绿光中走出.jpg", {
    x: M, y: 2.0, w: 5.7, h: 3.3, sizing: { type: "cover", w: 5.7, h: 3.3 },
  });
  s.addText("帝国旅馆：朱迪从绿色雾气中走出（《迷魂记》截帧）", {
    x: M, y: 5.38, w: 5.7, h: 0.3, margin: 0,
    fontFace: ZH, fontSize: 12, color: MUT,
  });
  quoteBlock(
    s, 6.72, 2.05, 5.98,
    "当他无法拥有她时，他找了另一个女人，试图塑造她、打扮她、训练她……他对自己正在塑造的黏土毫不在意，会心甘情愿地将她献祭在梦想的祭坛上。",
    "—— Roger Ebert, 1996（中译）", 15.5
  );
  s.addText([
    { text: "对应的场景：", options: { bold: true, color: PRIM } },
    { text: "斯考蒂的眼神中\u201C燃烧着狂热的执念\u201D——换发型、穿同样的灰色套装、摆出特定姿势，本质上是一种控制行为。", options: { color: TEXT } },
  ], {
    x: 6.72, y: 4.6, w: 5.98, h: 1.4, margin: 0,
    fontFace: ZH, fontSize: 14.5, lineSpacingMultiple: 1.35,
  });
  takeaway(s, "银幕上的绿雾场面与伊伯特的引文互证：对朱迪的改造，是\u201C自白说\u201D最直观的证据。");
  pageNo(s, 5);
  s.addNotes(
    "【同学B · 我赞同伊伯特】我基本赞同伊伯特将《迷魂记》解读为希区柯克的\u201C自白\u201D。伊伯特敏锐地指出，斯考蒂对朱迪的改造——强迫她换发型、穿同样的灰色套装、甚至要求她摆出特定姿势——本质上是一种控制行为。\n" +
    "英文原文：\"When he cannot have her, he finds another woman and tries to mold her, dress her, train her, change her makeup and her hair, until she looks like the woman he desires. He cares nothing about the clay he is shaping; he will gladly sacrifice her on the altar of his dreams.\" — Roger Ebert, 1996\n" +
    "【同学B · 场景】这段描述精准地抓住了影片最令人不安的场景：酒店房间里，朱迪从绿色雾气中走出，斯考蒂的眼神中\u201C燃烧着狂热的执念\u201D。\n" +
    "来源：Roger Ebert, 1996。"
  );
})();

/* ============ P6 B·穆尔维深化 ============ */
(() => {
  const s = light();
  eyebrow(s, "同学B · 理论深化 ｜ Laura Mulvey, 1975");
  title(s, "从导演的自白，到工业的机制");
  s.addShape(pres.shapes.RECTANGLE, { x: M, y: 2.0, w: 5.4, h: 3.6, fill: { color: TINT } });
  s.addText([
    { text: "男性凝视（Male Gaze）", options: { bold: true, fontSize: 17, color: PRIM, breakLine: true } },
    { text: "经典好莱坞电影将女性建构为男性观看的对象：摄影机、男性角色和观众三者的视线重合。", options: { fontSize: 15, color: TEXT } },
  ], {
    x: M + 0.32, y: 2.32, w: 4.76, h: 2.95, margin: 0, fontFace: ZH, lineSpacingMultiple: 1.32,
    valign: "middle",
  });
  const steps = [
    ["斯考蒂改造朱迪", "凝视的极端形式——不是爱一个人，而是雕刻符合幻想的雕像"],
    ["伊伯特的判断", "希区柯克\u201C最具自白性\u201D"],
    ["穆尔维的推进", "这种自白属于整个好莱坞——机制性地将女性物化为视觉快感符号"],
  ];
  steps.forEach((t, i) => {
    const y = 2.0 + i * 1.28;
    s.addText([
      { text: t[0], options: { bold: true, fontSize: 15, color: PRIM, breakLine: true } },
      { text: t[1], options: { fontSize: 14, color: TEXT } },
    ], {
      x: 6.65, y: y, w: 5.95, h: 1.1, margin: 0, fontFace: ZH, lineSpacingMultiple: 1.25,
    });
    if (i < 2) {
      s.addShape(pres.shapes.LINE, {
        x: 6.85, y: y + 1.08, w: 0, h: 0.14, line: { color: MUT, width: 2, endArrowType: "triangle" },
      });
    }
  });
  takeaway(s, "\u201C自白说\u201D不仅成立，而且具有超出个人传记的普遍意义。");
  pageNo(s, 6);
  s.addNotes(
    "【同学B · 用穆尔维深化】如果说伊伯特的解读还停留在\u201C导演个人心理\u201D的层面，那么劳拉·穆尔维1975年的《视觉快感与叙事电影》可以为其提供更系统的理论支撑。斯考蒂对朱迪的改造，正是男性凝视的极端形式：他不是在爱一个人，而是在雕刻一个符合自己幻想的雕像。伊伯特说希区柯克\u201C最具自白性\u201D，穆尔维则告诉我们，这种自白不仅是希区柯克个人的，更是整个好莱坞电影工业的。从这个角度看，伊伯特的\u201C自白说\u201D不仅成立，而且具有超出个人传记的普遍意义。\n" +
    "来源：Laura Mulvey, \"Visual Pleasure and Narrative Cinema,\" Screen, 1975；Roger Ebert, 1996。\n" +
    "问答定位：凝视理论追问 → 本页；对理论适用的质疑 → 第10页社会维度。"
  );
})();

/* ============ P7 C·质疑一 ============ */
(() => {
  const s = light();
  eyebrow(s, "同学C · 视角二：批判与质疑");
  title(s, "口头同情朱迪，分析框架仍以斯考蒂为中心");
  quoteBlock(
    s, M + 0.1, 2.35, 11.6,
    "从我们得知秘密的那一刻起，电影同样关乎朱迪：她的痛苦、她的失去、她所处的陷阱……朱迪是希区柯克最接近同情其情节中女性受害者的一次。",
    "—— Roger Ebert, 1996（中译；英文原文见本页备注）", 17
  );
  const cols = [
    ["伊伯特说了什么", "他承认电影\u201C同样关乎朱迪\u201D，称她\u201C最令人同情\u201D。"],
    ["但框架在哪里", "痛苦只有在斯考蒂的执念被揭示时才被看见；朱迪没有独立于男性欲望之外的主体性。"],
  ];
  cols.forEach((c, i) => {
    const x = M + i * 6.22;
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 4.72, w: 5.85, h: 1.85, fill: { color: i ? TINT : "F2F2EF" },
    });
    s.addText([
      { text: c[0], options: { bold: true, fontSize: 15.5, color: i ? ACC : MUT, breakLine: true } },
      { text: c[1], options: { fontSize: 14.5, color: TEXT } },
    ], {
      x: x + 0.3, y: 4.72, w: 5.25, h: 1.85, margin: 0, fontFace: ZH, lineSpacingMultiple: 1.28,
      valign: "middle",
    });
  });
  pageNo(s, 7);
  s.addNotes(
    "【同学C · 部分反对】我部分反对伊伯特的解读。伊伯特在评论中确实提到了朱迪的痛苦，但问题在于：他的整个分析框架仍然是以斯考蒂（也就是希区柯克的男性化身）为中心的。他说朱迪\u201C最令人同情\u201D，但这种同情仍然是通过男性视角给予的——朱迪的痛苦只有在斯考蒂的执念被揭示时才被看见，她本身没有独立于男性欲望之外的主体性。\n" +
    "英文原文：\"From the moment we are let in on the secret, the movie is equally about Judy: her pain, her loss, the trap she is in... Judy, in Vertigo, is the closest he came to sympathizing with the female victims of his plots.\" — Roger Ebert, 1996\n" +
    "来源：Roger Ebert, 1996。"
  );
})();

/* ============ P8 C·米琪 ============ */
(() => {
  const s = light();
  eyebrow(s, "同学C · 被完全忽略的角色");
  title(s, "米琪的缺席，暴露了凝视的边界");
  const twins = [
    ["米琪 Midge", "真实存在的女性", "独立 · 聪明 · 有幽默感的设计师；真心关心斯考蒂，帮他调查卡洛塔身世——却因不符合\u201C冰冷、遥远、金发\u201D的模板而被视而不见。", PRIM],
    ["玛德琳 Madeleine", "被建构的幻影", "优雅、冰冷、完美的\u201C希区柯克式女性模板\u201D——一个由男性欲望设计出来的形象。", MUT],
  ];
  twins.forEach((t, i) => {
    const x = M, y = 2.0 + i * 2.05;
    s.addShape(pres.shapes.RECTANGLE, { x: x, y: y, w: 6.55, h: 1.9, fill: { color: i ? "F2F2EF" : TINT } });
    s.addText([
      { text: t[0] + "　", options: { bold: true, fontSize: 17, color: t[3] } },
      { text: t[1], options: { fontSize: 13, color: MUT, breakLine: true } },
      { text: t[2], options: { fontSize: 13.5, color: TEXT } },
    ], {
      x: x + 0.32, y: y + 0.2, w: 5.9, h: 1.55, margin: 0, fontFace: ZH, lineSpacingMultiple: 1.28,
    });
  });
  img(s, STILLS + "02-米琪-独立幽默的设计师展示发明.jpg", { x: 7.9, y: 2.0, w: 4.85, h: 2.6 });
  s.addText("米琪向斯考蒂展示新发明——独立、专业、有幽默感（《迷魂记》截帧）", {
    x: 7.9, y: 4.68, w: 4.85, h: 0.6, margin: 0,
    fontFace: ZH, fontSize: 12, color: MUT, lineSpacingMultiple: 1.25,
  });
  takeaway(s, "伊伯特只看得见被男性欲望选中的女人，看不见被男性欲望忽略的女人——他的解读仍困在凝视框架中。");
  pageNo(s, 8);
  s.addNotes(
    "【同学C · 米琪】更关键的是，伊伯特的整篇评论完全忽略了米琪（Midge）这个角色。米琪是斯考蒂的前女友，一个独立、聪明、有幽默感的女性设计师。她真心关心斯考蒂，甚至帮他调查卡洛塔的身世，但斯考蒂对她视而不见——因为她不符合他幻想中\u201C冰冷、遥远、金发\u201D的希区柯克式女性模板。米琪的存在本身就是对男性凝视最尖锐的批判：一个真实的、有血有肉的女性，反而不如一个被建构出来的幻影有吸引力。\n" +
    "来源：影片文本（米琪为希区柯克原作角色）；批判论点为小组观点（同学C）。"
  );
})();

/* ============ P9 C·自白的美化 ============ */
(() => {
  const s = light();
  eyebrow(s, "同学C · \u201C自白说\u201D的局限");
  title(s, "\u201C自白\u201D一词，浪漫化了控制");
  const rows = [
    ["伊伯特的框架", "\u201C暴露了自己的激情与悲伤\u201D → 观众同情导演，甚至原谅他的控制欲。", MUT],
    ["影片的场景", "朱迪在浴室里哭泣、被迫换上不属于自己的衣服——这些场景的核心是朱迪的创伤。", ACC],
  ];
  rows.forEach((r, i) => {
    const y = 2.15 + i * 1.75;
    s.addShape(pres.shapes.RECTANGLE, { x: M, y: y, w: W - 2 * M, h: 1.45, fill: { color: i ? TINT : "F2F2EF" } });
    s.addText([
      { text: r[0], options: { bold: true, fontSize: 16, color: r[2], breakLine: true } },
      { text: r[1], options: { fontSize: 14.5, color: TEXT } },
    ], {
      x: M + 0.35, y: y + 0.2, w: W - 2 * M - 0.7, h: 1.1, margin: 0,
      fontFace: ZH, lineSpacingMultiple: 1.3,
    });
  });
  s.addText([
    { text: "换个角度：", options: { bold: true, color: TEXT } },
    { text: "斯考蒂对朱迪的改造不是\u201C激情与悲伤\u201D，而是", options: { color: TEXT } },
    { text: "情感虐待", options: { bold: true, color: ACC } },
    { text: "。用\u201C自白\u201D命名，在某种程度上美化了控制行为本身。", options: { color: TEXT } },
  ], {
    x: M, y: 5.85, w: W - 2 * M, h: 0.85, margin: 0,
    fontFace: ZH, fontSize: 15.5, lineSpacingMultiple: 1.3,
  });
  pageNo(s, 9);
  s.addNotes(
    "【同学C · 自白说的局限】伊伯特把影片归结为希区柯克的\u201C个人自白\u201D，这实际上是一种浪漫化的处理。当我们说一个导演\u201C暴露了自己的激情与悲伤\u201D时，我们往往会对他产生同情，甚至原谅他的控制欲。但如果我们换一个角度：斯考蒂对朱迪的改造不是什么\u201C激情与悲伤\u201D，而是情感虐待。伊伯特用\u201C自白\u201D这个词，在某种程度上美化了控制行为本身。影片中朱迪在浴室里哭泣、被迫换上不属于自己的衣服，这些场景的核心不是希区柯克的\u201C悲伤\u201D，而是朱迪的创伤。\n" +
    "标注：\u201C情感虐待\u201D为小组批判性判断（同学C），非伊伯特原文表述。"
  );
})();

/* ============ P10 D·同构悖论 ============ */
(() => {
  const s = light();
  eyebrow(s, "同学D · 视角三：批判性延伸 ｜ 社会维度");
  title(s, "道德悖论不是个人对照，而是时代缩影");
  quoteBlock(
    s, M + 0.1, 2.05, 11.6,
    "这在《迷魂记》的中心制造了一个道德悖论：另一个男人（加文）对这个女人所做的，毕竟只是斯考蒂也想做的事。",
    "—— Roger Ebert, 1996（中译；英文原文见本页备注）", 16
  );
  const by = 4.55;
  s.addShape(pres.shapes.RECTANGLE, { x: 1.5, y: by, w: 2.35, h: 0.85, fill: { color: "F2F2EF" } });
  s.addText("加文 Gavin", {
    x: 1.5, y: by, w: 2.35, h: 0.85, margin: 0, align: "center", valign: "middle",
    fontFace: ZH, fontSize: 17, bold: true, color: TEXT,
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.49, y: by - 0.35, w: 2.35, h: 1.55, fill: { color: TINT } });
  s.addText("朱迪 Judy", {
    x: 5.49, y: by - 0.35, w: 2.35, h: 1.55, margin: 0, align: "center", valign: "middle",
    fontFace: ZH, fontSize: 19, bold: true, color: PRIM,
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 9.48, y: by, w: 2.35, h: 0.85, fill: { color: "F2F2EF" } });
  s.addText("斯考蒂 Scottie", {
    x: 9.48, y: by, w: 2.35, h: 0.85, margin: 0, align: "center", valign: "middle",
    fontFace: ZH, fontSize: 17, bold: true, color: TEXT,
  });
  s.addShape(pres.shapes.LINE, { x: 3.95, y: by + 0.42, w: 1.44, h: 0, line: { color: MUT, width: 2, endArrowType: "triangle" } });
  s.addShape(pres.shapes.LINE, { x: 9.38, y: by + 0.42, w: -1.44, h: 0, line: { color: MUT, width: 2, endArrowType: "triangle" } });
  s.addText("雇佣并塑造", {
    x: 3.7, y: by + 0.02, w: 1.95, h: 0.32, margin: 0, align: "center",
    fontFace: ZH, fontSize: 12.5, color: MUT,
  });
  s.addText("强迫重塑", {
    x: 7.68, y: by + 0.02, w: 1.95, h: 0.32, margin: 0, align: "center",
    fontFace: ZH, fontSize: 12.5, color: MUT,
  });
  s.addText([
    { text: "伊伯特看到了同构，却止步于两人的道德对照。要追问的是：", options: { color: TEXT } },
    { text: "为什么1950年代的男性会如此自然地认为自己有权塑造女性？", options: { bold: true, color: ACC } },
    { text: "这不是一个人的问题，而是一个时代的问题。", options: { color: TEXT } },
  ], {
    x: M, y: 6.0, w: W - 2 * M, h: 0.95, margin: 0,
    fontFace: ZH, fontSize: 15, lineSpacingMultiple: 1.32,
  });
  pageNo(s, 10);
  s.addNotes(
    "【同学D · 道德悖论】伊伯特在评论中提出了一个很有洞察力的\u201C道德悖论\u201D。伊伯特看到了加文和斯考蒂的同构性——两个人都在\u201C塑造\u201D同一个女人。但他把这个悖论归结为两个人之间的道德对照，没有追问：为什么1950年代的男性会如此自然地认为自己有权塑造女性？这不是斯考蒂一个人的问题，也不是希区柯克一个人的问题，而是整个时代的问题。\n" +
    "英文原文：\"That creates a moral paradox at the center of Vertigo. The other man (Gavin) has after all only done to this woman what Scottie also wanted to do.\" — Roger Ebert, 1996\n" +
    "来源：Roger Ebert, 1996。"
  );
})();

/* ============ P11 D·语境与眩晕 ============ */
(() => {
  const s = light();
  eyebrow(s, "同学D · 1950年代的社会语境");
  title(s, "\u201C眩晕\u201D是恐高，也是身份的悬空");
  s.addShape(pres.shapes.RECTANGLE, { x: M, y: 2.0, w: 6.0, h: 3.75, fill: { color: "F2F2EF" } });
  s.addText([
    { text: "1958 年的美国", options: { bold: true, fontSize: 16.5, color: MUT, breakLine: true } },
    { text: "二战后女性被鼓励离开工作岗位回归家庭", options: { bullet: bu(), fontSize: 14.5, color: TEXT, breakLine: true } },
    { text: "社会期待集中在外表、衣着和对丈夫的服从", options: { bullet: bu(), fontSize: 14.5, color: TEXT, breakLine: true } },
    { text: "每个女性都被期待成为\u201C玛德琳\u201D：优雅、冰冷、完美、不说话", options: { bullet: bu(), fontSize: 14.5, color: TEXT } },
  ], {
    x: M + 0.32, y: 2.3, w: 5.35, h: 3.15, margin: 0, fontFace: ZH,
    paraSpaceAfter: 10, lineSpacingMultiple: 1.25,
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 7.05, y: 2.0, w: 5.55, h: 3.75, fill: { color: TINT } });
  s.addText([
    { text: "朱迪两次失去自我", options: { bold: true, fontSize: 16.5, color: PRIM, breakLine: true } },
    { text: "第一次：被加文雇佣，扮演玛德琳", options: { bullet: bu(), fontSize: 14.5, color: TEXT, breakLine: true } },
    { text: "第二次：被斯考蒂强迫，重新成为玛德琳", options: { bullet: bu(), fontSize: 14.5, color: TEXT, breakLine: true } },
    { text: "她从头到尾没有机会做\u201C朱迪自己\u201D——身份被男性的期待彻底覆盖，这就是脚下悬空的眩晕。", options: { fontSize: 14, color: TEXT } },
  ], {
    x: 7.37, y: 2.3, w: 4.95, h: 3.2, margin: 0, fontFace: ZH,
    paraSpaceAfter: 10, lineSpacingMultiple: 1.25,
  });
  takeaway(s, "影片不只是希区柯克的自白，更是一面映照整个时代性别政治的镜子。");
  pageNo(s, 11);
  s.addNotes(
    "【同学D · 社会语境】《迷魂记》拍摄于1958年的美国。那是一个女性被严格限制在家庭角色中的时代。斯考蒂对朱迪的改造，不只是一个偏执狂的个人行为，更是整个父权社会对女性\u201C标准化\u201D要求的极端缩影。\n" +
    "【同学D · 眩晕的隐喻】伊伯特将\u201C眩晕\u201D解读为斯考蒂个人的恐高症和心理创伤。但我们可以进一步追问：当整个社会都在告诉你\u201C你应该成为什么样的女人\u201D时，女性自身也会感到一种脚下悬空的眩晕。朱迪在影片中两次失去自我：第一次是被加文雇佣扮演玛德琳，第二次是被斯考蒂强迫重新成为玛德琳。\n" +
    "标注：1950年代社会背景为小组综合的历史常识性论述（同学D），细节如需引用请另行核对史料。"
  );
})();

/* ============ P12 E·技巧 ============ */
(() => {
  const s = light();
  eyebrow(s, "同学E · 电影技巧分析");
  title(s, "变焦不是表现眩晕，而是制造眩晕");
  s.addShape(pres.shapes.RECTANGLE, { x: M, y: 1.95, w: 6.35, h: 4.3, fill: { color: "F2F2EF" } });
  s.addText("希区柯克变焦（推轨变焦）", {
    x: M + 0.32, y: 2.18, w: 5.7, h: 0.4, margin: 0, bold: true,
    fontFace: ZH, fontSize: 16, color: TEXT,
  });
  s.addText([
    { text: "摄影机沿轨道后退", options: { fontSize: 13.5, color: TEXT } },
  ], { x: M + 0.32, y: 2.72, w: 2.6, h: 0.62, margin: 0, fontFace: ZH, valign: "middle" });
  s.addShape(pres.shapes.LINE, { x: M + 2.72, y: 3.03, w: 0.55, h: 0, line: { color: MUT, width: 2.25, endArrowType: "triangle" } });
  s.addText([
    { text: "镜头焦距前推", options: { fontSize: 13.5, color: TEXT } },
  ], { x: M + 3.4, y: 2.72, w: 2.6, h: 0.62, margin: 0, fontFace: ZH, valign: "middle" });
  img(s, STILLS + "05-楼梯眩晕-俯视楼梯向远处塌陷.jpg", {
    x: M + 0.32, y: 3.42, w: 5.7, h: 2.2, sizing: { type: "cover", w: 5.7, h: 2.2 },
  });
  s.addText([
    { text: "楼梯井截帧：主体大小不变，背景透视剧烈拉伸", options: { breakLine: true } },
    { text: "——观众在生理上直接感到眩晕", options: {} },
  ], {
    x: M + 0.32, y: 5.66, w: 5.7, h: 0.55, margin: 0,
    fontFace: ZH, fontSize: 12.5, color: MUT, lineSpacingMultiple: 1.25,
  });
  const rows = [
    ["色彩", "绿＝虚幻、魅惑、不可企及的欲望（朱迪走出绿色霓虹）；红＝危险与激情（餐厅、酒吧）。"],
    ["主观镜头", "观众借斯考蒂的眼睛\u201C跟踪\u201D玛德琳——反转来临时，与斯考蒂一同感到被欺骗。"],
    ["配乐", "赫尔曼的螺旋主旋律，是\u201C眩晕\u201D的听觉化表达。"],
    ["叙事结构", "约三分之二处揭示全部真相——影片从悬疑片转化为心理悲剧。"],
  ];
  rows.forEach((r, i) => {
    const y = 1.98 + i * 1.08;
    s.addText([
      { text: r[0], options: { bold: true, fontSize: 15, color: PRIM, breakLine: true } },
      { text: r[1], options: { fontSize: 13.5, color: TEXT } },
    ], {
      x: 7.35, y: y, w: 5.25, h: 1.0, margin: 0, fontFace: ZH, lineSpacingMultiple: 1.22,
    });
    if (i < 3) {
      s.addShape(pres.shapes.LINE, {
        x: 7.35, y: y + 1.0, w: 5.25, h: 0, line: { color: HAIR, width: 0.75 },
      });
    }
  });
  s.addText("希区柯克为这个镜头思考了十五年。——特吕弗《希区柯克访谈》", {
    x: M, y: 6.55, w: W - 2 * M, h: 0.4, margin: 0,
    fontFace: ZH, fontSize: 12.5, color: MUT,
  });
  pageNo(s, 12);
  s.addNotes(
    "【同学E · 变焦】《迷魂记》在电影技术上最著名的贡献是\u201C希区柯克变焦\u201D。原理是摄影机在轨道上向后移动的同时，镜头焦距向前拉近，使主体大小不变而背景透视剧烈拉伸。希区柯克在特吕弗的访谈中说，他为这个镜头思考了十五年。这个镜头不是在\u201C表现\u201D恐高，而是在\u201C制造\u201D恐高——它绕过台词，直接作用于观众的身体。\n" +
    "【同学E · 色彩/镜头/配乐/叙事】绿色是全片的灵魂色；红色暗示危险与激情。影片大量使用斯考蒂的主观镜头。伯纳德·赫尔曼的配乐是影片的第二灵魂。叙事上，影片在约三分之二处就通过朱迪的闪回揭示全部真相——这个结构选择将影片从悬疑片转化为心理悲剧。\n" +
    "来源：François Truffaut, Hitchcock (Revised Edition), 1983；影片文本。"
  );
})();

/* ============ P13 总结 ============ */
(() => {
  const s = light();
  eyebrow(s, "小组综合评价");
  title(s, "三种视角的合题");
  const hdr = { fill: { color: PRIM }, color: "FFFFFF", bold: true, fontFace: ZH, fontSize: 14.5, valign: "middle" };
  const cell = { fontFace: ZH, fontSize: 13.5, color: TEXT, valign: "middle" };
  s.addTable(
    [
      [
        { text: "视角", options: hdr },
        { text: "核心主张", options: hdr },
        { text: "对伊伯特的判定", options: hdr },
      ],
      [
        { text: "B 赞同与深化", options: { ...cell, bold: true } },
        { text: "男性凝视下的控制与物化：个人自白，更是工业机制", options: cell },
        { text: "\u201C自白说\u201D成立，且具普遍意义", options: cell },
      ],
      [
        { text: "C 批判与质疑", options: { ...cell, bold: true } },
        { text: "男性中心盲区：朱迪无主体性 · 米琪被无视 · \u201C自白\u201D美化控制", options: cell },
        { text: "敏锐，但存在明显盲区", options: cell },
      ],
      [
        { text: "D 社会维度延伸", options: { ...cell, bold: true } },
        { text: "1950年代父权社会对女性的\u201C标准化\u201D要求；\u201C眩晕\u201D的身份隐喻", options: cell },
        { text: "低估了影片的社会批判力度", options: cell },
      ],
    ],
    {
      x: M, y: 2.0, w: W - 2 * M, colW: [2.5, 5.9, 3.69],
      border: { pt: 0.75, color: HAIR }, rowH: [0.5, 0.95, 0.95, 0.95],
      fill: { color: "FFFFFF" }, margin: 0.09,
    }
  );
  takeaway(s, "《迷魂记》用一个悬疑故事的外壳，包裹了关于欲望、控制和自我欺骗的深刻真相——\u201C眩晕\u201D不只是恐高，是人在执念中脚下悬空的精神状态。", 5.85);
  pageNo(s, 13);
  s.addNotes(
    "【同学E · 总结】今天我们围绕罗杰·伊伯特的一篇评论，从三个角度讨论了《迷魂记》：伊伯特的\u201C自白说\u201D深刻揭示了导演对女性的控制欲，但男性凝视理论提醒我们这不仅是个人问题；伊伯特虽然同情朱迪，却忽略了米琪角色，暴露了男性中心主义盲区；而将影片放回1950年代的社会语境中，我们会发现斯考蒂的改造行为是整个父权社会对女性标准化要求的缩影。《迷魂记》之所以伟大，是因为它用一个悬疑故事的外壳，包裹了关于欲望、控制和自我欺骗的深刻真相。当我们看这部电影时，也是在照见自己。\n" +
    "标注：小组综合评价为整合推论；三种视角分别见第6、7-9、10-11页。"
  );
})();

/* ============ P14 尾页 ============ */
(() => {
  const s = dark();
  rings(s, 11.3, 6.3, 0.5, 5, 0.5, RING, 1);
  s.addText("谢谢聆听 · 欢迎提问", {
    x: M, y: 1.7, w: 9, h: 0.95, margin: 0, bold: true,
    fontFace: ZH, fontSize: 38, color: OND,
  });
  s.addText([
    { text: "提问锚点：\u201C自白说\u201D与原文 → 第3、5页 ｜ 凝视理论 → 第6页 ｜ 批判视角 → 第7–9页", options: { breakLine: true } },
    { text: "社会维度 → 第10–11页 ｜ 技巧 → 第12页", options: {} },
  ], {
    x: M, y: 2.85, w: 11.2, h: 0.85, margin: 0,
    fontFace: ZH, fontSize: 13.5, color: ONDM, lineSpacingMultiple: 1.35,
  });
  s.addText("参考资料", {
    x: M, y: 4.05, w: 4, h: 0.4, margin: 0, bold: true,
    fontFace: ZH, fontSize: 15, color: OND,
  });
  const refs = [
    "[1] Roger Ebert, \"Vertigo,\" Great Movies, Chicago Sun-Times, 1996.",
    "[2] Laura Mulvey, \"Visual Pleasure and Narrative Cinema,\" Screen, 1975.",
    "[3] Tania Modleski, The Women Who Knew Too Much: Hitchcock and Feminist Theory, 1988.",
    "[4] François Truffaut, Hitchcock (Revised Edition), 1983.",
    "[5] Sight & Sound, \"The Greatest Films of All Time,\" 2012.",
  ];
  s.addText(
    refs.map((r, i) => ({ text: r, options: { breakLine: i < refs.length - 1 } })),
    {
      x: M, y: 4.55, w: 11.6, h: 1.9, margin: 0,
      fontFace: EN, fontSize: 12, color: ONDM, lineSpacingMultiple: 1.5,
    }
  );
  s.addText("页面剧照与海报均出自《迷魂记》（Vertigo, 1958, Paramount Pictures），仅供课堂影评教学合理使用。", {
    x: M, y: 6.6, w: 11.6, h: 0.3, margin: 0,
    fontFace: ZH, fontSize: 12, color: ONDM,
  });
  s.addNotes(
    "【同学E · 结束】我们小组的分享就到这里，谢谢大家。（口头致谢，不设单独致谢页）\n" +
    "问答定位：追问可按上方锚点回到对应页；小组批判性观点（情感虐待、社会隐喻）的边界说明见第9、11页备注。"
  );
})();

pres.writeFile({ fileName: "vertigo-slides.pptx" }).then(() => console.log("DONE vertigo-slides.pptx"));
