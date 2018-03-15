import { testProxy } from "../extend/helper";
import { Proxy } from "../model/proxy";
import { config } from "../../config/config.default";
import logger from '../logger';

function check_proxy() {
  logger.task.info('check proxy ', new Date().toLocaleString());
  Proxy.findAll({})
    .then((proxies) => {
      proxies.forEach(async (proxy) => {
        testProxy(proxy.proxy)
          .then((result) => {
            if(!result.status) {
              if (proxy.test_count < config.test_count) {
                proxy.test_date = new Date().toLocaleString();
                proxy.tested = false;
                proxy.delay = result.delay;
                proxy.test_count += 1;
                Proxy.update(proxy);
              } else {
                Proxy.remove(proxy);
              }
            } else {
              proxy.test_date = new Date().toLocaleString();
              proxy.tested = true;
              proxy.delay = result.delay;
              proxy.test_count = 0;
              Proxy.update(proxy);
            }
          })
      })
    })
}

export {
  check_proxy
}