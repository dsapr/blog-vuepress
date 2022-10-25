import{_ as e,e as s}from"./app.340c2b94.js";const n={},r=s(`<h1 id="docker\u642D\u5EFAmysql" tabindex="-1"><a class="header-anchor" href="#docker\u642D\u5EFAmysql" aria-hidden="true">#</a> docker\u642D\u5EFAmysql</h1><p>\u62C9\u53D6\u955C\u50CF</p><div class="language-markdown ext-md line-numbers-mode"><pre class="language-markdown"><code>docker pull mysql/mysql-service:8.0.29
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>\u53C2\u8003 dockerhub \u6559\u7A0B\u542F\u52A8</p><p>\u6CE8\u610F\uFF1A</p><ol><li>\u4FDD\u8BC1\u6301\u4E45\u5316</li><li>\u8BBE\u7F6E\u5B57\u7B26\u96C6</li><li>\u65F6\u533A\u95EE\u9898</li></ol><div class="language-markdown ext-md line-numbers-mode"><pre class="language-markdown"><code>docker run -it -d --name=mysql8 -e MYSQL_ROOT_PASSWORD=123456  mysql/mysql-server:8.0.29 \\
--charcter-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci \\
-v /Users/dsapr/docker/mysql8/conf:/etc/mysql/conf.d \\
-v /Users/dsapr/docker/mysql8/logs:/logs \\
-v /Users/dsapr/docker/mysql8/data:/var/lib/mysql \\
-p 3306:3306 \\
-e TZ=Asia/Shanghai --default-time_zone=&#39;+8:00&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div>`,7);function a(l,d){return r}var i=e(n,[["render",a],["__file","docker\u642D\u5EFAmysql.html.vue"]]);export{i as default};
