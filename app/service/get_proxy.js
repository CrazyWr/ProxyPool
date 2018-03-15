import { getHtml, verifyProxyFormat } from "../extend/helper";
// import sleep from 'sleep';
import { Proxy } from "../model";
import logger from '../logger';

const xpath = require('xpath');
const dom = require('xmldom').DOMParser;

function getProxy() {
  logger.task.info('get proxy ', new Date().toLocaleString());
  free_proxy_data5u();
  free_proxy_66ip(10);
  free_proxy_ip181();
  free_proxy_xicidaili();
  free_proxy_xdaili(4, 10);
}

function free_proxy_data5u() {
  let url_list = [
    'http://www.data5u.com/',
    'http://www.data5u.com/free/gngn/index.shtml',
    'http://www.data5u.com/free/gnpt/index.shtml'
  ];

  for(let url of url_list) {
    setTimeout(() => {
      getHtml(url)
        .then((html) => {
          var models = [];
          const xml = new dom().parseFromString(html);
          const ul_list = xpath.select('//ul[@class="l2"]', xml);
          for(let ul of ul_list){
            let linode = xpath.select('.//li', ul);
            let ip = linode[0].firstChild.data;
            let port = linode[1].firstChild.data;
            let proxy = `${ip}:${port}`;
            if (verifyProxyFormat(proxy)) {
              const model = new Proxy(proxy, url);
              models.push(model);
            }
          }
          return models;
        })
        .then((models) => {
          saveModels(models);
        })
        .catch((e) => {
          logger.task.error(`get Proxy error: ${e}`);
        })
    }, 500)
  }

}

function free_proxy_66ip(page = 10) {

  for(let i=0; i<page; i++) {
    const url = `http://www.66ip.cn/mo.php?sxb=&tqsl={}&port=&export=&ktip=&sxa=&submit=%CC%E1++%C8%A1&textarea=${i}`;
    getHtml(url)
      .then((html) => {
        const re = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{1,5}/g;
        const proxies = html.match(re);
        var models = [];
        proxies.forEach((proxy) => {
          if (verifyProxyFormat(proxy)) {
            const model = new Proxy(proxy, url);
            models.push(model);
          }
        })
        return models;
      })
      .then((models) => {
        saveModels(models);
      })
      .catch((e) => {
        logger.task.error(`get Proxy error: ${e}`);
      })
  }
}

function free_proxy_ip181() {
  const url = 'http://www.ip181.com/';
  getHtml(url)
    .then((html) => {
      var models = [];
      const xml = new dom().parseFromString(html);
      const tr_list = xpath.select('//tr[@class="warning"]', xml);
      for(let tr of tr_list){
        let linode = xpath.select('.//td', tr);
        let ip = linode[0].firstChild.data;
        let port = linode[1].firstChild.data;
        let proxy = `${ip}:${port}`;
        if (verifyProxyFormat(proxy)) {
          const model = new Proxy(proxy, url);
          models.push(model);
        }
      }
      return models;
    })
    .then((models) => {
      saveModels(models);
    })
    .catch((e) => {
      logger.task.error(`get Proxy error: ${e}`);
    })

}

function free_proxy_xicidaili() {
  let url_list = [
    'http://www.xicidaili.com/nt',
    'http://www.xicidaili.com/nn',
  ];

  for(let url of url_list) {
    getHtml(url)
      .then((html) => {
        var models = [];
        const xml = new dom().parseFromString(html);
        const tr_list = xpath.select('//tr[@class="odd"]', xml);
        for (let tr of tr_list) {
          let linode = xpath.select('.//td', tr);
          let ip = linode[1].firstChild.data;
          let port = linode[2].firstChild.data;
          let proxy = `${ip}:${port}`;
          if(verifyProxyFormat(proxy)) {
            const model = new Proxy(proxy, url);
            models.push(model);
          }
        }
        return models;
      })
      .then((models) => {
        saveModels(models);
      })
      .catch((e) => {
        logger.task.error(`get Proxy error: ${e}`);
      })
  }

}

function free_proxy_xdaili(page = 4, rows = 10) {
  for(let i=1; i<page; i++) {
    const url = `http://www.xdaili.cn/ipagent/freeip/getFreeIps?page=${page}&rows=${rows}`;
    getHtml(url)
      .then((html) => {
        const json = JSON.parse(html);
        const proxies = json['RESULT']['rows'].map(row => row['ip']+':'+row['port']);
        var models = [];
        proxies.forEach((proxy) => {
          if (verifyProxyFormat(proxy)) {
            const model = new Proxy(proxy, url);
            models.push(model);
          }
        })
        return models;
      })
      .then((models) => {
        saveModels(models);
      })
      .catch((e) => {
        logger.task.error(`get Proxy error: ${e}`);
      })
  }
}

function saveModels(models) {
  models.forEach((model) => {
    // console.log('add', models.length)
    Proxy.update(model);
  })
}

export { getProxy }