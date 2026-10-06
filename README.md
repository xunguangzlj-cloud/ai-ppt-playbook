# ai-ppt-playbook

**AI 时代的 PPT/幻灯片制作方法学**——从需求澄清到可编辑交付的完整流水线，以两个即装即用的 Agent 技能 + 一个真实案例呈现。源自对国内 AI PPT 产品线（豆包/扣子）的深度调研、GitHub 高星项目（ppt-master、codex-ppt-skill、PPTist、presenton、banana-slides 等）的方法文档精读，以及一次完整实战验证。

## 两个互补的技能

| 技能 | 管什么 | 什么时候用 |
|---|---|---|
| [`skills/ai-ppt-playbook`](skills/ai-ppt-playbook/SKILL.md) | **制作与设计**：沟通契约 → 论证链/分镜 → 双轨选型 → 设计系统 → 样张确认 → 并发生成 → 自检回环 → 交付 | 用户要做/改进/评审 PPT |
| [`skills/ppt-evidence-design`](skills/ppt-evidence-design/SKILL.md) | **内容与证据**：论证链是否成立、证据是否真实、来源可溯、50/100 字密度、答辩场景 | 学术答辩、课程汇报、提交阅读型材料 |

两者同时加载：内容技能决定"每页说什么、凭什么"，制作技能决定"长什么样、怎么生成与交付"。

## 核心理念（四支柱）

1. **大纲先行** —— 先确认逻辑再排版。沟通契约六问 + 论证链（问题→方法→结果→结论）+ 分镜九字段，推进不了的页直接砍。
2. **样张确认** —— 大纲确认后先出 1 页代表性样张，批准后其生成方法被所有后续页继承；分阶段确认把返工率压到最低。
3. **双轨渲染** —— 可编辑原生轨（代码生成/语义标记→原生 DrawingML）与整页生图轨（逐页提示词→整页图→组装）一开始就选对，互转有损。
4. **审核回环** —— 代码级溢出/重叠检查 → 逐页渲染目检 → 修复复验；低质量路径是 failure mode 不是 fallback，绝不静默降级。

## 快速开始

把 `skills/` 下的技能目录放入你的 Agent 平台技能目录（Claude Code / Codex CLI / 其他兼容 Agent Skills 的宿主），或直接把 SKILL.md 的内容喂给任何 AI：

> 请使用 ai-ppt-playbook 技能，根据我的文稿制作 PPT。用途＝学术答辩；受众＝评委老师；总页数＝12；模板＝无（学术简洁风）；文稿见附件。

生成细节、技能触发调优见各 SKILL.md 的 description 字段。

## 案例：examples/vertigo

一个完整的真实任务——《迷魂记》(Vertigo, 1958) 电影课五人小组展示，围绕罗杰·伊伯特 1996 年影评"自白说"的三重解读（男性凝视深化 / 男性中心盲区 / 社会维度延伸）：

- [`examples/vertigo/build.js`](examples/vertigo/build.js) —— 14 页全部由代码生成（pptxgenjs），原生可编辑对象、全讲稿入演讲备注、问答锚点
- **资产可选**：剧照/海报/校名图不在仓库中（版权），脚本用 `fs.existsSync` 守卫——克隆后 `npm install pptxgenjs && node build.js` 直接产出纯排版版本；把自备图片放到 `../vertigo-stills/` 与 `../ref_media/`（文件名见脚本内常量）即自动嵌入
- 生成质量：逐页渲染检查 + 独立视觉审查全部通过

## 学习路径（docs/）

| 文档 | 内容 |
|---|---|
| [docs/GitHub高星PPT项目-学习笔记.md](docs/GitHub高星PPT项目-学习笔记.md) | 五轮递进精读：项目全景 → 方法文档 → 执行层 → 几何构图 → 拓扑装配，含六大架构模式与 31 条实战要点 |
| [docs/豆包PPT生成方法-深度调研.md](docs/豆包PPT生成方法-深度调研.md) | 国内产品线调研：四入口产品矩阵、双产物管线、提示词公式、付费政策 |

## 来源与致谢

方法综合自公开资料，全部链接与许可说明见 [sources.md](sources.md)。核心灵感：ppt-master（SVG 语义标记→原生 DrawingML）、codex-ppt-skill（编排纪律与样张契约）、PPTist（AI_PPT_SCHEMA）、presenton（大纲直出提示词）、banana-slides（整页生图提示词）、PPTAgent（plan-edit 学术路线）、依问三不知的答辩方法视频（证据技能的来源）。

## 许可

MIT（见 [LICENSE](LICENSE)）。第三方来源各有其许可，见 sources.md 的说明；仓库不含任何第三方版权素材（剧照/海报/校徽），示例资产请自备。
