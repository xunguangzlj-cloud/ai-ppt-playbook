# ai-ppt-playbook

## 两个互补的技能

| 技能 | 管什么 | 什么时候用 |
|---|---|---|
| [`skills/ai-ppt-playbook`](skills/ai-ppt-playbook/SKILL.md) | **制作与设计**：沟通契约 → 论证链/分镜 → 双轨选型 → 设计系统 → 样张验证 → 生成 → 自检回环 → 交付 | 用户要做/改进/评审 PPT |
| [`skills/ppt-evidence-design`](skills/ppt-evidence-design/SKILL.md) | **内容与证据**：论证链是否成立、证据是否真实、来源可溯、50/100 字密度、答辩场景 | 学术答辩、课程汇报、提交阅读型材料 |

两者同时加载：内容技能决定"每页说什么、凭什么"，制作技能决定"长什么样、怎么生成与交付"。

## 核心理念（四支柱）

1. **论证先行** —— 从材料组织问题、方法、结果与结论，记录每页观点及证据。仅优化设计时保留原文、页序和备注。
2. **样张验证** —— 用真实内容检查文字、图表与素材容量，再保持全稿一致。用户要求审批时才等待批准；模板明确时直接推进。
3. **能力选型** —— 区分原生对象、整页图片与混合方案，分别核验文字、图表数据、备注和母版继承。按当前版本验证导出，不能仅凭文件扩展名承诺可编辑。
4. **审核回环** —— 结构检查、逐页渲染和内容校对各有职责。修复后复验，用最终文件哈希关联检查记录；能满足原要求的替代方案可继续执行。

## 快速开始

把 `skills/` 下的技能目录放入你的 Agent 平台技能目录（Claude Code / Codex CLI / 其他兼容 Agent Skills 的宿主），或把完整技能目录提供给其他 AI。先读 SKILL.md，再按任务读取其 references/，需要包检查时运行 scripts/；单独一份 SKILL.md 不包含全部制作细则：

> 请使用 ai-ppt-playbook 技能，根据我的文稿制作 PPT。用途＝学术答辩；受众＝评委老师；总页数＝12；模板＝无（学术简洁风）；文稿见附件。

生成细节、技能触发调优见各 SKILL.md 的 description 字段。

## 可复用的检查工具

新增模板保留、数据图表及实现检查参考文件。包检查脚本只用 Python 标准库，不上传文件，也不改动PPTX：

```bash
python skills/ai-ppt-playbook/scripts/audit_pptx.py final.pptx --expected-slides 14 --compare-source source.pptx --require-same-media --require-native-table-slide 13
python -m unittest discover -s tests -v
```

输出包含最终哈希、包内引用、页数与原生对象统计。文字对照忽略空白差异，媒体对照比较嵌入文件的哈希集合；不证明字体、视觉、图表数据绑定或母版继承，仍需目标应用验收。


## 来源与致谢

方法综合自公开资料，全部链接与许可说明见 [sources.md](sources.md)。核心灵感：ppt-master（SVG 语义标记→原生 DrawingML）、codex-ppt-skill（编排纪律与样张契约）、PPTist（AI_PPT_SCHEMA）、presenton（大纲直出提示词）、banana-slides（整页生图提示词）、PPTAgent（当前创作/导出双审查及历史 plan-edit 路线）、依问三不知的答辩方法视频（证据技能的来源）。

## 许可

MIT（见 [LICENSE](LICENSE)）。第三方来源各有其许可，见 sources.md 的说明

## 支持作者

如果这些项目对你有帮助的话，给个star吧~也可以投喂作者一杯奶茶（比心）

<p>
  <a href="assets/donate/alipay.jpg"><img src="assets/donate/alipay.jpg" alt="支付宝收款码" width="260"></a>
  <a href="assets/donate/wechat.jpg"><img src="assets/donate/wechat.jpg" alt="微信收款码" width="260"></a>
</p>
