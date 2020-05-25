const { Command, SlayBotEmbed } = require('../../')

module.exports = class Rules extends Command {
  constructor (client) {
    super({
      name: 'rules',
      category: 'developers',
      hidden: true,
      requirements: { devOnly: false },
    }, client)
  }

  async run ({ channel, author, t }) {
    const embed = new SlayBotEmbed(author)
    embed
      .setTitle("SlayBot - Server Rules")
      .setDescription(`
      1. Follow Discord's [Terms of Services](https://discord.com/terms) and [Community Guidelines](https://discord.com/guidelines). If we see you breaking the ToS, you will be reported to Discord.
      2. This is only English based server, so English is the primary language we all communicate in.
      3. Do not post any NSFW content outside of #nsfw channel.
      4. Use channels the way they are intended and for the reason they are intended.
      `)
    channel.send(embed)
  }
}
