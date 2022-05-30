# 再学不会git就别用了

写这篇文章时听的音乐：[聲無哀樂*乐队*《*飞升*》](https://music.163.com/#/song?id=1463697613)（电子观音机械飞升），随后用我 37.5° 温暖的手在 15° 左右的键盘上敲下这篇文章！

文章适用人群：

- 备受 git 折磨，无法顺畅的使用 git，经常遇到问题不假思索通过搜索引擎胡乱整的人群，不妨试试这篇文章
- 已经掌握一门编程语言的 coder（请自行花大概两个小时完成先导知识的学习）

阅读所需先导知识：

- 什么是版本控制
- 为什么需要版本控制
- 什么是 git
- git 与 svn 都是版本控制工具，有什么区别
- git 的常用命令（挑一个资料看就行了，避免收集过多资料歧路亡羊）

## 码农小杨在线编码

小杨今年从某著名高校毕业，是一名高财生，所学专业为电脑方面，家庭成分为中产阶级家庭。

小杨从小接受过良好的教育，琴棋书画都会一点，但是对计算机没有任何兴趣，由于从小对 Other 的服从性较好，即使没兴趣也可以将计算机理论烂熟于心，在班里混的风生水起，跟同学们打的不可开交。经过四年的 ~~吃喝玩乐~~ 摸爬滚打，小杨终于要进入社会，无意识生活多年的小杨自然不会思考生活的意义之类的问题，干就完事了！

小杨找了一家实习公司进行实习，凭着在校娴熟的编码经验，小杨上来一顿操作输出了不少优秀的烂代码，为公司创造了不小的损失，甚至还失去了一名重要客户。老板甚是欣慰，留下了感动的泪水。

## 总结教训收获经验

即使老板不再追究，希望小杨痛改前非不要再犯。受过良好教育的小杨怎么会放过这种提升自己的机会，经过复盘，小杨发现问题出在代码管理上面（逐渐切入主题）。由于小杨面试吹的太厉害，不懂技术的老板放心的将一名新客户的项目交给小杨去练手，小杨从此开始了第一个商业项目。

杨由于没有代码版本控制的概念，也不知道什么版本迭代，商业项目不同于学校的 99 乘法表和水仙花数，写了半个月代码经过各种改动已经乱七八糟，项目经理的需求变更气的小杨想打人。小杨产生了版本意识，知道每次功能的改动都需要做记录保存。就将代码的每次迭代都保存到U盘中。每次完成迭代就将代码拷贝到U盘，更新主文件夹的代码。

~~~markdown
project_floder_v1
project_floder_v2
...
project_floder_master
~~~

由于需求变更过于频繁，小杨的管理方式慢慢变得繁琐，中间不乏bug修改，需求变更，越改越乱，最后杨自己也不知道那个版本是那个版本。一个月后开发完毕，最后项目乱七八糟，就像一个危楼一样摇摇欲坠。好在杨缝缝补补也算将项目完成了。

## 见到小杨的第一面

可以说不是小杨找到了 git，而是 git 找到了小杨。git 就这样跌跌撞撞的闯入了杨的生活。

### 向 git 介绍你自己的信息

git 是面向多人的，为了区分谁对项目做出了哪些改动，需要告诉 git 你的姓名和邮箱（这是你对 git 的介绍，git 无法辨别信息是否符合真实情况），如果不告诉 git 你的信息将无法进行后续的 `git commit`操作

~~~bash
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
~~~

通过对 git 的了解，小杨初步掌握了以下的 git 使用方法来管理项目。

### git 管理项目

现在我们需要：

1. 开发一个版本 v1
2. 开发一个版本 v2
3. 保存并管理这两个版本的记录

~~~bash
# 进入项目文件夹
cd /User/Yang/work_project/
# 初始化项目进行管理 生成.git文件夹
git init
# 查看项目状态
git status
# git 管理文件
git add .
# 提交并生成版本 v1
git commit -m '第一个版本v1开发完成啦！'

** 小杨修改项目新增功能产生第二个版本 **
git status # 发现有新增文件
# 将新增文件交给 git 管理
git add . 
# 提交并生成版本 v2
git commit -m '第二个版本v2开发完成啦！'

** 两次版本生成后，杨想看一下版本记录 **
# 查看版本记录
git log
~~~

## Git内裂的三个部分

### 工作区

### 暂存区

### 版本库

## 重要的分支

经过前面的练习不难发现，git 的基本命令学习很简单，但是最终我们使用 git 的目的是多人合作开发版本控制，如果是单线开发的话版本控制的意义并不大。

分支可以给使用者提供多个环境，可以把工作从开发主线上分离，以免影响开发主线

![git紧急bug修复方案](D:\project\blog-vuepress\docs\.vuepress\public\images\git紧急bug修复方案.png)

~~~bash
# 查看分支
git branch
# 创建分支
git branch 分支名称
# 切换分支
git checkout 分支名称
# 分支合并(可能产生冲突)
# 注意：先切换再合并
git merge 要合并的分支
# 删除分支
git branch -d 分支名称

~~~

## github

杨上班的时候发现在公司写完代码回家后还忍不住想推进项目，经过项目经理指点，了解了 github 这个网站。github 是一个远程代码仓库，可以同步各地的代码，相当于专门保存代码的百度网盘。这样就可以把代码上传到 github 只要有互联网就可以获取代码。

小杨在公司注册了一个 github 账号，申请了仓库，这时候要把项目代码放入仓库，如何操作呢？

~~~bash
# 绑定仓库别名 origin
git remote add origin https://github.com/Yang/work_project.git
# 推送 master 代码到 origin
git push -u origin master
~~~

小杨回家打开电脑，将公司的代码拉到家里

~~~bash
# 克隆远程仓库代码（内部已实现 git remote add origin 远程仓库地址）
git clone https://github.com/Yang/work_project.git
# 当小杨查看分支
git branch
* master # 只有 master 没有 dev
# 其实有 dev 分支，只不过没有显示
git checkout dev
# 把 master 分支合并到 dev [仅一次]，获取 master 最新代码
git merge master

=== 小杨开发到半夜提交代码，看了电影《都灵之马》然后流着眼泪睡觉了 ===
# git -u push origin dev
# -u 是指定默认分支，以后直接 git push 即可
git push origin dev
~~~

第二天，小杨到公司，需要先把昨天晚上看电影前提交的代码拉下来

~~~bash
git pull origin dev
=== 拉下来昨天的代码继续进行开发 ===
~~~



## 推荐资料

### 廖雪峰 Git 教程

- [廖雪峰 Git 教程](https://www.liaoxuefeng.com/wiki/896043488029600/)

### git 游戏

- [Learn Git Branching](https://learngitbranching.js.org/?locale=zh_CN)

### 视频

- 文字无法接受就 b 站随便搜一个喜欢的1.5倍速跳着看

## 可能会踩的坑

### git 分支master 改为 main

尊重黑人，老是忘记

~~~bash
git branch -M main
~~~

### Git提示“warning: LF will be replaced by CRLF”

[Git提示“warning: LF will be replaced by CRLF”最详细解释+解决方案](https://lijunde.blog.csdn.net/article/details/88761581?spm=1001.2014.3001.5506)

基本上没有比这个再详细的了，顺便科普了换行符的知识

## 结语

我是 dsapr **:sunny:** ，一名喜欢技术的 coder

这个博客就是由 git 管理托管到 github 生成的，采用的是 vuepress，如果你喜欢的话也可以采用这种方式搭建一个博客来实战练习 git 的使用。当你搭建完成并且可以写文章的时候就已经掌握 git 的基础用法了。需要做以下准备：

- 本地安装git、node（vuepress 博客搭建环境）
- github 账号、仓库一个（存放 blog 代码）

如果本文章对你有帮助，请分享给你身边的 coder，完成知识的传递。谢谢 **:laughing:**！