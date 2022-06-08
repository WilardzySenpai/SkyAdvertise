const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const ee = require('../../config.json');
const Topgg = require('@top-gg/sdk')
const topgg = new Topgg.Api(process.env.TOPGG)

module.exports = {
  name: 'advertise',
  description: 'Send a Advertisement! use the /check first!!!',
  timeout: 9800000,
  options: [
    {
      name: 'title',
      description: 'Title of your advertisement',
      type: 'STRING',
      required: true
    },
    {
      name: 'write',
      description: 'Description about your advert',
      type: 'STRING',
      required: true
    },
    {
      name: 'link_1',
      description: 'Your Links',
      type: 'STRING',
      required: true
    },
    {
      name: 'link_2',
      description: 'Your Links',
      type: 'STRING',
      required: true
    },
    {
      name: 'link_3',
      description: 'Need more links?',
      type: 'STRING',
      required: false
    },
    {
      name: 'color',
      description: 'Custom Color? ex. BLUE/#0000FF',
      type: 'STRING',
      required: false
    },
    {
      name: 'image',
      description: 'Set Image',
      type: 'STRING',
      required: false
    }
  ],
  run: async(client, interaction, args) => {

    let title = interaction.options.getString('title')
    let write = interaction.options.getString('write')
    let link_1 = interaction.options.getString('link_1')
    let link_2 = interaction.options.getString('link_2')
    let link_3 = interaction.options.getString('link_3') || "That's all the important links";
    let color = interaction.options.getString('color') || `${ee.color}`;
    let image = interaction.options.getString('image') || `https://i.imgur.com/cFtB3t4.gif`;
    let voted = await topgg.hasVoted(interaction.user.id)

    if (!voted) {
      return interaction.reply({ content: "You haven't vote to Nino yet! Vote here: https://top.gg/bot/975028020198928404/vote"})
    }
    if(interaction.guild) { 
      let channelData = db.get(`advertChannels_${interaction.guild.id}`)

      let consuc = new MessageEmbed()
        .setAuthor({ name:`${interaction.guild} >> Advertisement Sent!`, iconURL: interaction.guild.iconURL()}) 
        .setDescription(`${interaction.user}, your advertisement has sent to <#${channelData}> successfully!`)
        .setColor(ee.color)
      interaction.reply({ embeds: [consuc ], ephemeral: true })
      
        let postMessage = new MessageEmbed()
          .setAuthor({ name: `${interaction.user.username} Advertisement`, iconURL: interaction.user.displayAvatarURL()})
          .setTitle(`${title}`)
          .setDescription(`${write}`)
          .addField('Important Links!', `${link_1}\n${link_2}\n${link_3}`, true)
          .setFooter({ text: `Type "/advertise" to send a advertisement`, iconURL: client.user.displayAvatarURL()})
          .setColor(`${color}`)
          .setImage(`${image}`)
          .setTimestamp()
          client.channels.cache.get(channelData).send({ embeds: [postMessage] })
    }
  }
}