# docker搭建mysql

拉取镜像

~~~markdown
docker pull mysql/mysql-service:8.0.29
~~~

参考 dockerhub 教程启动

 注意：

1. 保证持久化
2. 设置字符集
3. 时区问题

~~~markdown
docker run -it -d --name=mysql8 -e MYSQL_ROOT_PASSWORD=123456  mysql/mysql-server:8.0.29 \
--charcter-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci \
-v /Users/dsapr/docker/mysql8/conf:/etc/mysql/conf.d \
-v /Users/dsapr/docker/mysql8/logs:/logs \
-v /Users/dsapr/docker/mysql8/data:/var/lib/mysql \
-p 3306:3306 \
-e TZ=Asia/Shanghai --default-time_zone='+8:00'
~~~

