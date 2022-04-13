const { Client, Intents, Collection, MessageEmbed} = require("discord.js");
const { Routes } = require('discord-api-types/v9');
const config = require(`${process.cwd()}/config.json`)
const fs = require("fs");



//DECLARING AND INITIALIZING INTENTS
const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
       
    ] 
})


//FIND ALL FILES IN THE COMMANDS FOLDER 
client.commands = new Collection();
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./src/commands/${file}`);
    client.commands.set(command.name, command);
}

//DECLARE PREFIX FOR BOT
let prefix = ">";

 //CHECK IF THE BOT IS ONLINE AND SETTING BOT STATUS PRESENCE
client.once('ready', () => {
    console.log(`Vector is alive and logged in as ${client.user.tag}`);
    client.user.setActivity('>help', { type: "LISTENING"},)
});

//SEND PRIVATE DM TO USER ON JOIN
client.on('guildMemberAdd', member => {
    const welcomeEmbed = new MessageEmbed()
    .setTitle('👋 Welcome to the NUM Discord Server!')
    .setDescription("Hello there. Thank you for joining the NUM Discord Server! Glad you're here :)")
    .addFields(
        {name: "📜 Rules", value: "Please read the rules before you start using the server! Rules can be found in the **#rules** channel!"},
    )
    .setColor('#4c31e8')
    .setImage('attachment://welcome.png')
    .setTimestamp()
    member.send({ embeds: [welcomeEmbed], files: ['./imgs/welcome.png'] });
});

//AUTO ASSIGN ROLE ON JOIN
client.on('guildMemberAdd', member => {
    const assignRole = member.guild.roles.cache.find(role => role.name === "Member");
    member.roles.add(assignRole);   
});


//checks if command exists // error checking for commands
client.on("messageCreate", message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if(!client.commands.has(commandName)) 
    return message.reply(`${message.member.user.tag} 🤦 DOH! That command doesn't exist! https://i.gifer.com/9nCX.gif`);

    const command = client.commands.get(commandName);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Sorry, I had trouble executing that command!');
    }
});


// DISCORD BOT TOKEN FOR ACTIVE DISCORD CONNECTION
client.login(config.BOT_TOKEN);