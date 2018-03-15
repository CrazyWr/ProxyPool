'use strict';

function log(logger) {
  return async (ctx, next) => {
    const startTime = new Date();

    const agent = ctx.get('User-Agent');
    logger.api.info(JSON.stringify({ agent, req: ctx, event: 'request' }));

    await next();

    ctx.responseTime = new Date() - startTime;
    logger.api.info(JSON.stringify({ res: ctx, event: 'response' }));
  };
}

export {
  log
};