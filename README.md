## 简介

[akir-vue](https://github.com/pomeluce/akir-vue) 是一个开源的, 基于 [Vue3.0](https://github.com/vuejs/vue-next)、[Vite](https://github.com/vitejs/vite)、 [Naive UI](https://www.naiveui.com/)、[TypeScript](https://www.typescriptlang.org/) 的前后台快速开发脚手架，它使用了最新的前端技术栈，并提炼了典型的业务模型，页面，包括二次封装组件、动态菜单、权限校验、粒子化权限控制、流程管理等功能, 它可以帮助你快速搭建前台后台项目。

## 特性

- 响应式、多主题，多配置，快速集成，开箱即用
- 基于 `Vue3`、`Typescript`、`Pinia`、`Vite` 等前端前沿技术
- 集成富文本、Markdown、VisualTabel、在线 Excel
- 采用 Unocss 进行样式控制, 方便快捷
- 强大的鉴权系统，对路由、菜单、功能点等支持`三种鉴权模式`，满足不同的业务鉴权需求
- 移动端适配, 响应式布局
- 持续更新，实用性页面模板功能和交互，随意搭配组合，让构建页面变得简单化

## 文档

```
待完善
```

## 准备

- [Node](http://nodejs.org/) 和 [Git](https://git-scm.com/) -项目开发环境
- [Vite](https://vitejs.dev/) - 熟悉 Vite 特性
- [Vue3](https://v3.vuejs.org/) - 熟悉 Vue 基础语法
- [TypeScript](https://www.typescriptlang.org/) - 熟悉`TypeScript`基本语法
- [Es6+](http://es6.ruanyifeng.com/) - 熟悉 es6 基本语法
- [Vue-Router](https://next.router.vuejs.org/) - 熟悉 vue-router 基本使用
- [Mock.js](https://github.com/nuysoft/Mock) - mockjs 基本语法

## 使用

#### 方式 1:

- 安装 cli 工具

```bash
npm i akir-cli -g
```

- 通过全局命令创建项目

```bash
akir-cli create
```

- 进入项目文件夹, 启动项目

```bash
cd [project_name]

pnpm install

pnpm dev

pnpm build
```

#### 方式 2:

- 获取项目代码

```bash
git clone https://github.com/pomeluce/akir-vue.git
```

- 安装依赖

```bash
cd akir-vue

pnpm install
```

- 运行

```bash
pnpm dev
```

- 打包

```bash
pnpm build
```

## 如何贡献

非常欢迎你的加入！[提一个 Issue](https://github.com/pomeluce/akir-vue/issues) 或者提交一个 Pull Request。

**Pull Request:**

1. Fork 代码!
2. 创建自己的分支: `git checkout -b feat/xxxx`
3. 提交你的修改: `git commit -am 'feat(function): add xxxxx'`
4. 推送您的分支: `git push origin feat/xxxx`
5. 提交`pull request`

## Git 贡献提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中

## 浏览器支持

本地开发推荐使用`Chrome 80+` 浏览器

支持现代浏览器, 不支持 IE

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :-: | :-: | :-: | :-: | :-: |
| not support | last 2 versions | last 2 versions | last 2 versions | last 2 versions |
