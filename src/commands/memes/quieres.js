const { CanvasTemplates, Command } = require('../../')

const { Attachment } = require('discord.js')

module.exports = class Quieres extends Command {
  constructor (client) {
    super({
      name: 'quieres',
      aliases: ['bufa'],
      category: 'images',
      requirements: { canvasOnly: true },
      parameters: [{
        type: 'image',
        missingError: 'commands:quieres.missingImage'
      }]
    }, client)
  }

  async run ({ t, author, channel }, image) {
    
    const quieres = await CanvasTemplates.quieres(image)
    channel.send(new Attachment(quieres, 'quieres.jpg'))
  }
}
