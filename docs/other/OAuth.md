# OAuth

- [OAuth](https://zh.wikipedia.org/wiki/OAuth)

- OAuth（开放授权）是一个开放标准，允许用户让第三方应用访问该用户在某一网站上存储的私密资源（如照片，视频，联系人列表），而无需将用户名和密码提供给第三方应用。

## 简要流程

角色：Resource Owner、Client Applicartion、Resource Server、Authorization Server

豆瓣网 向 微信 申请 OAuth 接入，获取 clientId、clientSecret

用户向豆瓣发送请求准备 OAuth 登陆，豆瓣重定向到微信authorize附带三个信息

1. clientId 微信提供的 clientId
2. scope 豆瓣能访问资源的范围
3. callbackUrl 

