# pawscooling Brand Showcase

宠物制冷产品品牌官网展示版本。页面沿用已认可版本的布局和交互系统，仅替换品牌、文案、静态图片及 SEO 内容。

## 保留内容

- 原区块顺序、排版和配色
- 原滚动动效、WebGL 和页脚视频
- 原项目轮播、菜单和响应式行为

## 主题内容

- 品牌：pawscooling
- 产品：宠物制冷垫、智能制冷床、便携制冷箱、宠物医院专业方案、OEM / ODM 产品
- 图片：AI 生成的蓝白色宠物制冷产品占位图，统一位于 `public/images/`
- 内部中文产品说明：`docs/pawscooling-content-map.md`

## 运行

```bash
npm run dev
```

然后访问：

```text
http://127.0.0.1:4173/
```

页面的视频、WebGL、字体和部分运行资源通过本地服务器加载，因此完整预览时需要联网。

## 构建

```bash
npm run build
```

静态构建输出位于 `site-build/`。

## 检查

```bash
npm run check
```

测试视口：`1440×900`、`390×844`。

## 上线前确认

- 正式询盘邮箱：`info@pawscooling.com`。
- 正式域名、真实公司联系方式与社交媒体链接尚未配置。
- 收到真实产品图后，可按现有文件名覆盖 `public/images/` 中对应占位图。
