# Node.js 开发实践
## 1. NPM 包管理器

**Node Package Manager**

JavaScript 的社区、轮子很丰富，如何去寻找、使用这些包，如何管理包版本，需要一个工具

NPM 是 Nodejs 御用的包管理器

现代语言来说包管理器是否现代化可以影响到社区本身的一个活跃程度

### 常用命令

- npm init

  生成 node 模块 js 项目

- npm install xxx

  - 自动更新依赖 : --save
  - 全局安装: -g

- npm list

- npm shrinkwrap

### cnpm

https://npm.taobao.org

中国版 npm，由淘宝提供

### 依赖管理

- dependencies
  - 运行依赖
  - 编译依赖：Babel
- devDependencies
  - 测试依赖
  - 开发工具依赖
- 依赖包保存方式

### scripts

- npm run 自定义命令（官方提供的 key 不需要 run，npm dev）
- [文档](https://docs.npmjs.com/misc/scripts)

### 指定云引擎 Node.js 版本

- [文档](https://leancloud.cn/docs/leanengine_webhosting_guide-node.html#package_json)

  Node.js 的 `package.json`

  ~~~json
  {
      "name": "node-js-getting-started",
      "scripts": {
          "start": "node server.js"
      },
      "engines": {
          "node": "12.x"
      },
      "dependencies": {
          "express": "4.16.4",
          "leanengine": "^3.3.2",
          "leancloud-storage": "^3.11.0"
      }
  }
  ~~~

  - `scripts.start` 启动项目时使用的命令；默认为 `node server.js`，如果你希望为 Node.js 附加启动选项（如 `--es_staging`）或使用其他的文件作为入口点，可以修改该选项。
  - `scripts.postinstall` 会在项目构建结束时运行一次；可以将构建命令（如 `gulp build`）写在这里。
  - `engines.node` 指定所需的 Node.js 版本；出于兼容性考虑默认版本仍为比较旧的 `0.12`，**因此建议大家自行指定一个更高的版本，建议使用 `12.x` 版本进行开发**，你也可以设置为 `*` 表示总是使用最新版本的 Node.js。
  - `dependencies` 项目所依赖的包；使用 Node.js 10 以上的版本时，云引擎会在部署时用 `npm ci` 为你安装这里列出的所有依赖。
  - `devDependencies` 项目开发时所依赖的包；使用 Node.js 10 以上的版本时，云引擎会安装这里的依赖。

## 2. 开发工具介绍

**curl, Postman, lean-cli**

### curl

- 命令行的 http client
- 常用参数：
  - -X <method>
  - -H <header>
  - -d <data>

### Cygwin

Windows 系统下模拟 unix 命令

### 开启 debug 日志

### Postman

### lean-cli

## 3. Promise



















