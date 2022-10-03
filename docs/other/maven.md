## maven

### POM：Project Object Model

### 坐标

- groupId：公司或组织的 id
- artifactId：一个项目或者是项目中的一个模块 id
- version：版本号

#### 取值方式

- 公司或者组织域名的倒叙，通常也会加上项目名称
  - com.meta.maven
- 模块名称，将来作为 Maven 工程的工程名
- 模块的版本号
  - SNAPSHOT 表示快照版本，正在迭代中，不稳定
  - RELEASE 表示正式版本

### 坐标和 jar 包存储路径的关系

~~~xml
<groupId>javax.servlet</groupId>
<artifactId>servlet-api</artifactId>
<version>2.5</version>
~~~

上面坐标对应的 jar 包在 Maven 本地仓库中的位置

~~~text
Maven本地仓库根目录\javax\servlet\servlet-api\2.5\servlet-api-2.5.jar
~~~

### 实验操作

#### 生成 Maven 工程

`mvn archetype:generate`

pom.xml：maven 工程核心配置文件

~~~xml
<!-- project: 跟标签,project，表示对当前工程进行配置、管理 -->
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    
  <!-- modelVerison：从 Maven 2 开始固定是 4.0.0 -->
  <!-- 代表当前 pom.xml 所采用的标签结构 -->
  <modelVersion>4.0.0</modelVersion>

  <!-- 
 	坐标信息
	groupId：代表公司或组织开发的某一个项目
	artifactId：代表项目下的某一个模块
	packaging：打包方式 [jar | war | pom(用来管理其他工程的工程)]
  -->
  <groupId>com.dsapr.maven</groupId>
  <artifactId>pro01-maven-java</artifactId>
  <version>1.0-SNAPSHOT</version>
  <packaging>jar</packaging>

  <name>pro01-maven-java</name>
  <url>http://maven.apache.org</url>
    
  <!-- 在 Maven 中定义属性值 -->
  <properties>
    <!-- 在构建过程中读取源码时使用的字符集 -->
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  </properties>

  <!-- 配置具体依赖信息，包含多个 dependency 子标签 -->
  <dependencies>
    <!-- 配置一个具体的依赖信息 -->
    <dependency>
      <!-- 坐标信息：导入哪个 jar 包，配置哪个坐标信息即可 -->
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.12</version>
      <!-- 当前依赖的范围 -->
      <scope>test</scope>
    </dependency>
  </dependencies>
</project>
~~~

#### 执行 Maven 的构建命令

 运行 Maven 中和构建操作相关命令时候，必须进入到 pom.xml 所在的目录。否则报错。

~~~text
The goal you specified requires a project to execute but there is no POM in this directory.
~~~

##### 清理

删除 target 目录

##### 编译

主程序：mvn compile

测试程序：mvn test-compile

主体程序编译结果存放目录：target/classes

测试程序编译结果存放的目录：target/test-classes

##### 测试

mvn test

##### 打包

mvn package

##### 安装

将打包后的包存入本地仓库中

##### 跳过测试

mvn clean install -Dmaven.test.skip=true

#### 生成 Maven 的 web 工程

`mvn archetype:generate -DarchetypeGroupId=org.apache.maven.archetypes -DarchetypeArtifactId=maven-archetype-webapp -DarchetypeVersion=1.4`

maven 提供的项目不完整，需要在 main 包下面建立 java 包

#### 让 Web 工程依赖 Java 工程

最终 Java 工程会变成 jar 包，放在 Web 工程的 WEB-INF/lib 目录下。

操作：在 Web 工程中配置 Java 工程的依赖。

#### 查看依赖列表

`mvn dependency:list`

#### 依赖的范围

标签位置：dependencies/dependency/scope

标签可选值：compile/test/provided/system/runtime/import

1. compile 对比 test

   |         | main目录（空间） | test目录（空间） | 开发过程（时间） | 部署到服务器（时间） |
   | ------- | ---------------- | ---------------- | ---------------- | -------------------- |
   | compile | 有效             | 有效             | 有效             | 有效                 |
   | test    | 无效             | 有效             | 有效             | 无效                 |

2. compile 对比 provided

   |          | main目录（空间） | test目录（空间） | 开发过程（时间） | 部署到服务器（时间） |
   | -------- | ---------------- | ---------------- | ---------------- | -------------------- |
   | compile  | 有效             | 有效             | 有效             | 有效                 |
   | provided | 有效             | 有效             | 有效             | 无效                 |

#### 依赖的传递

 A 依赖 B，B 依赖 C，A 是否能使用 C？

compile 可以， test、provide 不行。

#### 依赖的排除

~~~xml
<dependency>
	<groupId></groupId>
    <artifactId></artifactId>
    <version></version>
	<scope>compile</scope>
    <exclusions>
    	<exclusion>
        	<grooupId></grooupId>
            <artifactId></artifactId>
        </exclusion>
    </exclusions>
</dependency>
~~~

#### 继承

作用：在父工程中统一管理项目中的依赖信息，具体来说是管理依赖信息的版本

创建好父工程修改打包方式

~~~xml
<groupId></groupId>
<artifactId></artifactId>
<version></version>

<packing>pom</packing>
~~~

只有打包方式为 pom 的 Maven 工程能够管理其他 Maven 工程。不写代码，专门管理其他 Maven 工程。

父工程 pom 文件

~~~xml
 <modules>
    <module>pro04-maven-module</module>
    <module>pro05-maven-module</module>
    <module>pro06-maven-module</module>
  </modules>

  <!-- 在父工程中统一管理依赖信息 -->
  <!-- 注意：即使在父工程中配置了对依赖的管理，子工程中需要使用具体哪一个依赖还是要明确配置 -->
  <dependencyManagement>
	<dependencies>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-core</artifactId>
			<version>4.0.0.RELEASE</version>
		</dependency>
			<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-bean</artifactId>
			<version>4.0.0.RELEASE</version>
		</dependency>
	</dependencies>
  </dependencyManagement>
~~~

子工程 pom 文件

~~~xml
  <parent>
    <groupId>com.dsapr.maven</groupId>
    <artifactId>pro03-maven-parent</artifactId>
    <version>1.0-SNAPSHOT</version>
  </parent>
  
  <!-- 子工程的 groupId、version 如果和父工程一样，可以省略-->
  <!-- <groupId>com.dsapr.maven</groupId> -->
  <artifactId>pro06-maven-module</artifactId>
  <!-- <version>1.0-SNAPSHOT</version> -->
~~~

配置自定义属性标签

~~~xml
<properties>
	<com.dsapr.version>4.1.0.RELEASE</com.dsapr.version>
</properties>  

<!-- 在父工程中统一管理依赖信息 -->
  <!-- 注意：即使在父工程中配置了对依赖的管理，子工程中需要使用具体哪一个依赖还是要明确配置 -->
  <dependencyManagement>
	<dependencies>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-core</artifactId>
            <!-- 通过引用el表达式设定版本号 -->
			<version>${com.dsapr.version}</version>
		</dependency>
			<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-bean</artifactId>
			<version>4.0.0.RELEASE</version>
		</dependency>
	</dependencies>
  </dependencyManagement>
~~~

#### 聚合

聚合被本身的含义：部分组成整体

聚合的配置

~~~xml
 <modules>
    <module>pro04-maven-module</module>
    <module>pro05-maven-module</module>
    <module>pro06-maven-module</module>
  </modules>
~~~

### profile

列出所有激活的 profile，以及在哪里定义

mvn help:active-profiles

指定某个具体 profile

mvn compoile -P<profile id>

### 版本仲裁

并非由版本号选择相同的版本

1. 就近原则
2. 依赖顺序

### jar 包冲突

#### 解决

1. 找到彼此冲突的 jar 包
2. 在冲突的 jar 包中选定一个。具体做法：通过 exclude 排除依赖，或是明确声明依赖。

#### Maven Helper 插件

idea 插件，可以罗列出来同一个 jar 包不同版本以及来源。但是不同 jar 包中同名的类没有办法。

#### Maven 的 enforcer 插件

mvn clean package enforcer:enforce

既可以检测同一个 jar 包的不同版本，又可以检测不同 jar 包中同名的类。