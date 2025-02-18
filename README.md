## Introduction

[akir-vue](https://github.com/pomeluce/akir-vue) is an open-source front-end and back-end rapid development scaffold based on [Vue](https://github.com/vuejs/core), [Vite](https://github.com/vitejs/vite), [Naive UI](https://www.naiveui.com/), and [TypeScript](https://www.typescriptlang.org/). It uses the latest front-end technology stack and refines typical business models, pages, and features, including secondary encapsulated components, dynamic menus, permission validation, granular permission control, process management, etc. It helps you quickly build front-end and back-end projects.

## Features

- Responsive, multi-theme, multi-configuration, fast integration, and ready to use out of the box.
- Based on cutting-edge front-end technologies such as Vue3, TypeScript, Pinia, Vite, etc.
- Integrated rich text editor, Markdown, VisualTable, online Excel.
- Uses TailwindCSS for styling control, which is simple and convenient.
- Powerful authentication system supporting three types of authentication modes for routing, menus, function points, etc., to meet different business authentication requirements.
- Mobile adaptation, responsive layout.
- Continuous updates with practical page template features and interactions, easily combinable to simplify page building.

## Documentation

```
To be improved.
```

## Preparation

- [Node](http://nodejs.org/) and [Git](https://git-scm.com/) -Project development environment,
- [Vite](https://vitejs.dev/) - Familiar with Vite features.
- [Vue](https://vuejs.org/) - Familiar with Vue basic syntax.
- [TypeScript](https://www.typescriptlang.org/) - Familiar with TypeScript basic syntax.
- [ES6+](http://es6.ruanyifeng.com/) - Familiar with ES6 basic syntax.
- [Vue-Router](https://router.vuejs.org/) - Familiar with vue-router basic usage.
- [Mock.js](https://github.com/nuysoft/Mock) - Familiar with mockjs basic syntax.

## Usage

#### Method 1:

- Install the CLI tool:

```bash
npm i akir-cli -g
```

- Create a project via the global command:

```bash
akir-cli create
```

- Enter the project folder and start the project:

```bash
cd [project_name]

pnpm install

pnpm dev

pnpm build
```

#### Method 2:

- Clone the project:

```bash
git clone https://github.com/pomeluce/akir-vue.git
```

- Install dependencies:

```bash
cd akir-vue

pnpm install
```

- Run the project:

```bash
pnpm dev
```

- Build the project:

```bash
pnpm build
```

## How to Contribute

We warmly welcome your contributions! Please submit an [Issue](https://github.com/pomeluce/akir-vue/issues) or a Pull Request.

**Pull Request:**

1. Fork the repository!
2. Create your own branch: `git checkout -b feat/xxxx`
3. Commit your changes: `git commit -am 'feat(function): add xxxxx'`
4. Push your branch: `git push origin feat/xxxx`
5. Submit a `pull request`

## Git Contribution Guidelines

- Refer to [Vue's](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) guidelines ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat`: Add a new feature.
  - `fix`: Fix issues/bugs.
  - `style`: Code style-related changes that don’t affect functionality.
  - `perf`: Optimizations/performance improvements.
  - `refactor`: Code refactoring.
  - `revert`: Revert changes.
  - `test`: Test-related changes.
  - `docs`: Documentation/comments.
  - `chore`: Dependency updates/scaffold configuration changes.
  - `workflow`: Workflow improvements.
  - `ci`: Continuous integration.
  - `types`: Changes to type definition files.
  - `wip`: Work in progress.

## Browser Support

It is recommended to use `Chrome 80+` for local development.

Supports modern browsers, but does not support IE.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :-: | :-: | :-: | :-: | :-: |
| not support | last 2 versions | last 2 versions | last 2 versions | last 2 versions |
