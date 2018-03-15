import { getProxySchedule } from "./get_proxy";
import { testProxySchedule } from "./check_proxy";
import later from 'later';
later.date.localTime();

export function executeSchedule() {
  getProxySchedule();
  testProxySchedule();
}
