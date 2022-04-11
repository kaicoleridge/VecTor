const { Client, Intents } = require("discord.js");
const config = require("./config.json")

let prefix = ">"

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});



 //CHECK IF THE BOT IS ONLINE AND SETTING BOT STATUS PRESENCE
client.once('ready', () => {
    console.log(`Vector is alive and logged in as ${client.user.tag}`);
    client.user.setActivity('>help', { type: "LISTENING"},)
});

client.on("messageCreate", message => {
    if (message.content.startsWith(prefix + "ping")) {
        message.channel.send("pong!");
    }
})


// DISCORD BOT TOKEN FOR ACTIVE DISCORD CONNECTION
client.login(config.BOT_TOKEN);