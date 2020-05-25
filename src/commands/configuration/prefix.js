const { Command, SlayBotEmbed, Constants } = require('../../')

module.exports = class ConfigPrefix extends Command {
  constructor (client) {
    super({
      name: 'prefix',
      category: 'configuration',
      requirements: { guildOnly: true, databaseOnly: true, permissions: ['MANAGE_GUILD'] },
      parameters: [{
        type: 'string',
        full: true,
        required: false,
        maxLength: 50,
        missingError: 'commands:prefix.noPrefix'
      }]
    }, client)
  }

  async run ({ t, author, channel, guild }, prefix = process.env.PREFIX) {
    const embed = new SlayBotEmbed(author)

    try {
      await this.client.modules.prefix.updateValues(guild.id, { prefix })
      embed.setTitle(t('commands:prefix.changedSuccessfully', { prefix }))
    } catch (e) {
      embed.setColor(Constants.ERROR_COLOR)
        .setTitle(t('errors:generic'))
    }

    channel.send(embed)
  }
}
