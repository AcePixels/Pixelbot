const { Command, CommandError, SlayBotEmbed } = require('../../../')

module.exports = class RestrictEmojiAdd extends Command {
  constructor (client) {
    super({
      name: 'add',
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
      await emoji.addRestrictedRole(role)
      channel.send(
        new SlayBotEmbed(author)
          .setTitle(t('commands:restrictemoji.subcommands.add.canUse', { role: role.name, emoji: emoji.name }))
      )
    } catch (e) {
      
      throw new CommandError(t('errors:generic'))
    }
  }
}
