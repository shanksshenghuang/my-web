# Leeroy 风格网站设计拆解与前端生成规范

## 1. 结论

该网站的核心不是“很多动画”，而是用一套统一的视觉语法组织品牌叙事：

- 以超大编辑感衬线标题建立品牌气质，以紧凑无衬线小字承载导航与辅助信息。
- 用蓝黑流体 WebGL 作为首屏情绪背景，并把动态图像切片直接嵌入标题，令文字、媒体和入口合为一个整体。
- 用长滚动、整屏项目章节、视差和固定叙事，把普通作品列表改造成连续的案例浏览体验。
- 用克制的色板、宽松留白、少圆角或无圆角结构，避免常见 SaaS 卡片感。
- 动效大多由滚动进度驱动，而不是无意义自动播放；进入、悬停、拖拽、页面切换使用同一套缓动语言。

参考目标应是“高端创意机构的编辑式数字展览”，不能直接复制 Leeroy 的商标、文案、字体文件、图片或 WebGL 素材。

## 2. 分析依据

- 官网：首页 [https://www.leeroy.ca/](https://www.leeroy.ca/)
- 本地参考视频：`20260701_092311.mp4`，约 124.1 秒
- 官网公开 HTML、CSS、JavaScript 构建资源
- 视频首屏与官网结构交叉核对

## 3. 设计 DNA

| 维度 | 设计特征 | 前端落地 |
|---|---|---|
| 品牌感 | 艺术指导优先、技术作为叙事工具 | 内容层级先行，动画服务于阅读顺序 |
| 视觉重心 | 超大标题、全屏媒体、少量高密度信息 | 标题使用流体字号，媒体采用 `object-fit: cover` |
| 构图 | 非对称、跨列、局部重叠、标题内嵌图片 | 12 列网格 + 绝对定位媒体切片 |
| 节奏 | 大留白与高冲击画面交替 | 100–150vh 项目章节，普通信息区回到白底 |
| 形状 | 直角、窄边框、切片、遮罩 | 少用大圆角；用 `clip-path`、mask 和 overflow |
| 交互 | 滚动叙事、跟随游标、拖拽轮播 | GSAP ScrollTrigger、Keen Slider、`quickTo()` |
| 情绪 | 高端、实验、克制、略带未来感 | 深墨色、冷蓝、电光蓝、纸白、冷灰 |

## 4. 页面结构与排版布局

### 4.1 固定导航

- 左侧为白色品牌标识，中间为少量一级导航，右侧为独立菜单按钮。
- 导航悬浮在首屏媒体之上，默认透明背景。
- 当前项或悬停项使用深色滑动底块，文字颜色同步反转。
- 向下滚动超过约 70px 后，导航向上隐藏；向上滚动时重新出现。
- 桌面端保持精简横向导航，移动端收敛为菜单入口。

### 4.2 首屏 Hero

- 高度约 `100–110svh`，内容靠近底部，保留上半屏媒体呼吸空间。
- 背景为蓝黑有机流体 WebGL，边缘柔化，具备连续形变或噪声流动。
- H1 使用 3–4 行超大高对比衬线体，桌面字号约 `clamp(80px, 9–10vw, 145px)`，行高约 `0.88–0.98`。
- 标题中嵌入两条横向媒体切片；切片既是图片/GIF，也是可点击入口。
- 一段大写无衬线说明文字插入标题空隙，与大标题形成明显尺度对比。
- 首屏不放传统居中按钮组；CTA 直接嵌入标题和图像结构。

### 4.3 重点项目叙事

- 连续 4 个左右整屏项目章节，每章约 `130–150vh`。
- 章节标题先在相对纯净的背景中出现，继续滚动后全幅项目图进入视觉中心。
- 主图有轻微反向视差，画面高度比容器多约 5–15%，避免边缘露白。
- 底部悬浮半透明玻璃信息条：左侧项目标题与类别，右侧 1–3 张竖向预览图。
- 信息条使用低透明白底和 `backdrop-filter: blur(16px)`，不使用厚重阴影。

### 4.4 项目横向轮播

- 白底章节与前面的沉浸式项目区形成节奏切换。
- 轮播为自由拖拽、无限循环、轻惯性，不强制分页点。
- 桌面端单卡约占 29% 宽度，平板约 43%，移动端约 100%。
- 卡片图片偏竖版，标题在下方，项目名以低透明度小字显示。
- 鼠标进入轮播区域后出现圆形“拖拽”跟随游标。

### 4.5 品牌文化大标题

- 深色背景上再次出现超大衬线标题。
- 标题中嵌入一条小型图片入口，复用首屏的“文字 + 媒体切片”语法。
- 可在鼠标移动时出现少量图片轨迹，但必须限制数量和生命周期。

### 4.6 新闻/动态列表

- 使用全宽横向分隔线，而不是独立圆角卡片。
- 每行包含大标题、类别小字、三张窄幅预览图和文字型操作入口。
- 悬停时背景覆盖层横向展开，文字与图片做短距离错位或切片揭示。
- 信息密度提高，但仍保持强网格对齐与明显行间留白。

### 4.7 信息区与页脚

- 当前客户/合作方使用大字号纯文本列表，避免 Logo 墙过度商业化。
- 页脚顶部保留两个超大文字 CTA，如“加入团队”“开始项目”。
- 中部以循环视频填充品牌字形遮罩，形成动态 Logo，而不是直接播放矩形视频。
- 底部使用多列联系信息，并可显示当地实时钟。

## 5. 交互逻辑与动效拆解

### 5.1 首次进入

1. 页面背景先可见，避免白屏。
2. H1 每行从 `y: 115%` 进入遮罩容器，`stagger: 0.08`。
3. 标题内媒体切片从 `max-width: 0` 展开至实际宽度，持续约 1.6 秒。
4. 辅助文字从左侧滑入或淡入。
5. 动画整体使用 `power3.out`、`power3.inOut`、`expo.inOut`，不使用弹跳效果。

建议参数：

```ts
const motion = {
  revealDuration: 1,
  sliceDuration: 1.6,
  stagger: 0.08,
  easeOut: "power3.out",
  easeInOut: "power3.inOut",
  scrollEase: "none",
};
```

### 5.2 Hero 滚动离场

- 内容整体随滚动向上移动约 10%。
- 深色遮罩向下移动约 20%，同时逐渐增加到约 0.8 的透明度。
- 动画使用 `scrub` 与滚动进度绑定，形成深度分层。
- 不对固定容器本身做复杂变换，只动画内部内容和遮罩。

### 5.3 重点项目章节

- 每个项目用独立 ScrollTrigger 管理，按页面顺序创建。
- 图片层使用线性视差 `ease: "none"`。
- 标题与信息条可在章节进入 20–35% 时渐入，在离开时降低透明度或位移。
- 桌面端可使用 pin/scrub；移动端取消 pin，改为普通纵向流和一次性 reveal。

### 5.4 图片切片悬停

- 图片容器分为三条水平切片，以 CSS 变量控制 `clip-path`。
- 悬停时三条切片以轻微不同方向或不同延迟移动，制造数字错位感。
- 可在主图和 hover 图之间做快速替换，但不要使用强烈闪烁。
- 文本双层叠放，悬停时旧文字上移、新文字从下方进入。

### 5.5 导航悬停

- 深色指示块在导航项之间平滑移动并改变宽度。
- 指示块与文字颜色同时过渡，持续约 0.5–0.8 秒。
- 鼠标离开后回到当前页面项；没有当前项时，指示块收缩为 0。

### 5.6 自定义游标与拖拽

- 仅在 `(pointer: fine)` 且桌面宽度下启用。
- 使用 `gsap.quickTo()` 更新 `x/y`，避免每次 `mousemove` 创建新 tween。
- 轮播区域显示带磨砂背景的 80–100px 圆形游标，中心为简短“DRAG/拖拽”文字。
- 移动端、触屏和减少动态偏好下完全禁用。

### 5.7 页面切换

- 使用横向 clip/遮罩覆盖当前页面，约 1.2–2 秒完成切换。
- 下一页面在遮罩后进入，完成后刷新 ScrollTrigger。
- 若使用 Next.js，可将该动效限制在同站内部路由；优先保证浏览器前进/后退与焦点管理正确。

## 6. 视觉系统

### 6.1 色彩

```css
:root {
  --ink: #242733;
  --night: #121319;
  --navy: #0e172f;
  --paper: #f0f1f5;
  --mist: #e6e7eb;
  --blue: #3971ff;
  --white: #ffffff;
  --line: #d2d2d2;
}
```

- Hero：`--blue`、深蓝与黑色流体渐变。
- 内容区：`--paper` 与 `--white` 交替。
- 正文：`--ink`；反白文字：`--mist` 或 `--white`。
- 强调色只使用电光蓝，不添加多套品牌色。

### 6.2 字体

官网公开资源中使用：

- `FeatureDisplay`：超大展示衬线标题。
- `FeatureDeck` / `FeatureText`：编辑型正文或副标题。
- `Sohne`：导航、标签、按钮和元信息。

生成新站时不要复制未经授权的字体文件。建议替代：

- 展示标题：`Instrument Serif`、`Bodoni Moda`、`Cormorant Garamond`。
- UI 与正文：`Inter`、`Manrope`、`IBM Plex Sans`。

### 6.3 字号与网格

```css
:root {
  --gutter: clamp(12px, 1.4vw, 24px);
  --display: clamp(64px, 9.6vw, 145px);
  --section-title: clamp(44px, 5vw, 76px);
  --card-title: clamp(20px, 2vw, 34px);
  --ui: clamp(12px, 0.95vw, 14px);
}
```

- 桌面使用 12 列网格，列间距约 4–8px，页面边距约 20–30px。
- 大标题行高 `0.9–1.0`，正文行高 `1.35–1.6`。
- UI 小字大写、轻微字距、短句；不让正文全部大写。
- 圆角控制在 `0–8px`，按钮可用轻微切角或错位双层背景。

## 7. 图片与媒体元素

- Hero：原创蓝黑流体 3D/WebGL 或预渲染循环视频；必须有静态 poster。
- 项目主图：高分辨率横向摄影、空间、产品、品牌视觉，覆盖整个视口。
- 项目预览：三张连续竖图，展示细节、界面或应用场景。
- 轮播卡片：统一竖向裁切，但允许不同色彩风格，形成作品集感。
- 标题切片：400×100 或 550×100 左右的宽条动态图，内容要高识别度。
- 新闻预览：每行最多三张 100×130 左右的小图，作为悬停反馈而非主内容。
- 页脚：低帧率、短循环、无声视频，通过 SVG/CSS mask 显示在原创字标中。

所有图片必须提供 `alt`；纯装饰图使用空 `alt`。首屏关键图预加载，其余媒体懒加载。

## 8. 技术栈判断

### 8.1 已从公开资源确认

- CMS/内容层：Craft CMS 生态；页面包含 SEOmatic 与 Formie 痕迹。
- 构建工具：Vite，包含 module/legacy bundle。
- 动画：GSAP 3.12.2、ScrollTrigger 3.12.2。
- 平滑滚动：Lenis 1.0.27，并与 ScrollTrigger 同步。
- 页面过渡：Barba.js。
- 3D/WebGL：Three.js、自定义 GLSL、后处理 EffectComposer。
- 轮播：Keen Slider；打包资源中同时包含 Swiper。
- 矢量/序列动画：Lottie。
- 局部内容增强：HTMX。
- 分析与监测：Google Tag Manager、LinkedIn Insight、BugHerd/BugHarbor 类前端反馈脚本。

### 8.2 推荐复现栈

- Next.js + React + TypeScript，或在现有项目中保持原框架。
- CSS Modules/Tailwind 任选其一；复杂遮罩和排版使用普通 CSS 更清晰。
- GSAP + `@gsap/react` + ScrollTrigger。
- Lenis 仅在确有需要时启用；保持原生滚动语义并同步 ScrollTrigger。
- Keen Slider 实现自由拖拽循环轮播。
- Three.js 仅用于 Hero；低性能设备使用 poster 或 MP4/WebM 替代。

## 9. 响应式、可访问性与性能

- `>= 1024px`：启用完整 WebGL、视差、跟随游标、整屏项目叙事。
- `768–1023px`：减少 pin 时长与视差幅度，卡片显示约 2.3 张。
- `< 768px`：关闭自定义游标和重型图片轨迹；Hero 标题重排；项目区回到自然文档流。
- 使用 `gsap.matchMedia()` 同时管理断点与 `prefers-reduced-motion`。
- 减少动态模式下关闭 scrub、pin、连续 WebGL 形变，只保留短淡入。
- GSAP 只动画 `transform`、`opacity/autoAlpha`；避免持续动画 `top/left/width/height`。
- React 中使用 `useGSAP({ scope })`，组件卸载时自动清理 timeline 与 ScrollTrigger。
- 字体加载、图片尺寸变化和动态内容完成后再调用一次 `ScrollTrigger.refresh()`。
- WebGL DPR 上限建议 1.5；页面不可见时暂停渲染；监测低端设备并主动降级。
- LCP 媒体提供压缩 poster；非首屏视频使用 `preload="none"`。
- 所有交互必须可用键盘完成，并保持可见焦点。

## 10. 中文前端生成提示词

```text
请生成一个原创的高端创意机构/品牌官网首页，参考 Leeroy.ca 的“编辑式排版、沉浸媒体、滚动叙事”方法，但不得复制其 Logo、文案、字体文件、图片、WebGL 素材或具体版式细节。

技术要求：使用 Next.js、React、TypeScript；动画使用 GSAP、@gsap/react、ScrollTrigger；自由拖拽轮播使用 Keen Slider；Hero 可选 Three.js 自定义 shader。保持组件化、可维护和可直接运行。若项目已有技术栈，沿用现有架构，不做无关重构。

视觉方向：高端、前卫、克制、艺术指导感强。使用深墨色 #242733、夜黑 #121319、纸白 #F0F1F5、冷灰 #E6E7EB、电光蓝 #3971FF。避免紫色渐变、玻璃卡片堆叠、大面积圆角、常见 SaaS 模板和过度阴影。桌面采用 12 列网格，边距 20–30px；大标题使用高对比编辑型衬线体，字号 clamp(64px, 9.6vw, 145px)，行高 0.92；导航、标签和元信息使用紧凑无衬线体、大写和轻微字距。

页面结构：
1. 透明固定导航：左 Logo、中间 3 个导航、右侧 Menu；导航悬停有深色滑动指示块；向下滚动隐藏，向上滚动显示。
2. 100–110svh Hero：蓝黑有机流体背景，超大多行衬线标题靠底部排布；在标题行内嵌两条横向动态图像 CTA；辅助说明文字以小号大写无衬线插入标题空隙。
3. 4 个重点项目章节：每章 130–150vh，全幅项目图、轻微反向视差、章节标题和底部半透明磨砂信息条；信息条包含项目标题、类别和 3 张竖向预览图。
4. 白底项目轮播：自由拖拽、无限循环、无分页点；桌面显示约 3.2 张，移动端 1 张；区域内显示圆形 DRAG 跟随游标。
5. 深色文化宣言区：第二组超大衬线标题，标题中嵌一条图片入口；可有受控的短暂图片轨迹。
6. 新闻列表：全宽分隔线行，包含标题、类别、三张小预览图和文字链接；悬停时覆盖层横向展开，文字做双层切换。
7. 信息区与页脚：客户文字列表、两个超大 CTA、通过原创字标遮罩播放的短循环视频、联系信息与本地时间。

动效规则：首屏标题各行从 y:115% 的遮罩中进入，duration 1s，stagger 0.08，ease power3.out；内嵌媒体切片从宽度 0 展开，duration 1.6s，ease power3.inOut。滚动联动使用 ScrollTrigger scrub，视差 tween 必须 ease:none。React 中使用 useGSAP 和 scope；鼠标跟随使用 gsap.quickTo。桌面端启用 pin/视差，移动端改为普通文档流和一次性淡入。使用 gsap.matchMedia 处理断点和 prefers-reduced-motion。

性能与质量：只优先动画 transform 与 autoAlpha；WebGL DPR 不超过 1.5，离屏暂停并提供 poster；首屏资源预加载，其余懒加载；字体和图片稳定后调用 ScrollTrigger.refresh；卸载时清理全部动画。保证语义 HTML、键盘导航、可见焦点、合理 alt、无横向溢出，并验证 1440×900、1024×768、390×844 三个视口。

输出完整页面代码、组件结构、样式、示例数据和运行说明。内容使用专业、简洁、以品牌价值和项目成果为中心的文案，不使用占位乱码，不堆砌营销形容词。
```

## 11. English Front-end Generation Prompt

```text
Build an original premium creative-agency or brand homepage inspired by the editorial typography, immersive media, and scroll-led storytelling principles of Leeroy.ca. Do not copy its logo, copywriting, proprietary fonts, photography, WebGL assets, or exact composition.

Use Next.js, React, and TypeScript. Use GSAP with @gsap/react and ScrollTrigger for motion, Keen Slider for the free-drag carousel, and optionally Three.js with a custom shader for the hero. Keep the implementation component-based, maintainable, responsive, and directly runnable. If an existing project is provided, preserve its stack and avoid unrelated refactoring.

Art direction: premium, experimental, restrained, editorial, and human. Use ink #242733, night #121319, paper #F0F1F5, mist #E6E7EB, and electric blue #3971FF. Avoid purple gradients, generic glass-card grids, oversized rounded corners, heavy shadows, and conventional SaaS landing-page patterns. Use a 12-column desktop grid with 20–30px page gutters. Set display headlines in a high-contrast editorial serif at clamp(64px, 9.6vw, 145px) with 0.92 line-height. Use a compact sans-serif in uppercase with subtle tracking for navigation, labels, and metadata.

Page structure:
1. A transparent fixed header with logo on the left, three primary links centered, and a Menu control on the right. Add a sliding dark hover indicator. Hide the header while scrolling down and reveal it while scrolling up.
2. A 100–110svh hero with an original blue-and-black organic fluid background. Place a huge multi-line serif statement near the bottom. Insert two wide animated media-strip CTAs directly inside the headline and place a compact uppercase agency statement inside the headline's negative space.
3. Four featured-project chapters, each 130–150vh tall, with full-bleed imagery, subtle reverse parallax, an editorial chapter statement, and a translucent bottom information rail. The rail contains the project title, category, and three portrait preview images.
4. A white project-carousel section with free drag, infinite looping, and no pagination dots. Show about 3.2 cards on desktop and one card on mobile. Display a frosted circular DRAG cursor inside the carousel on fine-pointer devices.
5. A dark culture-manifesto section with another oversized serif statement and one inline image-strip link. An optional image trail may appear briefly but must stay bounded and lightweight.
6. A full-width news list separated by rules instead of rounded cards. Each row includes a large title, category, three narrow previews, and a text action. On hover, reveal a horizontal overlay and swap text through a clipped two-layer transition.
7. A client-text section and footer containing two oversized CTAs, a short muted loop masked through an original wordmark, contact details, and local time.

Motion system: reveal hero headline lines from y:115% inside clipped wrappers with duration 1s, stagger 0.08, and power3.out. Expand inline media strips from zero width over 1.6s with power3.inOut. Use ScrollTrigger scrub for scroll-linked motion and ease:none for parallax progress. In React, use useGSAP with a scoped ref and automatic cleanup. Use gsap.quickTo for pointer followers. Enable pinning and richer parallax only on desktop; use normal document flow and one-time reveals on mobile. Manage breakpoints and prefers-reduced-motion with gsap.matchMedia.

Performance and accessibility: prioritize transform and autoAlpha animations; cap WebGL DPR at 1.5, pause it offscreen, and provide a static poster; preload only critical hero assets and lazy-load the rest; call ScrollTrigger.refresh after fonts and media settle; clean up timelines and triggers on unmount. Use semantic HTML, keyboard-operable controls, visible focus states, useful alt text, no horizontal overflow, and test at 1440×900, 1024×768, and 390×844.

Return the complete page code, component structure, styles, sample content data, and run instructions. Use concise professional copy focused on brand value and measurable project outcomes. Do not use lorem ipsum or generic hype.
```

## 12. 验收标准

- 首屏 3 秒内能读到品牌主张，不被背景动效干扰。
- 动效关闭后，内容顺序、CTA 和导航仍完全可用。
- 桌面端无明显滚动卡顿，移动端不启用重型 WebGL 与跟随游标。
- 页面不存在大面积模板化圆角卡片或紫色渐变。
- 每个动画都有触发条件、结束状态和清理逻辑。
- 1440、1024、390 宽度下无横向溢出，标题不遮挡关键 CTA。
- Lighthouse 的可访问性、最佳实践和 SEO 目标均不低于 90。

