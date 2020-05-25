const { Command, SlayBotEmbed } = require('../../')

module.exports = class Ping extends Command {
  constructor (client) {
    super({
      name: 'ping',
      category: 'bot'
    }, client)
  }

  async run ({ t, channel, message }) {
        const m = await message.channel.send(t('commands:ping.loading'));
       
      const embed = new SlayBotEmbed()
      .setDescription(`${t('commands:ping.sblatency')}: \`${m.createdTimestamp - message.createdTimestamp}ms\`\n${t('commands:ping.apilatency')}: \`${Math.ceil(this.client.ping)}ms\``)
    m.edit(embed)
  }
}
