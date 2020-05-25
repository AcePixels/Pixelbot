const { Command, SlayBotEmbed } = require('../../')
const superagent = require('superagent')

module.exports = class Ass extends Command {
  constructor (client) {
    super({
      name: 'ass',
      category: 'nsfw',
      requirements: { nsfwOnly: true }
    }, client)
  }
  async run ({ channel, author, t }) {
    superagent.get('https://nekobot.xyz/api/image')
    .query({ type: 'ass'})
    .end((err, response) => {
      channel.send(
        new SlayBotEmbed(author)
          .setImage(response.body.message)
      )
  });
  }
}