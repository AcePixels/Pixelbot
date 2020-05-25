const { Command, SlayBotEmbed, MiscUtils } = require('../..')
const Discord = require('discord.js')
const moment = require('moment')

module.exports = class Uptime extends Command {
  constructor (client) {
    super({
      name: 'uptime',
      category: 'bot'
    }, client)
  }

  run ({ channel, author, t, language }) {
    const uptime = moment.duration(process.uptime() * 1000).format('d[d] h[h] m[m] s[s]')
    channel.send(
      new SlayBotEmbed(author)
        .setDescription([
          t('commands:uptime.uptimeDesc', { uptime })
        ])
    )
  }
}
