import { Proxy } from "../model";

async function proxy_list(ctx) {
  var { limit = 10, page = 0 } = ctx.query;
  if (limit <= 0) limit = 10;
  if (page <= 0) page = 0;
  const skip = page * limit
  const list = await Proxy.find({tested: true}, parseInt(limit), skip, {delay: 1});
  const sum = await Proxy.count({tested: true});
  ctx.body = {
    code: 200,
    data: {
      sum: sum,
      page: parseInt(page),
      rows: list
    },
    message: 'get Proxy Success'
  };
}

export {
  proxy_list
}