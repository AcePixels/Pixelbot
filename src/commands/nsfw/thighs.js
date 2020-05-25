const { Command, SlayBotEmbed } = require('../../')
const superagent = require('superagent')

module.exports = class Thighs extends Command {
  constructor (client) {
    super({
      name: 'thighs',
      category: 'nsfw',
      requirements: { nsfwOnly: true }
    }, client)
  }
  async run ({ channel, author, t }) {
    superagent.get('https://nekobot.xyz/api/image')
    .query({ type: 'thigh'})
    .end((err, response) => {
      channel.send(
        new SlayBotEmbed(author)
          .setImage(response.body.message)
      )
  });
  }
}