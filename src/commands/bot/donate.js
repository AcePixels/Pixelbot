const { Command, SlayBotEmbed } = require('../../')

module.exports = class Donate extends Command {
  constructor (client) {
    super({
      name: 'donate',
      category: 'bot'
    }, client)
  }

  async run ({ t, channel }) {
    channel.send(
      new SlayBotEmbed()
        .setDescription(`${t('commands:donate.statusDesc')}`)
        //${this.getEmoji('discordLogo')}
    )
  }
}
