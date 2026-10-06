# 2026-10-06 扩展研究：17个项目与执行规则修正

本轮从用户仓库提交`5f1a4acea14c360299e6d1b6ee2ed491fdd64981`继续优化，没有以本机旧技能覆盖远端新版本。GitHub API当日核对17个项目：16个不少于1,000星，另有246星的模板编辑专用项目。星数仅用于筛选关注度，不能证明质量或当前维护状态。完整数字、分支和提交快照见[机器清单](research/2026-10-06-projects.json)。

## 阅读范围与吸收结果

每个项目只声明下表实际阅读的章节和索引；不是全仓库学习，也没有运行这些第三方应用、全部示例或模型。README索引用于定位，技术结论来自明确章节/官方文档；未阅读部分不计为已掌握。部分README先读默认分支，后核对当日提交；专门方法文件优先固定到表中的提交快照。

| 项目 | 星数快照 | 本轮阅读范围 | 采用的方法与边界 |
|---|---:|---|---|
| [gitbrent/PptxGenJS](https://github.com/gitbrent/PptxGenJS) | 6,231 | GitHub README功能/母版段落；官方Text与Images API章节 | 原生对象与数据图表、文本边距/换行、图像等比；不据此承诺导入源稿无损。 [依据](https://gitbrent.github.io/PptxGenJS/docs/api-text/) |
| [singerla/pptx-automizer](https://github.com/singerla/pptx-automizer) | 246 | README模板/延迟执行段落；AI-INSTRUCTOR.md 1–80、1023–1089、1144–1148、1701–1706、1783–1819 | 按对象身份修改并连同资源处理；写出后验收，母版和版式复杂资源先做样张。 [依据](https://github.com/singerla/pptx-automizer/blob/fd3fe0ae94ba7f58a28f60e8edc1e94514c5f367/AI-INSTRUCTOR.md) |
| [scanny/python-pptx](https://github.com/scanny/python-pptx) | 3,550 | README.rst 1–26；docs/user/text.rst 1–150 | 文字框、段落、run职责不同；整框替换会重置结构，精确编辑不能丢富文本。 [依据](https://github.com/scanny/python-pptx/blob/278b47b1dedd5b46ee84c286e77cdfb0bf4594be/docs/user/text.rst) |
| [marp-team/marp-cli](https://github.com/marp-team/marp-cli) | 3,855 | README.md导出段174–205及标题索引扫描 | 区分图片PPTX与实验性可编辑PPTX，后者不保留备注，不能由扩展名推断能力。 [依据](https://github.com/marp-team/marp-cli/blob/ffc4128626cbc64965fe1cc805717c6d4438c384/README.md) |
| [slidevjs/slidev](https://github.com/slidevjs/slidev) | 48,941 | README.md 37–53；docs/guide/exporting.md 1–150 | 当前新增可编辑导出；仍有逐元素栅格化、逐页图片回退和点击步骤增页。 [依据](https://github.com/slidevjs/slidev/blob/73053ab2b9653ed475960301b56e1ce4439d9c75/docs/guide/exporting.md) |
| [hakimel/reveal.js](https://github.com/hakimel/reveal.js) | 72,387 | README.md 9–15、功能与文档链接 | 讲述、交互、备注和静态导出是不同产物；HTML动画不自动成为原生PPT动画。 [依据](https://github.com/hakimel/reveal.js/blob/e240e175232fa2de660a02bc0d7bf5f655b159bb/README.md) |
| [gnab/remark](https://github.com/gnab/remark) | 13,006 | README.md 1–20、105–110；标题索引 | 短Markdown内容与备注分离，打印外观也要验证；没有原生PPTX证据时不作承诺。 [依据](https://github.com/gnab/remark/blob/be58d65d59faca35f6ea3f55aeb8f65ef76305a3/README.md) |
| [quarto-dev/quarto-cli](https://github.com/quarto-dev/quarto-cli) | 6,058 | README.md 8–24、62–65；官方PowerPoint文档的Notes/Templates/Layouts章节 | Markdown也可走原生PowerPoint；reference-doc缺具名版式会回退，必须检查实际模板使用。 [依据](https://quarto.org/docs/presentations/powerpoint.html) |
| [microsoft/markitdown](https://github.com/microsoft/markitdown) | 188,818 | README.md 9–35及转换/可选依赖标题扫描 | 材料抽取服务语义分析，不等于高保真版式解析；抽取文字不能替代查看源页。 [依据](https://github.com/microsoft/markitdown/blob/4cc9fa17653d695d64fb9eee5b33d4de55ff84e8/README.md) |
| [anthropics/skills](https://github.com/anthropics/skills) | 179,872 | README.md许可段；skills/pptx/SKILL.md 1–55；skills/pptx/LICENSE.txt全文 | 作为工作流比较和许可识别；PPTX子技能是受限源码，不复制其文本/脚本。参数取独立官方API。 [依据](https://github.com/anthropics/skills/blob/683bc88e56f3e09ba94f7055977f3d3aa499f202/skills/pptx/LICENSE.txt) |
| [pipipi-pikachu/PPTist](https://github.com/pipipi-pikachu/PPTist) | 9,369 | README.md功能条目扫描及145–205；doc/AIPPT.md 1–63 | 页面/节点身份与字段约束支持模板映射；其模板库页数要求不是成品的普遍页数要求。 [依据](https://github.com/pipipi-pikachu/PPTist/blob/82ecf10040ca8da67832f173b58d3baf5da59887/doc/AIPPT.md) |
| [presenton/presenton](https://github.com/presenton/presenton) | 10,966 | README.md功能/导出标题扫描；docs/template-v2.md 1–135 | 结构、预览与字段容量结合；固定装饰和可编辑字段区分，局部分析失败保留来源区域。 [依据](https://github.com/presenton/presenton/blob/35bf44290f821323e003da854f78ffcb0e918167/docs/template-v2.md) |
| [icip-cas/PPTAgent](https://github.com/icip-cas/PPTAgent) | 5,089 | README.md当前skill段、论文摘要段；skills/pptagent/SKILL.md全文58行；references/task-contract.md全文44行 | 当前HTML创作与导出双审查；共享资产变动使审查失效，finalize绑定当前成品。 [依据](https://github.com/icip-cas/PPTAgent/blob/833cda553b343be0e486a93b0b57cac962cdd566/skills/pptagent/SKILL.md) |
| [Anionex/banana-slides](https://github.com/Anionex/banana-slides) | 15,693 | README.md功能索引与141–183 | 整页生图与Beta分层导出分别验收；提示词约束不能证明不漏字，重建需内容校对。 [依据](https://github.com/Anionex/banana-slides/blob/8281ae908a265500a17869dca18be6cae733eb5e/README.md) |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | 57,856 | README.md 56–111；docs/zh/templates-guide.md 1–46；executor-chart.md全文77行；目录筛选 | 身份、风格、版式与整稿分开复用；定量几何由源数据控制，图表核验不能被结构核验替代。 [依据](https://github.com/hugohe3/ppt-master/blob/2d72da616cf9fa40d4dcaf59fd4c980ecf534b7d/skills/ppt-master/references/executor-chart.md) |
| [ningzimu/codex-ppt-skill](https://github.com/ningzimu/codex-ppt-skill) | 6,364 | README.md 7、24–29、特点索引、200–220、250–257 | 保持样张方法和逐页素材身份；保留其用户明确审批机制的适用范围，不强加到自主模板编辑。 [依据](https://github.com/ningzimu/codex-ppt-skill/blob/6d76c0eded7f8a8b0c4e304697e6f2bda7c408b2/README.md) |
| [chuspeeism/dashi-ppt-skill](https://github.com/chuspeeism/dashi-ppt-skill) | 9,180 | README.md功能与导出索引、173–195 | 字段式布局复用；示例token成本不是普遍预算；根许可与专有导出子组件范围分开。 [依据](https://github.com/chuspeeism/dashi-ppt-skill/blob/21dc7e5fc8c3a0d7f6a94948153dd1ee954f4e64/README.md) |

## 本轮最重要的修正

1. **按对象与版本选型**：中间表示是Markdown、HTML或SVG，不说明最终对象能力。Slidev现有原生导出不能被旧“仅源码可编辑”结论覆盖；Marp实验模式和备注限制分别记录。
2. **保留任务有自己的验收**：仅改排版不能删观点、页序或备注；文字/备注/媒体对照与视觉比例检查分开，母版继承还需结构证明。
3. **数据拥有几何**：数据值、尺度、分母、单位和缺失值先锁定。原生图表结构合法不能证明计算、标签和证据正确。
4. **中文富文本按语义换行**：颜色或粗体run不等于一个段落；删除“每项富文本必须换行”的错误通则。框宽固定加15%改成测量和渲染验证。
5. **质量与权限分开**：大纲/风格/样张是内部检查点，只有用户要求或真实关键冲突才等待批准。已有模板不强制三个设计方向，也不默认一页一个子代理。
6. **允许合格替代**：绘图、原生图形与图像处理并非天然低质量；是否可替代按原任务和宿主约束判断，不因工具名称停止。
7. **审的是交付文件**：记录最终哈希与实际检查范围；改页面或共享资产使对应审查失效，重新导出并检查受影响内容。
8. **研究不是运行认证**：删除普遍token单价、普遍95%保真天花板、固定网格配额及“提示词能保证不漏字”等未经本轮验证的强断言。

## 原有笔记的使用方式

[旧学习笔记](GitHub高星PPT项目-学习笔记.md)保留为历史记录，不抹去此前研究。涉及“约1万token/页”“95%是天花板”“每run换行”“豆包内部实现确定等同某开源项目”等表述，本轮不沿用为通用规则。前几轮的源码存档和运行声明没有在本轮逐项重验。

本轮只原创整理流程与技术事实，不打包第三方技能或源码。Anthropic PPTX子技能以及Dashi导出子组件的许可范围单独识别，不能因仓库根标识就视为全仓库同许可。商业许可、价格和产品内部实现不属于本轮验证结论。

## 验证边界

新增`audit_pptx.py`及故障注入测试；具体运行结果见[验证记录](技能优化验证-2026-10-06.md)。实际14页案例用于文字/备注/媒体和原生表格检查，未在本轮重做整套PPT，也未重新运行PowerPoint视觉验证。技能结构校验与场景推演不能证明模型所有未来输出都会合格。
