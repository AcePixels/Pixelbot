const { Command, SlayBotEmbed } = require('../../index')

module.exports = class ReverseText extends Command {
  constructor (client) {
    super({
      name: 'reversetext',
      category: 'memes',
      parameters: [{
        type: 'string', full: true, missingError: 'commands:reversetext.missingSentence'
      }]
    }, client)
  }

  async run ({ t, author, channel }, text) {
    channel.send(
      new SlayBotEmbed(author)
        .setDescription(text.split('').reverse().join(''))
    )
  }
}
