const { Route } = require('../..')
const { Router } = require('express')

module.exports = class Connections extends Route {
  constructor (client) {
    super({
      name: 'ping'
    }, client)
  }

  register (app) {
    const router = Router()

    router.get('/',
      async (req, res) => {
        try {
            res.status(200).json({ status: 'yo' })
        } catch (e) {
          console.error(e)
          res.status(500).json({ error: 'Internal server error' })
        }
      })

    app.use(this.path, router)
  }
}
