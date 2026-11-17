# 轻一点实施计划

**Goal:** 手机本地减重打卡 PWA，并发布 GitHub Pages。
**Architecture:** Vite 原生模块；core.js 负责数据校验、日期和统计，app.js 负责安全 DOM 渲染与交互；service worker 缓存构建资源。
**Tech Stack:** JavaScript、CSS、Vite、Node assert、Playwright CLI。

- [ ] 1. 编写 verification/core.mjs，覆盖日期、换算、周均、备份校验和拒绝未来数据；运行 node verification/core.mjs 观察缺少实现的失败。
- [ ] 2. 实现 src/core.js，并运行同一命令确保通过。
- [ ] 3. 实现 index.html、src/app.js、src/style.css，今日、趋势、计划、教学、设置五个页面；localStorage 自动保存，失败显式反馈。
- [ ] 4. 生成并检查教学图片；创建图标、manifest、构建后缓存清单和 GitHub Pages workflow。
- [ ] 5. 运行 npm run build、Node 验证；启动预览并用手机尺寸浏览器验证记录、刷新、备份、子路径、离线及控制台。
- [ ] 6. 检查仅包含源码和静态素材，中文提交；使用已有 GitHub 认证创建仓库并推送，检查 Pages URL。认证缺失则保留完整制品并报告阻塞。

提交阶段检查 .test. 文件，本方案验证文件使用 verification/core.mjs；不包含用户实际记录。用户已于 2026-11-17 确认设计和 GitHub 静态托管。
