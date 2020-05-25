const { Command, SlayBotEmbed } = require('../../')

module.exports = class Adorable extends Command {
  constructor (client) {
    super({
      name: 'adorable'
    }, client)
  }

  run ({ author, channel }) {
    const embed = new SlayBotEmbed(author)
    const template = 'https://api.adorable.io/avatars/256'
    
    embed.setImage(`${template}/${author.avatar}.png`)
    channel.send(embed)
  }
}
