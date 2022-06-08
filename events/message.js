const { Client, Collection } = require('discord.js');
const client = require('../index');

client.on("message", function (message) {
    console.log(`message is created -> ${message}`);
});
