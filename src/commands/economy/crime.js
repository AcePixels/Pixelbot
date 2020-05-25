const { Command, SlayBotEmbed, Constants } = require('../../')

module.exports = class Crime extends Command {
  constructor (client) {
    super({
      name: 'crime',
      category: 'economy',
      requirements: { databaseOnly: true }
    }, client)
  }

  async run ({ t, author, channel }) {
    const embed = new SlayBotEmbed(author)
    

    try {
      const { collectedMoney } = await this.client.controllers.economy.crimebonus.claimCrime(author.id)
      embed.setDescription(t('commands:crime.claimedSuccessfully', { count: collectedMoney }))
    } catch (e) {
      embed.setColor(Constants.ERROR_COLOR)
      switch (e.message) {
        case 'ALREADY_CLAIMED':
          embed.setTitle(t('commands:crime.alreadyClaimedTitle'))
            .setDescription(t('commands:crime.alreadyClaimedDescription', { time: e.CrimeformattedCooldown }))
          break
        default:
          embed.setTitle(t('errors:generic'))
      }
    }

    channel.send(embed)
  }
}
