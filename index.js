const { Client, Collection } = require("discord.js");
const Discord = require('discord.js');
require("./ads");
require('dotenv').config()

const client = new Client({
    intents: 32767,
     ws: { properties: { $browser: "discord.js" } }
   //ws: { properties: { $browser: "Discord iOS" } }
});
module.exports = client;

// Global Variables
client.slashCommands = new Collection();
client.aliases = new Collection();
client.coolwdown = new Collection();
client.timeouts = new Discord.Collection();

// Initializing the project
require("./handler")(client);

//anticrash
process.on('unhandledRejection', (reason, p) => {
        console.log("UnhandledRejection Error");
        console.log(reason, p);
    })
process.on('uncaughtException', (reason, origin) => {
        console.log("UnhandledException Error");
        console.log(reason, origin);
    })
process.on('uncaughtExceptionMonitor', (reason, origin) => {
        console.log("uncaughtExceptionMonitor Error");
        console.log(reason, origin);
    })
process.on('multipleResolves', (type, promise, reson) => {
        console.log("multipleResolves Error");
        console.log(type, promise, reson);
    })

client.login(process.env.TOKEN);