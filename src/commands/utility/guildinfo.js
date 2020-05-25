const { Command, SlayBotEmbed, MiscUtils } = require('../../')
const moment = require('moment')

module.exports = class GuildInfo extends Command {
  constructor (client) {
    super({
      name: 'guildinfo',
      aliases: ['serverinfo', 'server', 'guild', 'si', 'gi', 'sinfo', 'ginfo'],
      category: 'utility',
      requirements: { guildOnly: true },
      parameters: [{
        type: 'guild',
        full: true,
        required: false
      }]
    }, client)
  }

  run ({ t, author, channel, language }, guild = channel.guild) {
    const embed = new SlayBotEmbed(author)
    moment.locale(language)
    
    embed.setTitle(guild.name)
      .setThumbnail(guild.iconURL ? guild.iconURL : `https://guild-default-icon.herokuapp.com/${guild.nameAcronym}`)
      .addField(t('commands:guildinfo.id'), guild.id, true)
      .addField(t('commands:guildinfo.owner'), guild.owner, true)
      .addField(t('commands:guildinfo.region'), t(`regions:${guild.region}`), true)
      .addField(t('commands:guildinfo.channels', { count: MiscUtils.formatNumber(guild.channels.size, language) }), [
        t('commands:guildinfo.textChannels', { count: MiscUtils.formatNumber(guild.channels.filter(g => g.type === 'text' || g.type === 'category').size, language) }),
        t('commands:guildinfo.voiceChannels', { count: MiscUtils.formatNumber(guild.channels.filter(g => g.type === 'voice').size, language) })
      ].join('\n'), true)
      .addField(t('commands:guildinfo.createdAt'), `${moment(guild.createdTimestamp).format('LLL')}\n(${moment(guild.createdTimestamp).fromNow()})`, true)
      .addField(t('commands:guildinfo.joinedAt'), `${moment(guild.joinedTimestamp).format('LLL')}\n(${moment(guild.joinedTimestamp).fromNow()})`, true)
      .addField(t('commands:guildinfo.members', { count: MiscUtils.formatNumber(guild.members.size, language) }), [
        `<:streaming:703604785126834197> ${t('commands:guildinfo.streaming', { count: MiscUtils.formatNumber(guild.members.filter(m => m.game === 'streaming').size, language) })}`,
        `<:online:703601131451842640> ${t('commands:guildinfo.online', { count: MiscUtils.formatNumber(guild.members.filter(m => m.presence.status === 'online').size, language) })}`,
        `<:idle:703601130898194472> ${t('commands:guildinfo.idle', { count: MiscUtils.formatNumber(guild.members.filter(m => m.presence.status === 'idle').size, language) })}`,
        `<:dnd:703601130889805844> ${t('commands:guildinfo.dnd', { count: MiscUtils.formatNumber(guild.members.filter(m => m.presence.status === 'dnd').size, language) })}`,
        `<:offline:703601130638147606> ${t('commands:guildinfo.offline', { count: MiscUtils.formatNumber(guild.members.filter(m => m.presence.status === 'offline').size, language) })}\n`,
        t('commands:guildinfo.users', { count: MiscUtils.formatNumber(guild.members.filter(m => !m.user.bot).size, language) }),
        t('commands:guildinfo.bots', { count: MiscUtils.formatNumber(guild.members.filter(m => m.user.bot).size, language) })
      ].join('\n'))

    channel.send(embed)
  }
}
