# 来源与致谢

本仓库的方法学综合自以下公开资料与项目。按贡献方式分为两类：**方法精读**（我们逐篇读过方法文档/源码并做了系统性笔记）与**理念参照**（论文与课程）。所有第三方版权归原权利人；本仓库只包含我们自己撰写的综合表述与原创代码，未复制任何第三方版权素材（文档原文、剧照、海报、校徽均不入库）。

## 本轮更新（2026-10-06）

新增核对17个项目，其中16个不少于1,000星，模板编辑专用项目pptx-automizer作为低星补充。当前星数、提交快照和实际阅读范围见[扩展调研](docs/GitHub高星PPT项目-扩展调研-2026-10-06.md)及[机器清单](docs/research/2026-10-06-projects.json)。下表保留原有来源索引，其中保真比例、成本和实现推断属于历史笔记，不能直接作为通用制作规则；本轮修正优先。

许可按所读子目录核对：Anthropic的PPTX子技能为受限源码，Dashi的导出子组件另有专有许可范围；均未复制其文本或代码。AGPL、MIT等上游项目仅作方法参照，本轮新增脚本与综合指引为独立撰写。

## 方法精读的项目（强烈推荐去原仓库看原文）

| 项目 | 星数（2026-10 时点） | 许可 | 我们学到什么 | 原文 |
|---|---|---|---|---|
| hugohe3/ppt-master | 57.8k★ | MIT | SVG 语义标记→原生 DrawingML、plan-core 沟通契约、三方向提案、保真度七级词表、构图六镜头、拓扑装配 | https://github.com/hugohe3/ppt-master |
| ningzimu/codex-ppt-skill | 6.4k★ | MIT | 11 步编排纪律、样张契约、文件状态机、防降级原则、子代理交接模板 | https://github.com/ningzimu/codex-ppt-skill |
| pipipi-pikachu/PPTist | 9.4k★ | AGPL-3.0 | AI_PPT_SCHEMA（JSON 直生三重白名单）、编辑器底座、85%/95% 保真度基准 | https://github.com/pipipi-pikachu/PPTist |
| presenton/presenton | 11k★ | Apache-2.0 | 大纲直出提示词（反元话语/内容计划非生产简报/防注入）、HTML+Tailwind 模板、MCP/API 架构 | https://github.com/presenton/presenton |
| Anionex/banana-slides | 15.7k★ | AGPL-3.0 | 整页生图提示词六件套、擦底板→可编辑重分层、逐页模板匹配 | https://github.com/Anionex/banana-slides |
| chuspeeism/dashi-ppt-skill | 9.2k★ | AGPL-3.0 | "页面=版式+文案字段"、12 主题×1020 版式、稳定产出优先 | https://github.com/chuspeeism/dashi-ppt-skill |
| icip-cas/PPTAgent | （学术） | — | plan-edit 两阶段、PPTEval 内容/设计/连贯性三维评估 | https://github.com/icip-cas/PPTAgent |

注：AGPL 项目的文档与代码原文未收入本仓库；如需原文请访问上述仓库并遵守其许可。

## 理念参照

- **AutoPresent: Designing Structured Visuals from Scratch**（CVPR 2025, arXiv:2501.00912）——SlideLLaMA 设计智能体、SlidesBench：代码生成幻灯片+自迭代的学术路线。https://arxiv.org/abs/2501.00912
- **依问三不知**《如何做好一场科研/竞赛答辩》（B 站视频）与《依力大学软实力》讲义——`skills/ppt-evidence-design` 的内容来源，经该技能的来源纪律整理（直接主张/画面观察/整合推论分级）。https://www.bilibili.com/video/BV1xxeS6MEvS/
- **产品线调研**：豆包/扣子空间的 PPT 能力（双产物管线、审核机制）——调研报告见 [docs/豆包PPT生成方法-深度调研.md](docs/豆包PPT生成方法-深度调研.md)。

## 工具

- [pptxgenjs](https://github.com/gitbrent/PptxGenJS)（MIT）——示例案例的生成引擎
- 质检链路：LibreOffice（渲染）+ pypdfium2（逐页出图）
