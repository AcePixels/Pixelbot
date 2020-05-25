const { Command, SlayBotEmbed, Constants } = require('../..')
const { get } = require("axios");
const { flag } = require("country-emoji");

module.exports = class Coronavirus extends Command {
  constructor (client) {
    super({
      name: 'coronavirus',
      aliases: ['covid19', 'corona', 'covid'],
      category: 'coronavirus'
    }, client)
  }

  async run ({ t, author, channel, country }, question) {
    if (!country) {
        let msg = await channel.send(t('commands:coronavirus.loading'));
        let response = await get("https://covid2019-api.herokuapp.com/current_list/");
        let response1 = await get("https://covid2019-api.herokuapp.com/total");
        let embed = new SlayBotEmbed()
          .setTitle(t('commands:coronavirus.title'))
          .setDescription(`${response1.data.confirmed} ${t('commands:coronavirus.confirmed')}, ${response1.data.deaths} ${t('commands:coronavirus.deaths')} ${response1.data.recovered} ${t('commands:coronavirus.recovered')}`)
          .setURL(
            "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"
          )
          .setColor("#FF0000")
          .setFooter(
            `Top 25 countries.`
          );
        let i = 0;
        for (let [key, value] of Object.entries(response.data.countries[0])) {
          i++;
          if (i >= 25) {
            break; // Limit fields so that discord doesn't complain about a too big embed.
          }
          let name = key.replace(/_/g, " ");
          // custom filters for stuff not included in country-emoji
          if (name === "Cruise Ship") {
            name = `⛵ Cruise Ship\n`;
            return;
          } else if (name === "Cabo Verde") {
            name = `🇨🇻 Cabo Verde\n`;
            return;
          }
          embed.addField(
            `${flag(name) || ""} ${name}`,
            `${t('commands:coronavirus.cases')}: ${value.confirmed}\n${t('commands:coronavirus.recovered2')}: ${value.recovered}\n${t('commands:coronavirus.deaths2')}: ${value.deaths}`,
            true
          );
        }
        msg.edit("", embed);
      } 
  }
}
