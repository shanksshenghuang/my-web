# 前端实施代理规范

## 目标

根据同目录 `design.md` 生成原创、可运行、响应式的高端创意机构或品牌网站。复用 Leeroy 类网站的设计原则，不复制其受保护资产和具体页面。

## 开始前

1. 先用 `rg --files` 理解项目目录、框架、样式方案和现有组件。
2. 阅读 `design.md` 与本文件，识别必须实现、可降级和禁止复制的内容。
3. 检查现有依赖、构建命令、路由和数据来源；优先沿用现有技术栈。
4. 修改前先说明准备修改的文件、原因和验证方式。
5. 需求或业务事实不明确时先询问，不编造客户、奖项、数据或案例成果。

## 实施原则

- 保持现有代码风格，不重构无关模块。
- 使用语义 HTML；组件按页面职责拆分，不为每个小元素创建组件。
- 将内容数据与表现组件分离，项目、新闻和客户列表使用 typed data。
- 将颜色、字号、间距和动效参数集中为 design tokens。
- 优先使用 CSS Grid、Flexbox、`clamp()`、`aspect-ratio` 和容器查询。
- 不使用通用 SaaS 模板、大圆角卡片海、紫色渐变或无意义装饰图标。
- 不下载或复用 Leeroy 的 Logo、图片、视频、字体和文案。

## 推荐组件结构

```text
app/
  page.tsx
components/
  site-header.tsx
  hero-experience.tsx
  featured-projects.tsx
  project-carousel.tsx
  culture-manifesto.tsx
  news-list.tsx
  client-section.tsx
  site-footer.tsx
  motion-provider.tsx
data/
  projects.ts
  news.ts
lib/
  gsap.ts
  motion.ts
styles/
  tokens.css
  globals.css
```

若现有项目结构不同，按现有结构映射，不强制新建以上目录。

## 动效实现

- 使用 `gsap`、`@gsap/react` 与 `ScrollTrigger`。
- 在客户端注册插件；SSR 阶段不得执行 GSAP 或访问 `window`。
- React 组件使用 `useGSAP({ scope })`，所有选择器限定在组件根节点。
- 使用 timeline 组织同一段进入动画，不用大量 `delay` 串联。
- ScrollTrigger 放在顶层 tween 或 timeline 上，不放在 timeline 的子 tween 上。
- `scrub` 动画使用 `ease: "none"`；不要在同一个 trigger 同时使用 `scrub` 与 `toggleActions`。
- pin 外层容器，动画其内部子元素；不要持续变换被 pin 的元素本身。
- 鼠标跟随使用 `gsap.quickTo()`，仅在 fine pointer 设备启用。
- 只优先动画 `x/y/scale/rotation/autoAlpha`；避免用 `top/left/width/height` 做持续运动。
- 使用 `gsap.matchMedia()` 管理桌面、移动端和 `prefers-reduced-motion`。
- 字体、图片和动态内容稳定后调用一次 `ScrollTrigger.refresh()`。
- 组件卸载、路由切换和媒体查询变化时清理 timeline、事件和 ScrollTrigger。

## Hero WebGL

- Three.js 只承担视觉背景，不影响页面内容与可访问性树。
- DPR 上限 1.5；低端设备、触屏或减少动态模式下显示静态 poster。
- 页面隐藏或 Hero 离开视口时暂停渲染循环。
- shader 编译失败时静默降级，不阻塞页面初始化。
- 不把大型视频或纹理直接放入 JavaScript bundle。

## 响应式要求

- 桌面：完整 Hero、视差、项目 pin、拖拽游标。
- 平板：降低视差与 pin 距离，控制媒体并发量。
- 移动：自然文档流；关闭跟随游标、图片轨迹和高成本 WebGL；标题重新分行。
- 使用 `100svh`，避免移动浏览器地址栏导致跳动。
- 每个绝对定位元素都必须有移动端回退方案。

## 内容与 SEO

- 文案简洁、专业、以品牌价值、方法和项目结果为中心。
- 若用于 B2B 外贸站，突出能力、应用场景、质量控制、交付和询盘 CTA。
- 标题层级只能有一个 H1；章节按 H2/H3 顺序组织。
- 提供唯一 title、description、canonical、Open Graph 信息和结构化数据。
- SEO 文案自然，不堆砌关键词，不隐藏文本。
- 所有媒体提供尺寸，内容图提供有意义的 `alt`。

## 可访问性

- 导航、轮播、菜单和 CTA 必须可键盘操作。
- 提供可见焦点样式、跳到正文链接和正确 ARIA 状态。
- 动态游标不能代替系统指针或可见链接状态。
- 减少动态模式下禁用 pin、scrub、连续视差和 WebGL 形变。
- 文本与背景对比度至少满足 WCAG AA。

## 性能预算

- 首屏 JavaScript 尽量小于 220KB gzip；Three.js 可延迟加载。
- LCP 图片使用响应式尺寸和现代格式；非首屏图片懒加载。
- 首屏只预加载一套字体必要字重和关键 poster。
- 同时运行的连续动画保持最少；离屏动画暂停或销毁。
- 不全局滥用 `will-change`，只在实际动画元素上短期使用。

## 验证

修改后执行项目已有的 lint、typecheck、test 和 build 命令。至少检查：

- 1440×900、1024×768、390×844 三个视口。
- 首屏进入、滚动方向导航、项目章节、轮播拖拽和新闻悬停。
- `prefers-reduced-motion: reduce`。
- 键盘 Tab 顺序、焦点可见性和菜单 Esc 关闭。
- 无控制台错误、无 hydration 警告、无横向溢出。
- 路由来回切换后不存在重复 ScrollTrigger 或事件监听。

## 交付说明

完成后列出：

1. 改动文件。
2. 核心视觉与交互变化。
3. 实际执行的测试命令和结果。
4. 未完成项、降级项或需要用户提供的品牌资产。

