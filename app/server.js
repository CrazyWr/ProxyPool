'use strict';

import { router } from "./router";
import { executeSchedule } from "./schedule";
// import { config, setting } from "../config/config.default";
import { logMiddleware } from './middleware'
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { connectMongodb } from "./extend/mongodb";
import logger from './logger';

const app = new Koa();

app.use(
  bodyParser({
    enableTypes: ['json', 'form'],
    formLimit: '10mb',
    jsonLimit: '10mb'
  })
);

app.use(logMiddleware(logger))

// app.use(
//   cors({
//     origin: '*',
//     allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
//     exposeHeaders: ['X-Request-Id']
//   })
// );

app.use(router.routes());

connectMongodb();
// 执行定时任务
executeSchedule();

export { app as server };
