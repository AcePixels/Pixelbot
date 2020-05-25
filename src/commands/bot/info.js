const { Command, SlayBotEmbed, MiscUtils } = require('../..')
const Discord = require('discord.js')
const moment = require('moment')

module.exports = class Info extends Command {
  constructor (client) {
    super({
      name: 'info',
      aliases: ['botinfo', 'binfo'],
      category: 'bot'
    }, client)
  }

  run ({ channel, author, t, language }) {
    const uptime = moment.duration(process.uptime() * 1000).format('d[d] h[h] m[m] s[s]')
    channel.send(
      new SlayBotEmbed(author)
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
        .setThumbnail(this.client.user.displayAvatarURL)
        .setDescription([
          t('commands:info.hello', { user: this.client.user }),
          t('commands:info.statistics', { guilds: MiscUtils.formatNumber(this.client.guilds.size, language), commands: MiscUtils.formatNumber(this.client.commands.length, language), uptime, Discord, nodeVersion: process.version, users: MiscUtils.formatNumber(this.client.users.filter(u => !u.bot).size, language) })
        ].join('\n\n'))
        .addField(t('commands:info.links'), [
          t('commands:info.inviteLink', { botBadge: this.getEmoji('botBadge') }),
          t('commands:info.supportServer', { discordLogo: this.getEmoji('discordLogo') }),
          t('commands:info.website', { SlayBotLogo: this.getEmoji('SlayBot') }),
          t('commands:info.github', { githubLogo: this.getEmoji('githubLogo') }),
        ].join('\n'))
    )
  }
}
