import mongoose from 'mongoose'
import { config } from "../../config/config.default";

function getMongodbUrl() {
  const { host, port, username, password, name, mongo_url } = config.dbConfig.mongodb;
  if (mongo_url) return mongo_url;
  return `mongodb://${username}:${password}@${host}:${port}/${name}`;
}

const connectMongodb = () => {
  mongoose.connect(getMongodbUrl(), {
    useMongoClient: true,
    poolSize: 10
  }, (err) => {
    if(err) {
      console.log('connect to mongodb error', err);
      process.exit(1);
    } else {
      console.log('connect to mongodb success ', getMongodbUrl());
    }
  })

}

export {
  connectMongodb
}
