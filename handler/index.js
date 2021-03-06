const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const Ascii = require('ascii-table');

const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    // Events
    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    eventFiles.map((value) => require(value));

    // Slash Commands

    const Table_slash = new Ascii(`SlashCommands Loaded`)

    const slashCommands = await globPromise(
        `${process.cwd()}/SlashCommands/*/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        arrayOfSlashCommands.push(file);

        if (!file.name) 
            return Table_slash.addRow(file.name,`❌ ERROR IN COMMAND NAME(NAME)`)
        if (!file.description)
            return Table_slash.addRow(file.name,`❌ ERROR IN DISTRIBUTION(DESCRIPTION)`)

        Table_slash.addRow(file.name,`✅ SUCCESS`)
    });

    console.log(Table_slash.toString())
    client.on("ready", async () => {
        // Register for all the guilds the bot is in
        await client.guilds.cache
            .get("YOUR_GUILD_ID")
        .commands.set(arrayOfSlashCommands);
    });
};
