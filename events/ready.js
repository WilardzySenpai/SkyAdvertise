const client = require("../index");

client.on("ready", () => {
    console.log("\x1b[34m%s\x1b[0m", `${client.user.tag} ready to work!`)
        client.user.setActivity(`Advertising and Supporting NinoMusic!`, {
            type: "STREAMING",
            url: "https://twitch.tv/wilardmv"
            //browser: "DISCORD IOS"
        })
})
