const { Command, SlayBotEmbed } = require('../../')

module.exports = class Status extends Command {
  constructor (client) {
    super({
      name: 'status',
      category: 'bot'
    }, client)
  }

  async run ({ t, channel }) {
    channel.send(
      new SlayBotEmbed()
        .setDescription(`${t('commands:status.statusDesc')}`)
        //${this.getEmoji('discordLogo')}
    )
  }
}
