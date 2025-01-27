const { Command, CommandError, SlayBotEmbed } = require('../../')

const fetch = require('node-fetch')

module.exports = class NumberFacts extends Command {
  constructor (client) {
    super({
      name: 'numberfacts',
      aliases: ['number', 'numfacts', 'numf'],
      parameters: [{
        type: 'number', min: 0, missingError: 'commands:numberfacts.validNumber'
      }]
    }, client)
  }

  async run ({ t, author, channel }, number) {
    const embed = new SlayBotEmbed(author)
    
    try {
      const body = await fetch(`http://numbersapi.com/${number}/trivia`).then(res => res.json())
      embed.setTitle(body)
      channel.send(embed)
    } catch (e) {
      throw new CommandError(t('commands:numberfacts.validNumber'))
    }
  }
}
