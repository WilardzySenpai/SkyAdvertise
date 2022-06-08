const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const ee = require('../../config.json');
const Topgg = require('@top-gg/sdk')
const topgg = new Topgg.Api(process.env.TOPGG)

module.exports = {
  name: 'check',
  description: 'Check if you can advertise!',
  timeout: 10000,
  run: async(client, interaction, args) => {

    let voted = await topgg.hasVoted(interaction.user.id)
    
    if (!voted) {
      return interaction.reply({ content: `${interaction.user} Nope, you cant do advertisement yet Vote to Nino first! Vote here: https://top.gg/bot/975028020198928404/vote`})
    }
        let postMessage = new MessageEmbed()
          .setAuthor({ name: `Voting For NinoMusic`, iconURL: client.user.displayAvatarURL()})
          .setFooter({ text: `Thank you for voting!`, iconURL: client.user.displayAvatarURL()})
          .setColor(ee.color)
          .setImage(`https://i.imgur.com/78Exe9z.png`)
          .setTimestamp()
    interaction.reply({ embeds: [postMessage], content: `${interaction.user} you can now use **/advertise**` })
  }
}