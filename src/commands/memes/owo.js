const { Command, SlayBotEmbed } = require('../../')

const Owoify = require('../../utils/Owoify')

module.exports = class OwO extends Command {
  constructor (client) {
    super({
      name: 'owo',
      aliases: ['uwu', 'whatsthis', 'owoify'],
      category: 'memes',
      parameters: [{
        type: 'string', full: true, missingError: 'commands:owo.missingSentence'
      }]
    }, client)
  }

  async run ({ author, channel }, text) {
    const embed = new SlayBotEmbed(author)
    
    embed.setDescription(Owoify(text))
    channel.send(embed)
  }
}
