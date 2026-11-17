# 轻一点 · LIGHTLY

手机优先的个人减重打卡 PWA。纯静态网页，无账号、无后台、无第三方追踪，记录只保存在当前浏览器。

## 使用
- 今日：饮食、蛋白质、快走、力量、久坐活动、睡眠；可补记，体重默认以斤显示。
- 趋势：真实称重曲线、两个七日窗口的平均比较、历史记录。
- 计划：饮食示例、快走进阶、力量安排、趋势调整建议。
- 教学：三个动作的 GPT 生成示意与文字要点。
- 我的：更改目标、切换斤/公斤、导出/恢复 JSON 备份、桌面安装说明。

第一次联网完整打开后，应用资源可离线使用。iPhone 用 Safari 的「分享 → 添加到主屏幕」；Android 浏览器菜单选择安装或添加到主屏幕。不提供后台定时推送，可用手机系统提醒。

## 数据保存
浏览器清理、隐私模式、换手机、切换域名都可能导致记录不可用。建议每周在「我的」导出一次备份。备份包含个人健康记录，请妥善保存，不要提交到仓库。恢复前会校验格式并要求确认覆盖。打不开原记录时自动暂停保存，可先导出原始内容。

## 本地开发
使用 Node.js 22（至少 18），PowerShell 请使用 7。

```sh
npm ci
npm run verify
npm run dev
```

```sh
npm run build
npm run preview -- --port 4173 --base /light-checkin/
```

构建输出是 dist/，包含 manifest、PNG 图标、教学图、哈希资源及自动生成的离线缓存脚本。资源使用相对路径，可部署到 GitHub Pages 项目子路径。不要直接以 file:// 打开。

## GitHub Pages
推送 main 分支后运行 .github/workflows/pages.yml。仓库 Settings → Pages 的构建来源需设置为 GitHub Actions。工作流执行核心校验、构建并发布 dist/。默认项目地址为 https://xdw-h.github.io/light-checkin/，实际可用状态以发布验证为准。

## 素材与健康说明
public/exercise-guide.png 由 OpenAI 内置 imagegen 生成，提示词见 docs/image-prompt.md。图片是动作示意，不是医学认证；遵循页面文字要点，运动不适时停止。计划是针对健康成年人的起步参考，疾病或用药相关调整需由专业人员确认。

应用不会在使用时调用 OpenAI API，无需配置密钥。
