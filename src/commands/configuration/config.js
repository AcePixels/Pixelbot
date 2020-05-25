const { Command, SlayBotEmbed } = require('../../')

module.exports = class Config extends Command {
  constructor (client) {
    super({
      name: 'config',
      aliases: ['cfg'],
      category: 'configuration',
      requirements: { guildOnly: true, databaseOnly: true, permissions: ['MANAGE_GUILD'] }
    }, client)
  }

  run ({ t, author, prefix, alias, channel }) {
    const embed = new SlayBotEmbed(author)
    embed.setDescription([
      t('commands:config.guildPrefix', { command: `${prefix}` }),
      t('commands:config.guildLang', { command: `${prefix}` })
    ].join('\n'))
    channel.send(embed)
  }
}
