const { Command, SlayBotEmbed, Constants } = require('../../')

module.exports = class reloadlocales extends Command {
  constructor (client) {
    super({
      name: 'reloadlocales',
      category: 'developers',
      hidden: true,
      requirements: { managersOnly: true }
    }, client)
  }

  async run ({ t, channel, author }) {
    
    const embed = new SlayBotEmbed(author)
    try {
      this.client.downloadAndInitializeLocales('src/locales').then(() => {
        embed
          .setTitle(t('commands:reloadlocales:reloaded'))
        channel.send(embed)
      })
    } catch (e) {
      embed
        .setColor(Constants.ERROR_COLOR)
        .setTitle(t('errors:generic'))
      channel.send(embed)
    }
  }
}
