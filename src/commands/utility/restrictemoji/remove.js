const { Command, CommandError, SlayBotEmbed } = require('../../../')

module.exports = class RestrictEmojiRemove extends Command {
  constructor (client) {
    super({
      name: 'remove',
      parent: 'restrictemoji',
      parameters: [{
        type: 'emoji',
        sameGuildOnly: true
      }, {
        type: 'role',
        full: true
      }]
    }, client)
  }

  async run ({ t, author, channel, guild }, emoji, role) {
    
    try {
      await emoji.removeRestrictedRole(role)
      channel.send(
        new SlayBotEmbed(author)
          .setTitle(t('commands:restrictemoji.subcommands.remove.cantUse', { role: role.name, emoji: emoji.name }))
      )
    } catch (e) {
      
      throw new CommandError(t('errors:generic'))
    }
  }
}
