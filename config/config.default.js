const path = require('path');
const host = "192.168.1.102"; // 本地host
const config = {
  port: 9000,
  dbConfig: {
    mongodb: {
      host: host || '127.0.0.1',
      port: 27017,
      username: 'ProxyPool',
      password: '12345678',
      name: 'proxy_pool',
      mongo_url: ''
    }
  },
  get_proxy_schedule_text: 'every 2 min', //爬取代理时间间隔
  check_proxy_schedule_text: 'every 1 min', //验证代理时间间隔
  test_count: 3,  //代理验证次数, 连接不成功最大次数
  delay: 5 * 1000 //代理延迟最大值, 超过阈值丢弃
}

export { config }
