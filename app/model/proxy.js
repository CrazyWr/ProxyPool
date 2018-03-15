import mongoose from 'mongoose';
import logger from '../logger';

mongoose.Promise = global.Promise;
var schema = mongoose.Schema;

class Proxy {

  constructor(proxy, source_url, summary='', description='') {
    this.proxy = proxy;
    this.source_url = source_url;
    this.summary = summary;
    this.description = description;
    this.modify_date = new Date().toLocaleString();
    this.test_date = '';
    this.test_count = 0;
    this.tested = false;
    this.delay = 0;
  }

  static schema() {
    return new schema({
      proxy: String,
      source_url : String,
      description: String,
      summary: String,
      modify_date: String,
      test_date: String,
      tested: Boolean,
      test_count: Number,
      delay: Number
    }, {versionKey: false})
  }

  static model() {
    const str = 'Proxy';
    if(mongoose.models[str]) return mongoose.models[str];
    return mongoose.model('Proxy', Proxy.schema());
  }

  static update(model) {
    if (!model || !model.proxy) throw new Error('model / model.proxy is not undefined');

    Proxy.model().update({proxy: model.proxy}, model, {upsert: true})
      .catch((e) => {
        logger.error.error(e);
      })
  }

  static async find(options, limit = 10, skip = 0, sort) {
    return await Proxy.model().find(options).skip(skip).limit(limit).sort(sort);
  }

  static async findAll(options) {
    return await Proxy.model().find(options);
  }

  static remove(model) {
    if (!model || !model.proxy) throw new Error('model / model.proxy is not undefined');
    const { proxy } = model;
    Proxy.model().remove({proxy})
      .catch((e) => {
        logger.error.error(e);
      })
  }

  static async count(options) {
    return await Proxy.model().count(options);
  }

}

export { Proxy }