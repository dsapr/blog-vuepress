# Java开发过程的前世今生

时至今日（2022年）java 的发展的已经非常丰富，那么经过这么多年的发展，java 走过了哪些路了呢？现在我们应该具体掌握哪些 java 知识，抛弃哪些知识，这篇文章会给你答案。

java 是一门编程语言，1995 年面市，它以优异的跨平台运行能力以及相较于 C 更有好的编写方式迅速获得程序员的青睐，java 最早叫做 oak，是橡树的意思，但是注册商标是发现被使用了。当时 java 的主要研发人员正在喝一个叫 java 牌子的咖啡，oak 就改名为 java。

使用 java 语言运行或开发程序需要安装 jre 和 jdk。

## JRE

**java runtime environment**

jre = jvm + Libraries Set

## JDK

**java  development kit**

jdk = jre + development tools

jdk 是 java 开发的核心部分，基本两年 update 一个主版本，主版本使用动物命名，期间发布的小版本使用昆虫命名。

## javabean

90 年代中期随着 windows 可视化操作系统的流行，可视化编程、组件化编程已经开始逐渐兴起，相比微软的 vb、borland 的公司的 delphi，java 又显得没有那么好用了。另外 java 编程又需要一套成熟的规范更好的实现组件化、研发、版本更迭等特性。使整他开发生态更加健康，为了让 java 具备组件化 gui 可视化等开发特性，1996 年 java 为自己定制了一套标准的规范，并拿出一套满足规范的工具包。

这就是 javabean，咖啡豆。java 是咖啡，里面的工具就像咖啡豆一样。在这套规范下开发出的组件是可重用的，javabean 工具包里的类和库也都非常的丰富。比如 swing 也支持了比较流行的 gui 可视化开发，在 javabean 的加持的下，一个更加健康强大的开发生态正在形成，borland 公司在这个基础上搞出了 jbuilder。这个很神奇的东西，可以实现 java 的可视化编程并且能够适应刚刚兴起的智能手机环境。可以做塞班、windows、ce等移动操作系统下的开发。

ibm 公司则用 javabean 搞出了一套 visual age for java 这就是后来大名鼎鼎的 eclipse 开发平台的前身，与此同时 java 也在规划自己的企业版图，1999 年 java 被拆分成三个版本，java 标准版（面向非企业桌面用的的标准版）现在已经更名为 j2se（java to standard edition），第二个就是 java 移动版 j2me（Java 2 Platform，Micro Edition），面向的是移动手机，机顶盒等外设的版本，最后一个是 java 企业版 j2ee（Java 2 Platform，Enterprise Edition），j2se 没有流行起来，因为桌面开发者有更多更好更高效的语言和工具，21世纪初期乔帮主还未带来 iPhone，智能移动时代还比较遥远，j2me 也没有发展起来。只有 j2ee 发展壮大，企业的后台需要这样一个稳定的标准的完整、全面的、有生命力的企业级系统开发生态，无论它是 java 或是什么别的什么语言，不过现在就是 java。

## J2EE

除了 javabean，j2ee 还封装了

- JMS（Java消息服务）
- JNDI、JDBC（数据库访问服务）
- JavaMAIL（Java 邮件服务）
- JSP
- JavaServlet
- XML
- JTA
- JTS
- JAF
- EJB
- RMI
- JavaIDL/CORBA
- JSP
- Servler

Javabean 也面向企业级服务，对规范做了提升和丰富，升级为 EJB（Enterprise Java Bean），有了这些新技能，程序员可以更高效的开发企业级程序。

J2EE 的生态也逐渐完善 Weblogic，IBM Websphere，Apache Tomcat 等等的服务端纷纷加入。用 EJB 开发的程序可以方便的找到上面这些服务器的支撑。EJB 虽然非常强大，但是使用起来太麻烦，编程的过程很重，并不轻量级。比如要声明一些没有用处的方法，比如在实例等继承上并不便捷。很多已经有的实例需要重新定义。

## POJO

play ordinary java 或者 pure old java object，翻译过来就是`普通java对象`。

于是大家发起了一场名为 pojo 的运动，这种精简、纯粹的 java 编程方式就叫做 pojo，2005 年一个叫 rod johnson 的大牛退出了一个叫做 Spring 的开发框架。

## Spring

在这套开发框架下编写的 java 程序是满足 pojo 的极简风的，所以大受欢迎。他出过一本书叫做《J2EE Development without EJB》，另外 Spring 可以更方便的对接更多其他的处理框架，比如对接更为方便的数据库处理框架 Hiberate 等。Spring 框架帮助开发人员脱离了苦海，虽然后来 EJB 也在极简化风格，但是 Spring 抢占了先机。

## SpringBoot

Spring 开发程序的时候需要进行大量的环境配置工作，比如单独搭建 tomcat 或者 web 服务器才能测试运行。

java 程序有专门的运行环境，专业叫法叫做`容器`。后端程序要运行在应用服务器，JSP 和 Servlet 要运行在 web 服务器，所以开发人员面临着开发一个程序要搞定不同的运行环境，不同的环境配置。这些繁琐的配置要贯穿 java 企业级开发的全生命周期，从开发测试到后期投产一个也不能少。成本太高。另外，一些企业级工程要引入一些外部的类或者库做支撑，这些操作也是异常的痛苦。

随后 springboot 横空出世，它基于 spring，但是有更为便捷的配置手段，更独立的开发过程，以及更全面的运行支撑。springboot 开发的 java 程序包内嵌有 tomcat 等容器的环境，开发出来的程序是直接可以运行的。如果没有特殊要求，不用再单独搭建一台应用服务器的环境。













