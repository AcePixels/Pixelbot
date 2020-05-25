const { Command, SlayBotEmbed } = require('../../')

module.exports = class Purge extends Command {
  constructor (client) {
    super({
      name: 'purge',
      aliases: ['prune', 'erase', 'clear'],
      category: 'moderation',
      requirements: { guildOnly: true, botPermissions: ['MANAGE_MESSAGES'], permissions: ['MANAGE_MESSAGES'] },
      parameters: [{
        type: 'number',
        required: false,
        min: 1,
        max: 100,
        missingError: 'commands:purge.invalidNumber'
      }, {
        type: 'member', required: false, full: false, acceptSelf: true, acceptBot: true
      }]
    }, client)
  }

  async run ({ channel, guild, author, t }, number = 50, member) {
    
    const embed = new SlayBotEmbed(author)
    if (member) {
      channel.fetchMessages({ limit: number })
        .then(messages => {
          const userMessages = messages.filter(m => m.author.id === member.id)
          channel.bulkDelete(userMessages).then(() => {
            embed.setDescription(t(userMessages.size > 1 ? 'commands:purge.purgedMemberPlural' : 'commands:purge.purgedMemberSingular', { count: number, user: member.displayName }))
            channel.send(embed)
          }).catch(() => {
            return channel.send(new SlayBotEmbed()
              .setTitle(t('errors:generic')))
          })
        }).catch(() => {
          return channel.send(new SlayBotEmbed()
            .setTitle(t('errors:generic')))
        })
    } else {
      channel.bulkDelete(number).then(() => {
        embed.setDescription(t(number > 1 ? 'commands:purge.purgedPlural' : 'commands:purge.purgedSingular', { count: number }))
        channel.send(embed).then(msg => { msg.delete(3000)})
      }).catch(() => {
        return channel.send(new SlayBotEmbed()
          .setTitle(t('errors:generic')))
      })
    }
  }
}
