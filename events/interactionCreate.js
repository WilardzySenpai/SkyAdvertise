const { Client, Collection } = require('discord.js');
const client = require('../index');
const ms = require('ms-prettify').default;

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const slashCommand = client.slashCommands.get(interaction.commandName);
    const t = client.timeouts.get(`${interaction.user.id}_${slashCommand.name}`) || 0;
  
  if (Date.now() - t < 0) return interaction.reply({ content: `You can use the command again after ${ms(t - Date.now(), { till: 'hour' })}` });
  client.timeouts.set(`${interaction.user.id}_${slashCommand.name}`, Date.now() + (slashCommand.timeout || 0));
  if(!slashCommand) return
  
    try{
        if (slashCommand) slashCommand.run(client, interaction)
    } catch (err) {
        if (err) console.error(err);
        await interaction.reply({ content: 'There was an error!', ephemeral: true })
    }
    if (slashCommand) {
      
    }
})