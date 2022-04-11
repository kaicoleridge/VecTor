const { Client, Intents, Collection, MessageEmbed} = require("discord.js");
const config = require("./config.json")
const fs = require("fs");


const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
  });


client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


//DECLARE PREFIX FOR BOT
let prefix = ">";
 //CHECK IF THE BOT IS ONLINE AND SETTING BOT STATUS PRESENCE
client.once('ready', () => {
    console.log(`Vector is alive and logged in as ${client.user.tag}`);
    client.user.setActivity('>help', { type: "LISTENING"},)
});



client.on("message", message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if(!client.commands.has(commandName)) 
    return message.reply(`${message.member.user.tag} 🤦 That command doesn't exist! Try again. https://i.gifer.com/9nCX.gif`);

    const command = client.commands.get(commandName);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Sorry, I had trouble executing that command!');
    }
})



// DISCORD BOT TOKEN FOR ACTIVE DISCORD CONNECTION
client.login(config.BOT_TOKEN);