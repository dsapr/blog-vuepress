# JavaScript

JavaScript 是一款语法精简优雅的语言，最初由一些简单的逻辑处理发展到可以在 node.js 的支持下作为轻量级服务端使用。JS 语法逐渐规范，生态也在慢慢成长。

### 第一章 走进 JavaScript 黑洞
跳过

### 第二章 JavaScript 运算符与流程控制
跳过

### 第三章 JavaScript 值类型使用
#### 1. 类型判断
跳过
#### 2. 字符串转义与模板字面量使用
~~~JavaScript
// 转义
let a = new String("abcde");
let b = "abcde";
let c = "ab\"cde"; 

// 字面量
let year = "2022年";
let site = "还不错";
console.log(year + "看起来" + site);
console.log(`
	${year} + "看起来" + ${site}
`);
~~~
### 3. 模板字面量嵌套使用技巧
