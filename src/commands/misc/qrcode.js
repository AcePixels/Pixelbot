const { Command, SlayBotEmbed } = require('../../')

const types = ['generate', 'create', 'g', 'read', 'r']

module.exports = class QRCode extends Command {
  constructor (client) {
    super({
      name: 'qrcode',
      aliases: ['qr'],
      parameters: [{
        type: 'string',
        full: false,
        whitelist: types,
        missingError: ({ t, prefix }) => {
          return new SlayBotEmbed().setTitle(t('commons:search.noType'))
            .setDescription([
              this.usage(t, prefix),
              '',
              `__**${t('commons:search.types')}:**__`,
              `\`${['generate', 'read'].join('`, `')}\``
            ].join('\n'))
        }
      }]
    }, client)
  }
}
