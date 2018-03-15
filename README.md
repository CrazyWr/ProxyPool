# ProxyPool
node 版本的 ProxyPool
测试地址: (单机勿压)

## 下载安装
- 下载源码
```
git clone git@github.com:CrazyWr/ProxyPool.git
```
- 安装依赖
```
yarn/npm install
```
- config
```
const host = '' // 通过ifconfig / ipconfig 查询本地host ip
```
```
port: 9000,
dbConfig: {
  mongodb: {
    host: host || 'localhost',
    port: 27017,
    username: 'ProxyPool',
    password: '12345678',
    name: 'proxy_pool',
    mongo_url: ''
  }
},
get_proxy_schedule_text: 'every 3 min', //爬取代理时间间隔
check_proxy_schedule_text: 'every 1 min', //验证代理时间间隔
test_count: 3,  //代理验证次数, 连接不成功最大次数
delay: 5 * 1000 //代理延迟最大值, 超过阈值丢弃
```

- 启动

  __请自行安装Mongo数据库  并创建proxy_pool数据库, 添加ProxyPool/12345678用户__
```
yarn run dev
```

- 测试
```
yarn run test
```

代理爬取部分参考自 https://github.com/jhao104/proxy_pool


## Docker 方式运行
### 设置本地host ip
### docker-compose 运行
```
docker-compose up -d 
```
