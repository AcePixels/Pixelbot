const { Command, SlayBotEmbed } = require('../../')

module.exports = class Support extends Command {
  constructor (client) {
    super({
      name: 'support',
      category: 'bot'
    }, client)
  }

  async run ({ t, channel }) {
    channel.send(
      new SlayBotEmbed()
        .setDescription(`${t('commands:support.clickHere')}`)
        //${this.getEmoji('discordLogo')}
    )
  }
}
