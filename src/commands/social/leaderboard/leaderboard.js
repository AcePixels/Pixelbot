const { Command, SlayBotEmbed } = require('../../../')

module.exports = class Leaderboard extends Command {
  constructor (client) {
    super({
      name: 'leaderboard',
      aliases: ['top', 'ranking'],
      category: 'social',
      requirements: { databaseOnly: true, canvasOnly: true }
    }, client)
  }

  async run ({ t, author, prefix, alias, channel }) {
    const embed = new SlayBotEmbed(author)
    embed.setDescription(this.subcommands.map(subcmd => {
      return `**${prefix}${subcmd.fullName}** - ${t(`commands:${subcmd.tPath}.commandDescription`)}`
    }).join('\n'))
    channel.send(embed)
  }
}
