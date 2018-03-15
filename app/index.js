import { config } from '../config/config.default'
import { server } from './server'
import logger from './logger'

const port = config.port || 9000
server.listen(port, () => {
  logger.out.info(` server started on ${port}`);
})
