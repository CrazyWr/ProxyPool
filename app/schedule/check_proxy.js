import { check_proxy } from "../service";
import later from 'later';
import { config } from '../../config/config.default.js';

const schedule_text = config.check_proxy_schedule_text || 'every 10 min';

function testProxySchedule() {
  later.setInterval(() => {
    check_proxy();
  }, later.parse.text(schedule_text))
};

export {
  testProxySchedule
};
