const Command = require('./Command.js')
const SlayBotEmbed = require('../SlayBotEmbed.js')
const Reddit = require('../../utils/Reddit.js')
const Utils = require('../../utils')

module.exports = class RandomRedditPostCommand extends Command {
  constructor (opts = {}, client) {
    const options = Utils.createOptionHandler('RandomRedditPostCommand', opts)

    super(opts, client)

    this.embedColor = options.optional('embedColor')
    this.titleString = options.optional('titleString')
    this.addTitle = options.optional('addTitle', true)
    this.addPermalink = options.optional('addPermalink', true)
    this.subreddit = options.optional('subreddit', 'all')
  }

  // TODO: Check if the URL is an image type supported by reddit

  async run ({ channel, author, t }) {
    const { url, title, selftext, permalink } = await Reddit.getRandomPostFromSubreddit(`/r/${this.subreddit}`)
    channel.send(
      new SlayBotEmbed(author)
        .setImage(url)
    )
  }

  shortenTextIfTooBig (text) {
    return text.length > 2048 ? text.substr(0, 2045) + '...' : text
  }
}
