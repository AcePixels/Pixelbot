const { RichEmbed } = require('discord.js')

/**
 * A RichEmbed with the default fields already filled
 * @constructor
 * @param {User} [user] - The user that executed the command that resulted in this embed
 * @param {object} [data] - Data to set in the rich embed
 */
module.exports = class SlayBotEmbed extends RichEmbed {
  constructor (user, data = {}) {
    super(data)
    this.setColor(process.env.EMBED_COLOR).setTimestamp()
    if (user) this.setFooter(user.tag)
  }

  /**
   * Sets the description of this embed based on an array of arrays of strings
   * @param {Array<Array>} Array containing arrays (blocks) of and strings
   * @returns {SlayBotEmbed}
   */
  setDescriptionFromBlockArray (blocks) {
    this.description = blocks.map(lines => lines.filter(l => !!l).join('\n')).filter(b => !!b.length).join('\n\n')
    return this
  }
}
