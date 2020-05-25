const DBWrapper = require('../DBWrapper.js')
const { GuildRepository, UserRepository } = require('./repositories')
const promiseRetry = require('promise-retry')

const mongoose = require('mongoose')

class MongoDB extends DBWrapper {
  constructor (options = {}) {
    super(options)
    this.mongoose = mongoose
  }

  async connect () {
    const options = {
      useNewUrlParser: true,
      reconnectTries: 60,
      reconnectInterval: 1000,
      poolSize: 10,
      bufferMaxEntries: 0
    }
    
    const promiseRetryOptions = {
      retries: options.reconnectTries,
      factor: 1.5,
      minTimeout: options.reconnectInterval,
      maxTimeout: 5000
    }

    return promiseRetry((retry, number) => {
      //put your mongodb database under this
      return mongoose.connect('database url here!', this.options).then((m) => {
        this.guilds = new GuildRepository(m)
        this.users = new UserRepository(m)
      })
    }, promiseRetryOptions)
  }
}

module.exports = MongoDB
