const { Command, SlayBotEmbed, Constants } = require('../../')

module.exports = class Bio extends Command {
  constructor (client) {
    super({
      name: 'bio',
      aliases: ['personaltext', 'profiletext', 'description', 'aboutme'],
      category: 'social',
      requirements: { databaseOnly: true },
      parameters: [{
        type: 'string',
        full: true,
        missingError: 'commands:bio.noText'
      }]
    }, client)
  }

  async run ({ t, author, channel }, text) {
    const embed = new SlayBotEmbed(author)
    

    const socialController = this.client.controllers.social
    try {
      await socialController.setbio(author.id, text)
      embed.setTitle(t('commands:bio.changedSuccessfully'))
        .setDescription(text)
    } catch (e) {
      embed.setColor(Constants.ERROR_COLOR)
      switch (e.message) {
        case 'TEXT_LENGTH':
          embed.setTitle(t('commands:bio.tooLongText', { limit: socialController.PERSONAL_TEXT_LIMIT }))
          break
        default:
          embed.setTitle(t('errors:generic'))
      }
    }

    channel.send(embed)
  }
}
