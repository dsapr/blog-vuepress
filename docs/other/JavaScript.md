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
#### 3. 模板字面量嵌套使用技巧

~~~javascript
function show() {
    return "dsapr.com";
}
let str = `www.${show()}`;
console.log(str)

let lessons = [
    { title: "媒体查询响应式布局"},
    { title: "FLEX 弹性盒模型"},
    { title: "GRID 栅格系统"}
]
function template() {
    return `
            <ul>${lessons.map(item => item.title)}</rl>
            `
}
document.body.innerHTML = template();
function template() {
    return `
            <ul>${lessons.map(item => 
                              `
                <li>
                    ${item.title}
                </li>
                `
                             ).join("")}</ul>
            `;
}
~~~

#### 4. 神奇的标签模板实例操作

~~~html
<html>
    <head></head>
    <body> 
        <script>
            let name = 'dsapr';
            let web = 'dsapr.com';
            console.log(tag`姓名${name}，网址${web}。`)
            function tag(strings, name, web) {
                console.log(name);
                console.log(web);
                console.log(strings);
            }
        </script> 
    </body>
</html>
~~~

~~~html
<html>
    <head></head>
    <body> 
        <script>

            let lessons = [
                { title: "媒体查询响应式布局", author: "d1"},
                { title: "FLEX 弹性盒模型", author: "d2"},
                { title: "GRID 栅格系统", author: "d3"}
            ]

            function template() {
                return `<ul>
                    ${lessons.map(item => 
                        links`<li>作者：${item.author}，课程：${item.title}</li>`
                    ).join("")}
                </ul>`;
            }

            function links(strings, ...vars) {
                return strings.map((str, key) => {
                    return str + (vars[key] ?
                    vars[key].replace('d1', `<a href="">d1</a>`)
                    : "");
                }).join("")
            }

            document.body.innerHTML += template();
        </script> 
    </body>
</html>
~~~

#### 5. 字符串基本函数使用

~~~html
<html>
    <head></head>
    <body> 
        <input type="text" name="password" />
        <span></span>
        <script>
            let name = 'Dsapr'
            console.log(name.length);
            console.log(name.toUpperCase());
            console.log(name.toLowerCase());
            let site = '   dsapr   '
            console.log(site.length);
            console.log(site.trim().length);
            
            let ps = document.querySelector("[name='password']");
            ps.addEventListener("keyup", function() {
                this.value = this.value.trim();
                console.log(this.value.length);
                let span = document.getElementsByTagName("span");
                let error = '';
                if (this.value.length < 5) {
                    error = "密码不能小于5位";
                }
                span[0].innerHTML = error;
            });

            let ds = 'dsapr';
            console.log(ds.charAt(0)); // d
            console.log(ds[0]); // d

            for (let i = 0; i < ds.length; i++) {
                let span = document.createElement('span');
                span.innerHTML = ds[i];
                span.style.fontSize = (i + 1) * 10 + "px";
                document.body.append(span);
            }
        </script>
        </input>
    </body>
</html>
~~~

#### 6. 字符串截取操作

~~~html
<html>
    <head>
        <title>javaScript</title>
    </head>
    <body> 
        <script>
            let ds = "dsapr";
            // slice substr substring
            console.log(ds.slice(0)); // dsapr
            console.log(ds.substring(0)); // dsapr
            console.log(ds.slice(1)); // sapr
            console.log(ds.slice(1, 3)); // sa
            console.log(ds.substring(1)); // sapr
            console.log(ds.substr(1, 2)); // sa 从 1 开始截取两个字符

            console.log(ds.slice(-3)) // apr
            console.log(ds.slice(-3, -1)) // ap
            console.log(ds.substring(-3)) // dsapr 从零开始计算
            console.log(ds.substring(-3, -1)) // dsapr 从零到零
            console.log(ds.substr(-3)) // apr
            console.log(ds.substr(-3, 2)) // ap // 从 -3 个字符开始截取两个
        </script>
        </input>
    </body>
</html>
~~~

#### 7. 检索字符串使用技巧
