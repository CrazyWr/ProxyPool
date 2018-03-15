import rp from 'request-promise';
import { config } from "../../config/config.default";
import logger from '../logger';

function getHtml(uri) {
  let option = {
    uri: uri,
    headers: {
      'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding':'gzip',
      'Accept-Language':'zh-CN,zh;q=0.8',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      'Pragma': 'no-cache',
      'Content-Type': 'text/html;charset=UTF-8'
    },
    gzip: true
  }
  return rp(option)
    .then((html) => {
      return html
    })
    .catch((e) => {
      throw new Error(`${e.name} ${e.statusCode} ${e.message}  ${uri}`)
    })

}

function verifyProxyFormat(proxy) {
  if (!proxy) return false;
  const re = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{1,5}/;
  return proxy.match(re) ? true : false;
}

function testProxy(proxy) {
  if (!verifyProxyFormat(proxy)) return Promise.reject({status: false, delay: 0});

  const test_url = 'http://www.baidu.com';
  const delay = config.delay;
  const start_time = new Date();
  return rp({
    uri: test_url,
    proxy: `http://${proxy}`,
    timeout: delay
  })
  .then(() => {
    // logger.task.info(`RequestSuccess ${proxy}`);
    const delay = new Date() - start_time;
    return {status: true, delay: delay};
  })
  .catch((e) => {
    // logger.task.info(e.name, e.message);
    return {status: false, delay: 0};
  })
}

export {
  getHtml,
  verifyProxyFormat,
  testProxy
}
