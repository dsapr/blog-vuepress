---
title: Spring 5
date: 2021-10-11
categories: java
description: Spring 5 学习笔记
tags: java
---

# Spring 5

# 勿在浮沙筑高台，每天进步一丁点儿！

[TOC]

## 第一章 引言
### 1. EJB存在的问题
> **EJB(Enterprise Java Bean)**
>
> 1. 运行环境苛刻
>
> 2. 代码移植性差
>
> 总结： EJB重量级的框架

### 2. 什么是 Spring
> 1.Spring是一个轻量级的JavaEE解决方案，整合众多优秀的设计模式
- 轻量级
    > 1. 对于运行环境没有额外要求
           开源 tomcat resion jetty
           收费 weblogic websphere
    > 2. 代码移植性高
           不需要实现额外接口

- JavaEE的解决方案
- 整合设计模式
> 1. 工厂
> 2. 代理
> 3. 模板
> 4. 策略

### 3. 设计模式
> 1. 广义概念
> 面向对象中，解决特定问题的经典代码
> 2. 狭义概念
> GOF4人帮定义的23种设计模式：工厂、适配器、装饰器、门面、代理、模板...

### 4. 工厂设计模式

#### 4.1 什么是工厂设计模式

> 1. 概念： 通过工厂类、创建对象
>
>    ​		     User user = new User();
>
>    ​			 UserDao userDao = new UserDaoUmpl();
>
> 2. 好处： 解耦合
>
>    ​			 耦合： 指的是代码间的强关联，一方的改变会影响到另一方
>    
>    ​		     问题： 不利于代码维护
>    
>    ​		     简单： 把接口的实现类，硬编码在程序中
>    
>    ​							UserService userServeic = new UserServiceImpl();

#### 4.2 简单工厂的设计模式

~~~java
package org.dsapr.basic;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.InvocationTargetException;
import java.util.Properties;

/**
 * @author: chenyi.Wangwangwang
 * @date: 2021/10/11 19:19
 */
public class BeanFactory {
    private static Properties env = new Properties();

    static{
        try {
            // 第一步 获得IO输入流
            InputStream inputStream = BeanFactory.class.getResourceAsStream("/applicationContext.properties");
            // 第二步 文件内容 封装 Properties 集合中 key = userService value = com.dsapr.UserServiceImpl
            env.load(inputStream);

            inputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /*
        对象的创建方式：
            1. 直接调用构造方法 创建对象 UserService userService = new UserServiceImpl();
            2. 通过反射的形式 创建对象
                Class clazz = Class.formName("com.dsapr.basic.UserServiceImpl");
                UserService userService = (UserService)class.newInstance();
     */
    public static UserService getUserService() {
        UserService userService = null;
        try {
//            Class clazz = Class.forName("com.dsapr.basic.UserServiceImpl");
            Class clazz = Class.forName(env.getProperty("userService"));
            userService = (UserService) clazz.getDeclaredConstructor().newInstance();
        } catch (ClassNotFoundException | NoSuchMethodException | InstantiationException | IllegalAccessException | InvocationTargetException e) {
            e.printStackTrace();
        }

        return userService;
    }

    public static UserDao getUserDao() {
        UserDao userDao = null;
        try {
//            Class clazz = Class.forName("org.dsapr.basic.UserDaoImpl");
            Class clazz = Class.forName(env.getProperty("userDao"));
            userDao = (UserDao) clazz.getDeclaredConstructor().newInstance();
        } catch (ClassNotFoundException | NoSuchMethodException | InstantiationException | IllegalAccessException | InvocationTargetException e) {
            e.printStackTrace();
        }
        return userDao;
    }
}

~~~

#### 4.3 通用工厂的设计

- 问题

  ~~~java
  简单工厂会存在大量的代码冗余
  ~~~

- 通用工厂的代码

  ~~~java
  创建一切想要的对象
  public static Object getBean(String key) {
          Object ret = null;
          try {
              Class clazz = Class.forName(env.getProperty(key));
              ret = clazz.getDeclaredConstructor().newInstance();
          } catch (ClassNotFoundException | NoSuchMethodException | InstantiationException | IllegalAccessException | InvocationTargetException e) {
              e.printStackTrace();
          }
          return ret;
      }
  ~~~

#### 4.4 通用工厂的使用方式

~~~java
1. 定义类型 (类)
2. 通过配置文件的配置告知工厂(applicationContext.properties)
   key = value
3. 通过工厂获得类的对象
   Object ret = BeanFactory.getBean("key");

~~~

### 5. 总结

~~~java
Spring 本质：工厂 ApplicationContext(applicationContext.xml)
~~~

## 第二章、 第一个 Spring 程序

### 1. 软件版本

~~~java
1. JDK1.8+
2. Maven3.5+
3. IDEA2018+
4. SpringFramework 5.1.4
   官方网站 www.spring.io
~~~

### 2. 环境搭建

- Spring的jar包

  ~~~xml
  # 设置依赖
  <!-- https://mvnrepository.com/artifact/org.springframework/spring-context -->
  <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>5.1.4.RELEASE</version>
  </dependency>
  ~~~

- Spring的配置文件

  ~~~markdown
  1. 配置文件的放置位置
  2. 配置文件的命名：没有硬性要求 建议：applicationContext.xml
  
  思考：日后应用Spring框架时，需要进行配置文件路径的设置。
  ~~~
  

### 3. Spring 的核心 API

- ApplicationContext

  ~~~markdown
  作用：Spring 提供的 ApplicationContext 这个工厂，用于对象的创建
  好处：解耦合
  ~~~

  - ApplicationContext 接口类型

    ~~~markdown
    接口：屏蔽实现的差异
    非web环境：ClassPathXmlApplicationContext(main junit)
    web环境：XmlWebApplicationContext
    ~~~

    

- 重量级资源

  ~~~markdown
  ApplicationContext工厂的对象占用大量内存。
  不会频繁的创建对象，一个应用只会创建一个工厂对象。
  ApplicationContext工厂：一定是线程安全的（多线程并发访问）
  ~~~

### 4. 程序开发

~~~markdown
1.  创建类型
2.  配置文件的配置 applicationContext.xml
    <bean id="person" class="org.dsapr.basic.Person"/>
3.  通过工厂类，获得对象
    ApplicationContext
   	        |- ClassPathXmlApplicationContext
   	ApplicationContext ctx = new ClassPathXmlApplicationContext("/applicationContext.xml");
   	Person person = (Person) ctx.getBean("person");
~~~



### 5. 细节分析

- 名词解释

  ~~~markdown
  Spring 工厂创建的对象，叫做bean或者组件(componet)
  ~~~
  
- Spring工厂的相关的方法

  ~~~java
  // Spring 配置文件中 只能有一个 <bean class 是 Person 类型
  Person person = ctx.getBean(Person.class);
  System.out.println("person = " + person);
  
  // 获取的是 Spring 工厂配置文件中所有 bean 标签的 id 值
  String[] beanDefinitionNames = ctx.getBeanDefinitionNames();
  for (String beanDefinitionName : beanDefinitionNames) {
      System.out.println("beanDefinitionName = " + beanDefinitionName);
  }
  
  // 根据类型获得Spring配置文件中对应的id值
  ctx.getBeanNamesForType(Person.class);
  
  // 判断是否存在指定id值的bean
  ctx.containsBeanDefinition("");
  
  // 判断是否存在指定id值的bean
  ctx.containsBean("");
  ~~~

- 配置文件中需要注意的细节

  ~~~markdown
  1. 只配置class属性
  <bean class="org.dsapr.basic.Person"></bean>
  a) 上述这种配置 有没有id值 org.dsapr.basic.Person#0
  b) 应用场景: 如果这个bean只需要使用一次，那么就可以省略id值
  			如果这个bean会使用多次，或者被其他bean引用则需要设置id值
  			
  2. name属性
  作用: 用于在Spring的配置文件中，为bean对象定义别名(小名)
  相同: 
     1. ctx.getBean("id|name")-->object
     2. <bean id="" class=""
  		等效
  	  <bean name="" class=""
  区别: 
     1. 别名可以定义多个，但是id属性只能有一个值
     2. XML的id属性的值，命名要求：必须以字母开头，字母 数字 下滑线 连字符 不能以特殊字符开头 /person
     		name属性的值，命名没有要求 /person
     	name属性会应用在特殊命名的场景下: /person (spring+struts1)
     	
     	XML发展到了今天: ID属性的限制，不存在 /person
     3. 代码
          // 判断是否存在指定id值的bean 不能判断name
          ctx.containsBeanDefinition("");
          // 判断是否存在指定id值的bean 也能判断name
          ctx.containsBean("");
  ~~~

### 6. Spring工厂的底层实现原理(简易版)

**Spring 工厂是可以调用对象私有的构造方法创建对象**

1. 通过 ClassPathXmlApplicationContext 工厂读取配置文件 applicationContext.xml

2. 获得 bean 标签的相关信息 id 和 class 的值，通过反射创建对象

   Class<?> clazz = Class.forName(class的值);

   id 的值 = clazz.getDeclaredConstructor().newInstance();

3. 反射创建对象底层也是会调用对象自己的构造方法

   Class<?> clazz = Class.forName(class的值);

   id 的值 = clazz.getDeclaredConstructor().newInstance();

   等效于 Account account = new Account();

### 7. 思考

~~~markdown
问题：未来在开发过程中，是不是所有的对象都会交给 Spring 工厂来创建？
回答：理论上 是的，但是有特别：实体对象(entity)是不会交给 Spring 创建。它是由持久层框架进行创建。
~~~

# 第三章、Spring5.x与日志文件的整合

~~~markdown
Spring 与日志框架进行整合，日志框架就可以在控制台中，输出 Spring 框架运行过程中的一些重要信息。
好处：便于了解 Spring 框架的运行过程，利于程序的测试。
~~~

- Spring 如何整合日志框架

  ~~~markdown
  默认
    Spring1.2.3早期都是于commons-logging.jar
    Spring5.x默认整合的日志框架 logback log4j2
   
  Spring5.x整合log4j
    1. 引入log4j jar 包
    2. 引入log4.properities配置文件
  ~~~

  - pom

    ~~~xml
    <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-log4j12</artifactId>
        <version>1.7.25</version>
    </dependency>
    <dependency>
        <groupId>log4j</groupId>
        <artifactId>log4j</artifactId>
        <version>1.2.17</version>
    </dependency>
    ~~~

  - log4j.properties

    ~~~properties
    # resource文件目录下
    ### 配置根
    log4j.rootLogger = debug,console
    
    ### 输出显示到控制台 ###
    log4j.appender.console = org.apache.log4j.ConsoleAppender
    log4j.appender.console.Target = System.out
    log4j.appender.console.layout = org.apache.log4j.PatternLayout
    log4j.appender.console.layout.ConversionPattern = [%-5p] %d{yyyy-MM-dd HH:mm:ss,SSS} method:%l%n%m%n
    ~~~

# 第四章、注入(Injection)

## 1. 什么是注入

~~~markdown
通过Spring工厂及配置文件，为所创建对象的成员变量赋值
~~~

#### 1.1 为什么需要注入

**通过编码的方式为成员变量进行赋值存在耦合**



#### 1.2 如何进行注入[开发步骤]

- 类为成员变量提供 set get 方法

- 配置 spring 的配置文件

  ~~~xml
  <bean id="person" name="p,p1" class="org.dsapr.basic.Person">
      <property name="id">
          <value>10</value>
      </property>
      <property name="name">
          <value>chenyi</value>
      </property>
  </bean>
  ~~~

#### 1.3 注入好处

​	**解耦合**

### 2. Spring注入的原理分析(简易版)

## 第五章、set注入详解

~~~markdown
针对于不同类型的成员变量，在<property>标签，需要嵌套其它标签
~~~

- **Set注入**类型分类

  - JDK内置类型

    ~~~java
    public class Customer implements Serializable {
        private String name; // 字符串类型
        private int age; // 8种基本类型
        private String[] emails; // 数组类型
        private Set[String] tels; // set集合
        private List[String] address; // list集合
        private Map<String, String> qqs; // Map集合
        private Properties p; // properites集合
    }
    ~~~

  - 用户自定义类型

    ~~~java
    public class UserServiceImpl implements UserService {
    	private UserDao userDao;
        
        public UserDao getUserDao() {
            return userDao;
        }
        
        public void setUserDao(UserDao userDao) {
            this.userDao = userDao;
        }
    }
    ~~~

### 1. JDK内置类型

#### 1.1 String+8种基本类型

~~~markdown
<value></value>
~~~

#### 1.2 数组

~~~markdown
<list>
    <value>dsapr@abc.com</value>
    <value>chenyi@abc.com</value>
    <value>soap@abc.com</value>
</list>
~~~

#### 1.3 Set集合

~~~markdown
<set>
    <value>111</value>
    <value>222</value>
    <value>333</value>
    <value>333</value>
</set>

<set>
    <value>111</value>
    <ref bean=""/>
</set>
~~~

#### 1.4 List集合

~~~markdown
<list>
    <value>chengdu</value>
    <value>shanghai</value>
    <value>shannxi</value>
    <value>shannxi</value>
</list>
<list>
    <value>111</value>
    <ref bean=""/>
</list>
~~~

#### 1.5 Map集合

~~~xml
注意：map -- entry -- key有特定的标签 <key></key>
					值根据对应累心供选择对应类型的标签
<map>
    <entry>
        <key><value>dsapr</value></key>
        <value>123123</value>
    </entry>
    <entry>
        <key><value>dsapr</value></key>
        <ref bean=""/>
    </entry>
</map>
~~~

#### 1.6 Properites

~~~markdown
Properties类型 特殊的Map key=String value=String
~~~

#### 1.7 复杂的JDK类型(Date)

~~~markdown
需要程序员自定义类型转换器，处理。
~~~

##  2. 用户自定义类型

### 2.1 第一种方式

- 为成员变量提供set get方法

- 配置文件中进行注入(赋值)

  ~~~xml
  <bean id="userService" class="org.dsapr.basic.UserServiceImpl">
      <property name="userDao">
          <bean class="org.dsapr.basic.UserDaoImpl"/>
      </property>
  </bean>
  ~~~

### 2.2 第二种方式

- 第一种赋值方式存在的问题

  ~~~markdown
  1. 配置文件代码冗余
  2. 被注入的对象(UserDao)，多次创建，浪费(JVM)内存资源
  ~~~

- 为成员变量提供 set get 方法

- 配置文件中进行配置

  ~~~xml
  <bean id="userDao" class="com.dsapr.basic.UserDaoImpl"/>
  
  <bean id="userService" class="com.dsapr.basic.UserServiceImpl">
  	<property name="userDao">
      	<ref bean="userDao"/>
      </property>
  </bean>
  
  #Spring4.x 废除 <ref local=""/> 基本等效 <ref bean=""/>
  ~~~

## 3. Set 注入的简化写法

### 3.1 基于属性简化

~~~xml
JDK类型注入
<bean id="person" class="xxx.Person">
    <property name="dsapr">
		<value>dsapr</value>
	</property>
</bean>

<property name="name" value="dsapr"/>
注意：value属性 只能简化 8种基本类型和String类型 注入标签

用户自定义类型
<bean id="userService" class="xxx.userService">
    <property name="userDao">
    	<ref bean="userDao"/>
	</property>
</bean>

<property name="userDao" ref="userDao"/>
~~~

### 3.2 基于命名空间 p 进行简化

~~~xml
JDK类型注入
<bean id="person" class="xxx.Person">
    <property name="dsapr">
		<value>dsapr</value>
	</property>
</bean>

<bean id="" class="" p:name="dsapr"/>
注意：value属性 只能简化 8种基本类型和String类型 注入标签

用户自定义类型
<bean id="userService" class="xxx.userService">
    <property name="userDao">
    	<ref bean="userDao"/>
	</property>
</bean>

<bean id="person" class="org.dsapr.basic.Person" p:name="dsapr" p:id="1"/>
~~~

## 第六章、构造注入

~~~markdown
注入：通过Spring的配置文件，为成员变量赋值
Set注入：Spring调用Set方法 通过配置文件 为成员变量赋值
构造注入：Spring调用构造方法 通过配置文件 为成员变量赋值
~~~

### 1. 开发步骤

- 提供有参构造方法

  ~~~java
  public Customer(String name, int age) {
      this.name = name;
      this.age = age;
  }
  ~~~

- Spring 的配置文件

  ~~~xml
  <bean id="customer" class="org.dsapr.basic.constructer.Customer">
      <constructor-arg >
          <value>soap</value>
      </constructor-arg>
      <constructor-arg>
          <value>1</value>
      </constructor-arg>
  </bean>
  ~~~

### 2. 构造方法重载

#### 2.1 参数个数不同时

~~~markdown
通过控制<constructer-arg>标签的数量进行区分
~~~

#### 2.1 构造参数个数相同时

~~~markdown
通过在标签引入 type 属性 进行类型的区分 <constructer-arg type="">
~~~

### 3. 注入的总结

~~~markdown
set注入 构造注入
未来的实战中，应用 set 注入还是构造注入？
答案：set 注入更多
		1. 构造注入麻烦（重载）
		2. Spring框架底层 大量应用了 set 注入
~~~

![Spring注入](C:\note\image\Spring注入.png)

## 第七章、反转控制 与 依赖注入

### 1. 反转(转移)控制(IOC Inverse of Control)

~~~markdown
控制：对于成员变量赋值的控制权
反转控制：把对于成员变量赋值的控制权，从代码中反转(转移)到Spring工厂和配置文件中完成
	好处：解耦合
底层实现：工厂设计模式
~~~

![反转控制](C:\note\image\反转控制.png)

### 2. 依赖注入(Dependency Injection DI)

~~~markdown
注入：通过 Spring 的工厂及配置文件，为对象 (bean，组件) 的成员变量赋值

依赖注入：当一个类需要另一个类时，就意味着依赖，一旦出现依赖，就可以把另一个类作为本类的成员变量，最终通过 Spring 配置文件进行注入(赋值)。
	好处：解耦合
~~~

![依赖注入](C:\note\image\依赖注入.png)



## 第八章、Spring工厂创建复杂对象

~~~markdown
简单对象目前指的是pojo，为了跟ejb的javabean作区分，即可以直接new的对象。复杂对象主要是抽象类、接口等不能直接创建
~~~

![复杂对象](C:\note\image\复杂对象.png)

### 1. 什么是复杂对象

~~~markdown
复杂对象：指的就是不能直接通过new构造方法创建的对象
	Connection
	SqlSessionFactory
~~~

### 2. Spring 工厂创建复杂对象的3种方式

#### 2.1 FactoryBean接口

- 开发步骤

  - 实现 FactoryBean 接口

    ~~~java
    public class MyFactoryBean implements FactoryBean {
        @Override
        public Object getObject() throws Exception {
            // 用于书写创建复杂对象的代码，并把复杂对象作为方法的返回值返回
            Class.forName("com.mysql.jdbc.Driver");
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/test_db?userSSL=false", "root", "123456");
            return conn;
        }
        @Override
        public Class<?> getObjectType() {
            // 返回 所创建复杂对象的Class对象
            return Connection.class;
        }
        // 需要创建一次还是每一次调用都需要创建一个新的复杂对象
        @Override
        public boolean isSingleton() {
            return FactoryBean.super.isSingleton();
        }
    }
    ~~~

  - Spring 配置文件的配置

    ~~~markdown
    # 如果Class中指定的类型 是FactoryBean接口的实现类，那么通过id值获得的是这个类所创建的复杂对象 Connection
    <bean id="conn" class="org.dsapr.factorybean.ConnectionFactoryBean"/>
    *错误认知*：ctx.getBean("conn")获得的是ConntionFactoryBean这个类的对象;
    ~~~

- 细节

  - 如果想获得FactoryBean类型的对象 ctx.getBean("&conn")

    获得就是ConnectionFactoryBean对象

  - isSingleton方法

    返回 true 只会创建一个复杂对象

    返回 false 每一次都会创建新的对象

    问题：根据这个对象的特定，决定是返回true (SqlSessionFactory) 还是 false (Connection)

  - mysql 高版本连接创建时，需要指定SSL证书，解决问题的方式

    ~~~markdown
    url = "jdbc:mysql://localhost:3306/test_db?useSSL=false"
    ~~~

  - 依赖注入的体会(DI)

    ~~~markdown
    把ConnectionFactoryBean中依赖的4个字符串信息，进行配置文件的注入
    好处：解耦合
    ~~~

- FactoryBean的实现原理[简易版]

  ~~~markdown
  接口回调
  java谚语：接口加反射，什么都能做。
  1. 为什么 Spring 规定 FactoryBean 接口 实现 并且 getObject()?
  2. ctx.getBean("conn") 获得是复杂对象 Connection 而没有 获得 ConnectionFactoryBean(&)
  
  Spring 内部运行流程
  1. 通过conn获得 ConnectionFactoryBean类的对象，进而通过 instanceof 判断出是 FactoryBean 接口的实现类
  2. Spring 按照规定 getObject() ---> Connection
  3. 返回 Connection
  ~~~

  ![FactoryBean工作原理](C:\note\image\FactoryBean工作原理.png)

- FactoryBean总结

  ~~~markdown
  Spring中用于创建复杂对象的一种方式，也是Spring原生提供的，后续讲解Spring整合其他框架，大量应用FactoryBean
  ~~~

#### 2.2 实例工厂

~~~markdown
1. 避免Spring框架的侵入
	implements FactoryBean
2. 整合遗留系统
~~~

- 开发步骤

  ~~~xml
  <bean id="connFactory" class="org.dsapr.factorybean.ConnectionFactory"></bean>
  <bean id="conn" factory-bean="connFactory" factory-method="getConnection"/>
  ~~~

#### 2.3 静态工厂

- 开发步骤

  ~~~markdown
  <bean id="conn" class="org.dsapr.factorybean.StaticConnectionFactory" factory-method="getConnection"/>
  ~~~


## 第九章、控制Spring工厂创建对象的次数

FactoryBean isSingleton true false

### 1. 如何控制简单对象创建的次数

~~~markdown
<bean id="account" scope="singleton|prototype" class="org.dsapr.scope.Account"></bean>
singleton: 只会创建一次简单对象 默认值
prototytpe: 每一次都会创建新的对象
~~~

#### 2. 如何控制复杂对象的创建次数

~~~markdown
FactoryBean{
	isSigingleton(){
		retrun true; 只会创建一次
		return false; 每一次都会创建新的
	}
}
如果没有 isSingleton 方法 还是通过 scope 属性 进行队形创建次数的控制
~~~

#### 3. 为什么要控制对象的创建次数？

~~~markdown
好处: 节省不必要的内存浪费
~~~

- 什么样的对象只创建一次

  ~~~markdown
  1. SqlSessionFactory
  2. DAO
  3. Service
  ~~~

- 什么样的对象 每一次都要创建新的

  ~~~markdown
  1. Connection
  2. SqlSession | Session
  3. Struts2 Action
  ~~~

---

# 工厂高级特性

# 第十章、对象的生命周期

![Spring生命周期](C:\note\image\Spring生命周期.png)

## 1. 什么是对象的生命周期

~~~markdown
指的是一个对象创建、存活、消亡的一个完整过程
~~~

## 2. 为什么要学习对象的生命周期

~~~markdown
User user = new User()
JVM
由Spring负责对象的创建、存活、销毁、了解生命周期，有利于我们使用好Spring为我们创建的对象
~~~

## 3. 生命周期的三个阶段

- 创建阶段

  ~~~markdown
  Srping工厂何时创建对象
  ~~~

  - scope="singleton"

    ~~~markdown
    Spring工厂创建的同时,完成对象的创建
    
    注意: 设置 scope=singleton 这种情况下 也需要在获取对象的同时, 创建对象
    <bean lazy-init="true"/>
    ~~~

  - scope="prototype"

    ~~~markdown
    Spring工厂会在获取对象的同时,创建对象
    ctx.getBean("")
    ~~~

- 初始化阶段

  ~~~markdown
  Spring 工厂在创建完成对象后，调用对象的初始化方法，完成对应的初始化操作
  
  1. 初始化方法提供: 程序员根据需求，提供初始化方法，最终完成初始化操作
  2. 初始化方法调用: Spring 工厂进行调用
  ~~~

  - InitializingBean接口

    ~~~java
    // 程序员根据需求实现的方法 完成初始化操作
    public void afterProperitesSet(){
        // do something
    }
    ~~~

  - 对象中提供一个普通的方法

    ~~~java
    public void myInit(){
        
    }
    
    <bean id="product" init-method="myInit" class="org.dsapr.life.Product"/>
    ~~~

  - 细节分析

    1. 如果一个对象既实现了InitializingBean 同时又提供 普通的初始化方法

       ~~~markdown
       1. InitializingBean
       2. 初始化
       ~~~

    2. 注入一定发生在初始化操作的前面
    
    3. 什么叫做初始化操作
    
       ~~~markdown
       资源的初始化: 数据库 IO 网络 ......(耗时且侵占系统资源的操作)
       ~~~

- 销毁阶段

  ~~~markdown
  Spring 销毁对象前, 会调用对象的销毁方法, 完成销毁操作
  
  1. Spring 什么时候销毁所创建的对象?
  	ctx.close();
  2. 销毁方法: 程序员根据自己的需求, 定义销毁方法, 完成销毁操作
  		调用: Spring 工厂完成调用
  ~~~
  
  - DisposableBean
  
    ~~~java
    @Override
    public void destroy() throws Exception {
        // do something
    }
    ~~~
  
  - 定义一个普通的销毁方法
  
    ~~~java
    public void myDestroy() throws Exception {
        // do something
    }
    
    <bean id="product" destroy-method="myDestroy" class="org.dsapr.life.Product"/>
    ~~~
  
  - 细节分析
  
    1. 销毁方法的操作只适用于 scope="singleton"
  
    2. 什么叫做销毁操作
  
       ~~~markdown
       主要指的就是 资源的释放操作 io.close() connection.close()
       ~~~
  



## 第十一章、配置文件参数化

~~~markdown
把Spring配置文件中需要经常修改的字符串信息，转移到一个更小的配置文件中

1. Spring配置文件中存在经常需要修改的字符串吗
	存在 以数据库连接相关的参数 代表
2. 经常变化的字符串在Spring的配置文件中直接修改
	不利于项目的维护(修改)
3. 转移到一个小的配置文件(.properties)
	利于维护(修改)
	
配置文件参数化：利于Spring配置文件的维护(修改)
~~~

### 1. 配置文件参数的开发步骤

- 提供一个小的配置文件(.properties)

  ~~~properties
  名字：随便
  放置位置：随便
  
  jdbc.driverClassName = com.mysql.cj.jdbc.Driver
  jdbc.url = jdbc:mysql://localhost:3306/suns?useSSL=false
  jdbc.username = root
  jdbc.password = 123456
  ~~~

- Spring的配置文件与小配置文件整合

  ~~~xml
  applicationContext.xml
  <context:property-placeholder location="classpath:/db.properties"/>
  
  classpath 编译后的target下的classes
  ~~~

- 在Spring配置文件中通过${key}获取小配置文件中对应的值

  ~~~xml
  <bean id="conn" class="org.dsapr.factorybean.ConnectionFactoryBean">
      <property name="driverClassName" value="${jdbc.driverClassName}"/>
      <property name="username" value="${jdbc.username}"/>
      <property name="password" value="${jdbc.password}"/>
      <property name="url" value="${jdbc.url}"/>
  </bean>
  ~~~




## 第十二章、自定义类型转换器

### 1. 类型转换器

~~~markdown
作用：Spring 通过类型转换器把配置文件中字符串类型的数据，转换成了对象中成员变量对应类型的数据，进而完成了注入。
~~~

![类型转换器](C:\note\image\类型转换器.png)

#### 2. 自定义类型转换器

~~~markdown
原因：当 Spring 内部没有提供特定类型转换器时，而程序员在应用过程中还需要使用，那么就需要程序员自己定义类型转换器
~~~

- 类 implement Converter

  ~~~java
  /**
   * convert 方法作用：String ---> Date
   *          SimpleDateFormat sdf = new SimpleDateFormat();
   *          sdf.parse(String) ---> Date
   * param:source 代表的是配置文件中 日期字符串 <value>2021-11-29<value/>
   *
   * return: 当把转换好的Date作为convert方法的返回值后，Spring自动的为birthday属性进行注入（赋值）
   */
  @Override
  public Date convert(String source) {
      SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
      Date date = null;
      try {
          date = sdf.parse(source);
      } catch (ParseException e) {
          e.printStackTrace();
      }
      return date;
  }
  ~~~

- 在Spring的配置文件中进行配置

  - MyDateConverter对象创建出来

    ~~~xml
    <bean id="myDateConverter" class="xxx.MyDateConverter"></bean>
    ~~~

  - 类型转换器的注册

    ~~~markdown
    目的：告知Spring框架，我们所创建的MyDateConverter是一个类型转换器
    <!-- 用于注册类型转换器 -->
    <bean id="conversionService" class="org.springframework.context.support.ConversionServiceFactoryBean">
        <property name="converters">
            <set>
                <ref bean="myDateConverter"/>
            </set>
        </property>
    </bean>
    <bean id="person" class="org.dsapr.converter.Person">
    ~~~


## 3. 细节

- MyDateConverter中的日期的格式，通过依赖注入的方式，由配置文件完成

  ~~~java
  public class MyDateConverter implements Converter<String, Date> {
      private String pattern;
  
      public String getPattern() {
          return pattern;
      }
  
      public void setPattern(String pattern) {
          this.pattern = pattern;
      }
  
      /**
       * convert 方法作用：String ---> Date
       *          SimpleDateFormat sdf = new SimpleDateFormat();
       *          sdf.parse(String) ---> Date
       * param:source 代表的是配置文件中 日期字符串 <value>2021-11-29<value/>
       *
       * return: 当把转换好的Date作为convert方法的返回值后，Spring自动的为birthday属性进行注入（赋值）
       */
      @Override
      public Date convert(String source) {
          SimpleDateFormat sdf = new SimpleDateFormat(pattern);
          Date date = null;
          try {
              date = sdf.parse(source);
          } catch (ParseException e) {
              e.printStackTrace();
          }
          return date;
      }
  }
  ~~~

  ~~~xml
  <!-- Spring 创建 MyDateConverter 类型对象 -->
  <bean id="myDateConverter" class="org.dsapr.converter.MyDateConverter">
      <property name="pattern" value="yyyy-MM-dd"/>
  </bean>
  ~~~

- converServiceFactoryBean 定义 id属性 值必须 converService

- Spring框架内置日期类型的转换器

  ~~~markdown
  日期格式：2020/05/01 (不支持 2020-05-01)
  ~~~

## 第十三章、后置处理Bean

~~~markdown
BeanPostProcessor作用：对Spring工厂所创建的对象，进行再加工

AOP底层实现：

注意：BeanPostProcessor接口
	xxx() {
		
	}
~~~

- 后置处理 Bean 的运行原理分析

![后置处理Bean](C:\note\image\后置处理Bean.png)

~~~markdown
程序员实现BeanPostProcessor规定接口中的方法

Object postProcessBeforeInitialization(Object bean, String beanName)
作用：Spring创建完对象，并进行注入后，可以运行Before方法进行加工
获得Spring创建好的对象：通过方法的参数
最终通过返回值交给Spring框架

Object postProcessAfterInitialization(Object bean, String beanName)
作用：执行完对象的初始化操作后，可以运行After方法进行加工
获得Spring创建好的对象：通过方法的参数
最终通过返回值交给Spring框架

实战中：
很少处理Spring的初始化操作，没有必要区分Before After。只需要实现其中的一个After方法即可
注意：
	postProcessBeforeInitiallization
	return bean对象
~~~

- BeanPostProcessor 的开发步骤

  1. 类实现 BeanPostProcessor 接口

     ~~~java
     public class MyBeanPostProcessor implements BeanPostProcessor {
         @Override
         public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
             return bean;
         }
         @Override
         public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
             Category category = (Category) bean;
             category.setName("xiaowb");
             return category;
         }
     }
     ~~~

  2. Spring 的配置文件中配置

     ~~~ xml
     <bean id="myBeanPosttProcessor" class="xxx.MyBeanPostProcessor"/>
     ~~~

  3. BeanPostProcessor 会对 Spring 工厂中所有创建的对象进行加工



# AOP编程

## 第一章、静态代理设计模式

### 1. 为什么需要代理设计模式

#### 1.1 问题

- 在JavaEE分层开发中，哪个层次对于我们来讲最重要

  ~~~markdown
  DAO ---> Service ---> Controller
  
  JavaEE分层开发中，最为重要的是Service层
  ~~~

- Service 层中包含了哪些代码

  ~~~markdown
  Service 层中 = 核心功能(几十行 上百行) + 额外功能(附加功能)
  1. 核心功能
     业务运算
     DAO调用
  2. 额外功能
     1. 不属于业务
     2. 可有可无
     3. 代码量很小
     
     事务、日志、性能
  ~~~

- 额外功能书写在Service层中好不好

  ~~~markdown
  Service层的调用者的角度(Controller): 需要在Service层中书写角度
  						软件设计者: Service 层不需要额外功能
  ~~~

- 现实生活中的解决方式

  **引入一个代理(中介)类**

  1. 额外功能
  2. 调用目标类(原始类)核心功能

### 2. 代理设计模式

#### 1.1 概念

~~~markdown
通过代理类，为原始类 (目标) 增加额外的功能
好处：利于原始类 (目标) 的维护
~~~

#### 1.2 名词解释

~~~markdown
1. 目标类 原始类
	指的是 业务类 (核心功能 --> 业务运算 DAO调用)
2. 目标方法，原始方法
	目标类(原始类)中的方法，就是目标方法(原始方法)
3. 额外功能 (附加功能)
	日志、事务、性能
~~~

#### 1.3 代理开发的核心要素

~~~markdown
代理类 = 目标类(原始类) + 额外功能 + 原始类(目标类)实现相同的接口

房东 ---> public interface UserService {
			m1
			m2
}
UserServiceImpl implements UserService {
			m1 ---> 业务运算 DAO调用
			m2
}
UserServiceProxy implements UserService {
			m1
			m2
}
~~~

#### 1.4 编码

**静态代理**： 为每一个原始类 手工编写

~~~java
public class UserServiceProxy implements UserService{
    private UserServiceImpl userService = new UserServiceImpl();
    @Override
    public void register(User user) {
        System.out.println("--- log ---");
        userService.register(user);
    }
    @Override
    public boolean login(String name, String password) {
        System.out.println("--- log ---");
        userService.login(name, password);
        return false;
    }
}
~~~

#### 1.5 静态代理存在的问题

~~~markdown
1. 静态类文件数量过多，不利于项目管理
	UserServiceImpl UserServiceProxy
	OrderServiceImpl OrderServiceProxy
2. 额外功能维护性差
	代理类中 额外功能修改复杂（麻烦）

~~~

## 第二章、Spring的动态代理开发

### 1. Spring动态代理的概念

~~~markdown
概念：通过代理类为原始类(目标类)增加额外功能
好处：利于原始类(目标类)的维护
~~~

### 2. 搭建开发环境

~~~xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-aop</artifactId>
    <version>5.1.4.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjrt</artifactId>
    <version>1.8.8</version>
</dependency>
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
    <version>1.8.3</version>
</dependency>
~~~

### 3. Spring动态代理的开发步骤

1. 创建原始对象(目标对象)

   ~~~java
   public class UserServiceImpl implements UserService{
       @Override
       public void register(User user) {
           System.out.println("UserServiceImpl.register 业务运算 + DAO ");
       }
       @Override
       public boolean login(String name, String password) {
           System.out.println("UserServiceImpl.login");
           return true;
       }
   }
   ~~~
   
   ~~~xml
   <bean id="userService" class="org.dsapr.proxy.UserServiceImpl"/>
   ~~~
   
2. 额外功能

   MethodBeforeAdvice 接口

   ~~~xml
   额外的功能书写在接口的实现中，运行在原始方法之前实现额外功能
   ~~~

   ~~~java
   public class Before implements MethodBeforeAdvice {
       /**
        * 需要把运行在原始方法执行之前运行的额外功能，书写在before方法中
        * @param method 额外功能所需要增加给的那个原始方法
        * @param objects 额外功能所增加给的那个原始方法的参数
        * @param o 额外功能所增加给的那个原始对象
        * @throws Throwable
        */
       @Override
       public void before(Method method, Object[] objects, Object o) throws Throwable {
           System.out.println("--- method before advice log ---");
       }
   }
   ~~~

   ~~~xml
   <bean id="before" class="org.dsapr.dynamic.Before"/>
   ~~~

3. 定义切入点

   ~~~xml
   切入点：额外功能加入的位置
   
   目的：由程序员根据自己的需要，决定额外功能加入给哪个原始方法
   register
   login
   
   简单的测试：所有方法都作为切入点，都加入额外的功能
   ~~~

   ~~~xml
   <aop:config>
       <!-- 所有的方法，都作为切入点，加入额外功能 -->
       <aop:pointcut id="pc" expression="execution(* *(..))"/>
   </aop:config>
   ~~~

4. 组装(2,3整合)

   ~~~xml
   <aop:config>
       <!-- 所有的方法，都作为切入点，加入额外功能 -->
       <aop:pointcut id="pc" expression="execution(* *(..))"/>
       <!-- 组装：目的把切入点与额外功能进行整合 -->
       <!-- 所有的方法，都加入 before 的额外功能 -->
       <aop:advisor advice-ref="before" pointcut-ref="pc"/>
   </aop:config>
   ~~~

5. 调用

   ~~~java
   目的：获得Spring工厂创建的动态代理，并进行调用
   ApplicationContext ctx = new ClassPathXmlApplicationContext("/applicationContext.xml");
   注意：
       1. Spring的工厂通过原始对象的id值获得的是代理对象c
       2. 获得代理对象后，可以通过声明接口类型进行对象的存储
   UserService userService = (UserService)ctx.getBean("userService");
   
   userService.login("");
   userService.regist("","");
   ~~~
   
### 4. 动态代理细节分析

1. Spring 创建的动态代理类在哪里？

   ~~~markdown
   Spring 框架在运行时，通过动态字节码技术，在JVM创建的，运行在JVM内部，等程序结束后，会和JVM一起消失
   
   什么叫动态字节码技术：通过第三个动态字节码框架，在JVM中创建对应类的字节码，进而创建对象，当虚拟机结束，动态字节码跟着消失。
   
   结论：动态代理不需要定义类文件，都是JVM运行过程中动态创建的，所以不会造成静态代理，类文件数量过多，影响项目管理的问题。
   ~~~

   ![动态字节码](C:\note\image\动态字节码.png)

   2. 动态代理编程简化代理的开发

      ~~~markdown
      在额外功能不改变的前提下，创建其他目标类 (原始类) 的代理对象时，只需要指定原始 (目标) 对象即可。
      ~~~

   3. 动态代理额外功能的维护性大大增强

## 第三章、动态代理详解

### 1.  额外功能的详解

- MethodBeforeAdvice分析

  ~~~java
  1. MethodBeforeAdvice 接口作用: 额外功能运行在原始方法执行之前，进行额外的功能操作。
  public class Before implements MethodBeforeAdvice {
      /**
       * 需要把运行在原始方法执行之前运行的额外功能，书写在before方法中
       * @param method 额外功能所需要增加给的那个原始方法
       * @param objects 额外功能所增加给的那个原始方法的参数
       * @param o 额外功能所增加给的那个原始对象
       * @throws Throwable
       */
      @Override
      public void before(Method method, Object[] objects, Object o) throws Throwable {
          System.out.println("--- method before advice log ---");
      }
  }
  
  2. before方法的3个参数在实战中，该如何使用
      before方法的参数，在实战中，会根据需要进行使用，不一定都会用到，也有可能都不用。
      Servlet{
      	service(HttpRequest request, HttpResponse response) {
              request.getParamter("name") --->
                  
              response.getWriter() --->
          }
  	}
  ~~~

- MethodInterceptor(方法拦截器)

  MethodBeforeAdvice ---> 原始方法执行之前

  ~~~markdown
  MethodInterceptor接口: 额外功能可以根据需要运行在原始方法执行 前、后、前后
  ~~~

  

  ~~~java
  public class Arround implements MethodInterceptor {
      /**
       * invoke 方法的作用：额外功能书写在 invoke
       *                  额外功能 原始方法之前
       *                          原始方法之后
       *                          原始方法执行之前 之后
       *
       * 参数： MethodInvocation (Method): 额外功能所增加的那个原始方法
       * 返回值： Object 原始方法执行后的返回值
       * date convert(String name)
       */
      @Override
      public Object invoke(MethodInvocation methodInvocation) throws Throwable {
          System.out.println("--- 额外功能 ---");
          Object ret = methodInvocation.proceed();
          return ret;
      }
  }
  ~~~

  额外功能运行在原始方法执行之后

  ~~~java
  @Override
  public Object invoke(MethodInvocation methodInvocation) throws Throwable {
      Object ret = methodInvocation.proceed();
      System.out.println("--- 额外功能 ---");
      return ret;
  }
  ~~~

  额外功能运行在原始方法执行之前、之后

  ~~~java
  什么样的额外功能 运行在原始方法执行之前，之后都要添加？
  事务
  
  @Override
  public Object invoke(MethodInvocation methodInvocation) throws Throwable {
      System.out.println("--- 额外功能 ---");
      Object ret = methodInvocation.proceed();
      System.out.println("--- 额外功能 ---");
      return ret;
  }
  ~~~

  额外功能运行在原始方法抛出异常的时候

  ~~~java
  @Override
  public Object invoke(MethodInvocation methodInvocation) throws Throwable {
      Object ret = null;
      try {
          ret = methodInvocation.proceed();
      } catch (Throwable e) {
          System.out.println("--- 原始方法抛出异常，执行的额外功能 ---");
          e.printStackTrace();
      }
      return ret;
  }
  ~~~

  MethodInterceptor影响原始方法的返回值

  ~~~java
  原始方法的返回值，直接作为invoke方法的返回值返回，MethodInterceptor不会影响到原始方法的返回值。
  
  MethodInterceptor影响原始方法的返回值
  Invoke方法的返回值，不要直接返回原始方法的运行结果即可
      
  @Override
  public Object invoke(MethodInvocation methodInvocation) throws Throwable {
      System.out.println("--- log ---");
      Object ret = methodInvocation.proceed();
      return false;
  }
  ~~~
  
### 2. 切入点详解

~~~xml
<aop:pointcut id="pc" expression="execution(* *(..))"/>
execution(* *(..)) ---> 匹配所有方法 a b c

1. excution() 切入点函数
2. * *(..) 切入点表达式
~~~

#### 2.1 切入点表达式

1. 方法切入点表达式

   ~~~java
   public void add(int i, int j) throw Exception
     |      |    |       |                 |
   修饰符	  返回值 方法名  参数列表            异常
         *       *     (..)
       
   * *(..)
   * ---> 修饰符 返回值
   * ---> 方法名
   ()---> 参数表
   ..---> 对于参数没有要求(参数有没有，参数有几个都行，参数是什么类型的都行)
   ~~~

   - 定义login方法作为切入点

     ~~~markdown
     * login(..)
     
     # 定义register作为切入点
     * register(..)
     ~~~

   - 定义login方法且login方法有两个字符串类型的参数 作为切入点

     ~~~markdown
     * login(String,String)
     
     # 注意：非 java.lang 包中的类型，必须要写全限定名
     * register(com.dsapr.proxy.User)
     
     # 
     * login(String, ..) --> login(String),login(String,String),login(String,com.dsapr.proxy.User)
     ~~~

   - 上面所讲解的方法切入点表达式不精准

     ~~~dtd
     |- com.dsapr
     	|- a
     		|- UserServiceImpl
     			- User login(String name, String password)
     			- boolean login(User user)
     			- boolean register(User user)
     		|- UserServiceImpl1
     			- User login(String name, String password)
     	|- b
     		|- UserServiceImpl
     			- login(String name, String password)
                    - register(User user)
     ~~~

   - 精准方法切入点限定

     ~~~markdown
     修饰符 返回值		包.类.方法
     	* 			com.dsapr.proxy.UserServiceImpl(..)
     	* 			com.dsapr.proxy.UserServiceImpl(String,String)
     ~~~

   2. 类切入点

      ~~~markdown
      制定特定类作为切入点(额外功能加入的位置)，自然这个类中的所有方法，都会加上对应的额外功能
      ~~~

      - 语法1

        ~~~markdown
        # 类中的所有方法加入了额外功能
        * com.dsapr.proxy.UserServiceImpl.*(..)
        ~~~

      - 语法2

        ~~~markdown
        # 忽略包
        1. 类只存在一级包 com.UserServiceImpl
        * *.UserServiceImpl.*(..)
        
        2. 类存在多级包
        <aop:pointcut id="pc" expression="execution(* *..UserServiceImpl.*(..))"/>
        ~~~

   3. 包切入点表达式 (更具实战价值)

      ~~~markdown
      指定包作为额外功能加入的位置，自然包中的所有类及其方法中都会加入额外的功能
      ~~~

      - 语法1

        ~~~markdown
        # 切入点包中的所有类，必须在proxy中，不能在proxy包的子包中
        * com.dsapr.proxy.*.*(..)
        ~~~

      - 语法2

        ~~~markdown
        # 切入点当前包及其子包都生效
        * com.dsapr.proxy..*.*(..)
        ~~~

#### 2.2 切入点函数

~~~markdown
切入点函数：用于执行切入点表达式
~~~

1. excution

   ~~~markdown
   最为重要的切入点函数，功能最全
   执行 方法切入点表达式，类切入点表达式，包切入点表达式
   
   弊端：execution执行切入点表达式，书写麻烦
   	execution(* com.dsapr.proxy..*.*(..))
   	
   注意：其他的切入点函数，简化的是execution书写复杂度，功能上完全一致
   ~~~

2. args

   ~~~markdown
   作用：主要用于函数() 参数的匹配
   切入点：方法参数必须得是2个字符串类型的参数
   execution(* *(String,String))
   
   args(String,String)
   ~~~

3. within

   ~~~markdown
   作用：主要用于进行类、包切入点表达式的匹配
   
   切入点： UserServiceImpl 这个类
   
   execution(* *..UserServiceImpl.*(..))
   
   within(*..UserServiceImpl)
   ~~~

   

