# 人力资源管理项目

本项目采用了vue2+element UI + echarts  在vue-admin-template的底层模板中进行了二次封装

**gitee地址**

```
https://gitee.com/zlaxx/my_management_system
```

**github地址**

```
https://github.com/ZL-126681923/my_management_system
```

**项目架构如图所示**

![image.png](https://cdn.nlark.com/yuque/0/2023/png/8435673/1677638069702-b1d74f78-3c4d-4491-bbcb-5984cd6a2740.png#averageHue=%23526a27&clientId=u27a6c102-7f89-4&from=paste&height=529&id=ub74513ae&name=image.png&originHeight=1058&originWidth=2164&originalType=binary&ratio=2&rotation=0&showTitle=false&size=236996&status=done&style=none&taskId=u8aa4e64f-2e8e-46fc-b2eb-bbc40084251&title=&width=1082)

## 基础环境+登录

1.拉取命令

```
git clone https://gitee.com/zlaxx/my_management_system.git
```

2.安装依赖

```
npm i
(node环境应在14.0左右）
```

3.启动项目

```
npm run dev
```

4.目录解析

```
├── src                        # 源代码目录
│   ├── api                    # 所有请求
│   ├── assets                 # 主题 字体等静态资源
│   ├── components             # 全局公用组件
│   ├── icons                  # 项目所有 svg icons
│   ├── layout                 # 全局 layout
│   ├── router                 # 路由
│   ├── store                  # 全局 store管理
│   ├── styles                 # 全局样式
│   ├── utils                  # 全局公用方法
│   ├── views                  # views 所有页面
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 加载组件 初始化等
│   └── permission.js          # 权限管理
│   └── settings.js            # 配置文件
```

