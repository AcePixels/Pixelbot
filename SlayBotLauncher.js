const Sentry = require('@sentry/node');
Sentry.init({ dsn: process.env.SENTRY_DSN });

// Initialize functions
const { readFileSync } = require('fs')

require('moment')
require('moment-duration-format')

// Initialize Canvas
let canvasLoaded = false
try {
  require('canvas')
  require('./src/utils/CanvasUtils.js').initializeHelpers()
  canvasLoaded = true
} catch (e) {}

// Initialize client
const CLIENT_OPTIONS = {
  fetchAllMembers: true,
  enableEveryone: false,
  canvasLoaded
}

console.log(readFileSync('bigtitle.txt', 'utf8').toString())

const SlayBot = require('./src/SlayBot.js')
const client = new SlayBot(CLIENT_OPTIONS, Sentry)
client.login()
  .then(() => client.log('Logged in successfully!', { color: 'green', tags: ['Discord'] }))
  .catch(client.logError)
