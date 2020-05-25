const { Command, SlayBotEmbed } = require('../../')
const crypto = require('crypto')

module.exports = class Bug extends Command {
  constructor (client) {
    super({
      name: 'bug',
      category: 'bot',
      parameters: [{
        type: 'string', full: true, missingError: 'commands:bug.missingText'
      }]
    }, client)
  }

  async run ({ client, channel, message, author, t }, bug) {
    let id = crypto.randomBytes(5).toString('hex');
    const embed = new SlayBotEmbed()
    embed
      .setTitle(t('commands:bug.reportTitle'))
      .setDescription(`Reported by: ${message.member}\nReported a bug: ${bug}\nBug ID: ${id}`)

    const confirmation = new SlayBotEmbed()
    confirmation
      .setTitle(t('commands:bug.successTitle'))
      .setDescription(t('commands:bug.success'))
      .setFooter(`Bug Report ID: ${id}`)
      
    client.users.get("267386908382855169").send(embed).then(channel.send(confirmation))
  }
}
