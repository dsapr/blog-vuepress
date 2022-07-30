# Spring源码分析

## 二 IOC 工厂部分核心内容

~~~java
BeanFactory bf = new XmlBeanFactory(Resource-->xml)
bf.getBean("")-->target
~~~

1. 怎么读取配置文件 获得IO资源

   Resource 接口的实现类

   |- inputStream

2. 怎么读取配置文件后，如何在Spring中以对象的形式进行封装

   Spring 底层通过 XmlBeanDefinitionReader 读取配置文件并封装

3. 根据配置信息创建对象

4. 所创建对象的生命周期

## 五

Spring 有几种方式创建对象

1. 简单对象 直接可以 new 对象() ---> 基于反射完成

2. 复杂对象 不能被直接 new 创建对象

   - FactoryBean 创建方式

     - getObject() --> 书写位置 --> Spring 工厂回调 getObject() 获得对象 

     - getObjectType()

     - isSingleton
	  
   - 静态工厂
   
     ~~~java
     MyFactory {
       public static Object getObject() {
         // do somthing
       }
     }
     ~~~
     
     ~~~xml
     <bean id="xxx.MyFactory" factory-method="getObject"/>
     ~~~
     
   - 实例工厂
   
     ~~~java
     MyFactory {
       public Object getObject() {
         // do somthing
       }
     }
     ~~~
   
     ~~~xml
     <bean id="myFactory" class="xxx.MyFactory"/>
     <bean id="product" factory-bean="myFactory" factory-method="getObject"/>
     ~~~
   
   如果仅仅进行对象的创建，对于容器来说没有意义，Spring还要考虑对象成员变量赋值的问题(注入)
   
   **注入分为几种方式？**
   
   - set 注入
     - 程序员完成注入 8种基本类型 自建注入 ref-bean
     - 容器(Spring)自己注入 Aware
       - BeanNameAware
       - BeanFactoryAware
   - 构造注入
   - autowire 自动注入

​			