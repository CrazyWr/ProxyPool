import { api } from "./controller";
import Router from 'koa-router';

const router = new Router();

router
  .all('/api/proxies', (ctx) => api.proxy_list(ctx))

  .all('/', async (ctx, next) => {
    await ctx.redirect('/');
    return next();
  })

export { router }