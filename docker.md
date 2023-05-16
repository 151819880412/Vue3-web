查看所有容器
docker ps -a
进入容器
其中字符串为容器ID:
docker exec -it d27bd3008ad9 /bin/bash

systemctl start docker  # 启动docker服务

systemctl stop docker  # 停止docker服务

systemctl restart docker  # 重启docker服务

开启所有容器
docker-compose up -d
1.停用全部运行中的容器:
docker stop $(docker ps -q)
2.删除全部容器：
docker rm $(docker ps -aq)
一条命令实现停用并删除容器
docker stop $(docker ps -q) & docker rm $(docker ps -aq)




yarn add @sentry/browser
yarn add @sentry/integrations
Sentry.init({
  app,
  // dsn: "https://5a0a9839a23546f29270e7a8925d1c2d@o4504155037171712.ingest.sentry.io/4504173618987008",
  dsn: "http://7f3804a662a74edca6cf209916b6b564@192.168.226.3:9000/1",
  release: 'pro@1.0.1',
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracePropagationTargets: ["localhost", "localhost:8087", /^\//],
    }),
  ],
  tracesSampleRate: 1.0,
});


sentry-cli login
sentry-cli releases -o vue-demo-i7 -p javascript-vue new pro@1.0.1

sentry-cli releases -o 组织名 -p 项目名 files 版本号 upload-sourcemaps 打包后js的目录 --url-prefix 线上js访问地址

sentry-cli releases -o vue-demo-i7 -p javascript-vue files pro@1.0.1 upload-sourcemaps dist\js --url-prefix ~/js


docker run -d -p 8081:80 --name demo2 -v /nginx/html:/usr/share/nginx/html -v /nginx/conf:/etc/nginx -v /nginx/logs:/var/log/nginx nginx


vue+sentry实现前端监控
https://juejin.cn/post/6844904144566910983#heading-1
https://www.jianshu.com/p/e5d51279f33d

Linux安装Docker完整教程
https://blog.csdn.net/m0_59196543/article/details/124749175

docker 部署nginx 
http://t.zoukankan.com/007sx-p-9964145.html

Xshell连接VMware虚拟机（CentOs7）
http://www.omica.com.cn/news/show-34468.html

linux安装docker-compose
https://blog.csdn.net/AlexanderRon/article/details/123412922