import { config } from '../../config/config.default.js';
import later from 'later';
import { getProxy } from "../service";

const schedule_text = config.get_proxy_schedule_text || 'every 10 min';

function getProxySchedule(ctx) {
  later.setInterval(() => {
    getProxy();
  }, later.parse.text(schedule_text))
};

export {
  getProxySchedule
};