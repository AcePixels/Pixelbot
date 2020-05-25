const { Command, SlayBotEmbed, Constants } = require('../../')

module.exports = class Work extends Command {
  constructor (client) {
    super({
      name: 'work',
      category: 'economy',
      requirements: { databaseOnly: true }
    }, client)
  }

  async run ({ t, author, channel }) {
    const embed = new SlayBotEmbed(author)
    
    const answerCount = 15
    const result = Math.floor((Math.random() * answerCount))
    try {
      const { collectedMoney } = await this.client.controllers.economy.workbonus.claimWork(author.id)
      embed
        .setDescription(t(`commands:work.answers.${result}`, { count: collectedMoney }))
    } catch (e) {
      embed.setColor(Constants.ERROR_COLOR)
      switch (e.message) {
        case 'ALREADY_CLAIMED':
          embed.setTitle(t('commands:work.alreadyClaimedTitle'))
            .setDescription(t('commands:work.alreadyClaimedDescription', { time: e.WorkformattedCooldown }))
          break
        default:
          embed.setTitle(t('errors:generic'))
      }
    }

    channel.send(embed)
  }
}
