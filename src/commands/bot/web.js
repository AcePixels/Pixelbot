const { Command, SlayBotEmbed } = require('../../')

module.exports = class Web extends Command {
  constructor (client) {
    super({
      name: 'web',
      category: 'bot'
    }, client)
  }

  async run ({ t, channel }) {
    channel.send(
      new SlayBotEmbed()
        .setDescription(`${t('commands:web.webDesc')}`)
        //${this.getEmoji('discordLogo')}
    )
  }
}
