---
name: leeroy-inspired-frontend
description: 生成或改造具有编辑式超大排版、沉浸媒体、滚动叙事、GSAP ScrollTrigger 动效和高端创意机构气质的响应式前端页面。用于用户要求参考 Leeroy 类网站、创意机构官网、品牌作品集、沉浸式首页、视差项目展示、拖拽作品轮播或 WebGL Hero 时。
---

# Leeroy 风格前端生成

## 核心目标

生成原创的高端创意机构、品牌或作品集网站。提取编辑式排版、沉浸媒体和滚动叙事原则，不复制参考站的商标、文案、字体文件、图片、视频、shader 或精确布局。

## 读取顺序

1. 读取同目录 `design.md`，获得视觉系统、页面结构、动效参数和中英文生成提示词。
2. 读取同目录 `AGENT.md`，获得代码修改、性能、SEO、可访问性和交付要求。
3. 检查目标项目的目录、框架、依赖、样式和已有组件。
4. 仅在必要时引入新依赖，并说明原因。

## 输入

优先收集以下信息；缺失时使用安全默认值并明确标记：

- 品牌名称、行业、目标客户和核心 CTA。
- 页面类型：首页、作品集、产品页或企业官网。
- 已有技术栈、品牌色、字体与媒体资产。
- 必须保留的页面结构和样式。
- WebGL 是否必需，以及目标设备性能范围。
- 中英文或多语言要求。

不要编造公司历史、认证、客户、奖项、产能、技术参数或项目成果。

## 工作流程

### 1. 理解项目

- 使用 `rg --files` 阅读项目结构。
- 定位入口、路由、全局样式、字体、数据和动画初始化位置。
- 检查工作区已有修改，保护用户改动。
- 输出简短实施说明：改哪里、为什么、如何验证。

### 2. 建立视觉系统

- 定义 ink、night、paper、mist、blue、line 六类核心颜色。
- 使用高对比衬线展示标题与紧凑无衬线 UI 字体。
- 使用 12 列桌面网格、流体字号和低圆角组件。
- 避免紫色渐变、玻璃卡片堆叠、大圆角和模板化 SaaS 构图。
- 使用原创或用户授权的媒体；为未知资产建立清晰替换位。

### 3. 搭建内容结构

按需实现：

1. 透明固定导航。
2. 带流体背景和标题内媒体切片的 Hero。
3. 3–4 个整屏重点项目章节。
4. 自由拖拽循环作品轮播。
5. 文化宣言大标题区。
6. 全宽新闻/动态列表。
7. 客户文字区和动态字标页脚。

保持一个 H1，按内容顺序使用 H2/H3。确保关闭 JavaScript 后核心内容仍可阅读。

### 4. 实现动效

- 使用 GSAP Core、`@gsap/react` 和 ScrollTrigger。
- 使用 `useGSAP({ scope })` 绑定组件范围并自动清理。
- 使用 timeline 编排首屏分行揭示和媒体切片展开。
- 使用 ScrollTrigger `scrub` 驱动 Hero 离场、项目视差和章节进度。
- 对滚动联动 tween 使用 `ease: "none"`。
- 使用 `gsap.quickTo()` 实现桌面鼠标跟随。
- 使用 `gsap.matchMedia()` 管理桌面、移动端和减少动态模式。
- 在字体与媒体稳定后调用 `ScrollTrigger.refresh()`。
- 不在同一个 trigger 同时混用 `scrub` 和 `toggleActions`。
- 不持续动画布局属性；优先使用 transform 与 `autoAlpha`。

建议首屏参数：

```ts
const motion = {
  lineFromY: "115%",
  revealDuration: 1,
  sliceDuration: 1.6,
  stagger: 0.08,
  revealEase: "power3.out",
  sliceEase: "power3.inOut",
  scrollEase: "none",
};
```

### 5. 设置降级

- 为 WebGL 提供静态 poster。
- 将 DPR 限制为 1.5，并在离屏或页面隐藏时暂停渲染。
- 在移动端关闭自定义游标、图片轨迹、长 pin 和高成本 shader。
- 在 `prefers-reduced-motion: reduce` 下移除 scrub、pin 和连续形变，只保留短淡入。
- WebGL 或动画初始化失败时保持内容、导航和 CTA 可用。

### 6. 验证

- 执行项目已有 lint、typecheck、test 与 build。
- 检查 1440×900、1024×768、390×844。
- 检查滚动方向导航、Hero、项目章节、轮播拖拽、列表悬停和页脚。
- 检查键盘导航、焦点、对比度、alt 和减少动态模式。
- 检查控制台、hydration、横向溢出和重复事件监听。
- 检查路由往返后 ScrollTrigger 数量不会累积。

## 技术选择

- 优先沿用现有框架；新项目默认 Next.js + React + TypeScript。
- 使用普通 CSS/CSS Modules 表达复杂网格、mask 和 `clip-path`；不要为了简单布局堆叠工具类。
- 使用 Keen Slider 构建 free-drag、loop、auto-width 作品轮播。
- 仅在视觉收益明确时使用 Three.js；否则使用优化视频或 CSS 渐变流体背景。
- 将项目和新闻内容存入 typed data，避免把大量内容硬编码进组件。

## 输出要求

提供：

- 完整可运行代码，而不是静态效果片段。
- 清晰组件边界、design tokens 和示例数据。
- 响应式、减少动态和 WebGL 降级实现。
- 运行与测试命令。
- 改动文件、核心变化、测试结果和剩余风险。

## 禁止事项

- 不复制参考站的品牌资产、原文、专有字体或媒体文件。
- 不以动画掩盖缺失内容或错误布局。
- 不让自定义游标替代标准指针和焦点状态。
- 不在 SSR 阶段执行 GSAP、ScrollTrigger 或浏览器 API。
- 不在所有元素上设置 `will-change` 或 `force3D`。
- 不在未经测试的移动端保留桌面级 WebGL 和长距离 pin。
- 不修改与任务无关的结构、样式、配置、部署或数据库。

