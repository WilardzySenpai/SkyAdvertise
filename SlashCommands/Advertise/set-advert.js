const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const ee = require('../../config.json');

module.exports = {
  name: 'set-advertise',
  description: 'Set advertisement channel',
  options: [
    {
      name: 'channel',
      description: 'Advertisement channel',
      type: 'CHANNEL',
      require: true
    }
  ],
  run: async(client, interaction, args) => {
    if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({ content: "You don't have **ADMIN** to use this command.", ephemeral: true })
    
    let advertChannel = interaction.options.getChannel('channel')

        let channelEmbed = new MessageEmbed()
        .setAuthor({ name: 'Advertisement Settings >> Channels', iconURL: interaction.guild.iconURL()})
        .setDescription(`${interaction.user}, you have successfully set the advertisement channel to ${advertChannel}`)
        .setColor(ee.color)
        db.set(`advertChannels_${interaction.guild.id}`, advertChannel.id)
        interaction.reply({ embeds: [channelEmbed], ephemeral: true })


    }
}