const { Command, SlayBotEmbed } = require('../../')

module.exports = class Avatar extends Command {
  constructor (client) {
    super({
      name: 'avatar',
      aliases: ['profilepicture', 'pfp'],
      category: 'utility',
      parameters: [{
        type: 'user',
        full: true,
        required: false,
        acceptBot: true
      }]
    }, client)
  }

  run ({ t, author, channel }, user) {
    const embed = new SlayBotEmbed(author)
    
    user = user || author
    embed.setImage(user.displayAvatarURL)
      .setDescription(t('commands:avatar.someonesAvatar', { user }))
    channel.send(embed)
  }
}
