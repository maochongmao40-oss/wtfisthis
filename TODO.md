# Task: UnknownCrystal 个人主页实现

## Plan
- [x] 基础配置与样式设定
  - [x] 更新 `tailwind.config.js` 设置瑞士国际主义风格颜色与网格
  - [x] 更新 `src/index.css` 定义全局样式与字体
- [x] 页面结构开发
  - [x] 实现 `Hero` 区：展示头像、名字与一句话介绍
  - [x] 实现 `关于我` 区：结构化展示身份、项目、兴趣标签
  - [x] 实现 `数字分身聊天` 区：包含对话气泡与输入框
- [x] 核心功能逻辑
  - [x] 实现数字分身知识库与 AI 回答逻辑（前端模拟）
  - [x] 实现移动端适配与响应式布局
- [x] 优化与完善
  - [x] 搜索并集成真实图片（头像与背景）
  - [x] 运行 `npm run lint` 进行代码检查
  - [x] 最终功能验收
- [x] 大模型接入
  - [x] 初始化 Supabase 数据库
  - [x] 创建 Edge Function 调用文心大模型 API
  - [x] 安装流式请求依赖（ky、eventsource-parser）
  - [x] 实现流式请求工具函数
  - [x] 修改 Chat 组件接入真实 AI
  - [x] 部署 Edge Function

## Notes
- 风格重点：黄色主调、无衬线字体、强网格、极简。
- 数字分身：阳光、开放、创造力的语气。
- 已成功接入文心大模型 API，支持流式输出。
- 知识库已注入到 system prompt 中，确保回答符合 UnknownCrystal 人设。
