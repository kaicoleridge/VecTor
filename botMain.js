const { Client, Intents, Collection, MessageEmbed} = require("discord.js");
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

const prefix = config.PREFIX;

//FIND ALL FILES IN THE COMMANDS FOLDER 
client.commands = new Collection();
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./src/commands/${file}`);
    client.commands.set(command.name, command);
}




 //CHECK IF THE BOT IS ONLINE AND SETTING BOT STATUS PRESENCE
client.once('ready', () =>  {
    console.log(`💜 Vector is online and logged in as ${client.user.tag}`);
    client.user.setActivity('>help', { type: "LISTENING"},)
});




//SEND PRIVATE DM TO USER ON JOIN
client.on('guildMemberAdd', member => {
    const welcomeEmbed = new MessageEmbed()
    .setAuthor(member.user.tag, member.user.displayAvatarURL())
    .setTitle('👋 Welcome to the NUM Discord Server!')
    .setDescription("Hello there. Thank you for joining the NUM Discord Server! Glad you're here :)")
    .addFields(
        {name: "📜 Rules", value: "Please read the rules before you start using the server! Rules can be found in the **#rules** channel!"},
        {name: "😊 Introudce yourself", value: "Head over to the **#introduce-yourself** channel to introduce yourself and get to know the server!"},
    )
    .setColor('#4c31e8')
    .setImage('attachment://welcome.png')
    .setTimestamp()
    member.send({ embeds: [welcomeEmbed], files: ['./imgs/welcome.png'] });
});

//AUTO ASSIGN ROLE ON JOIN
client.on('guildMemberAdd', member => {
    const assignRole = member.guild.roles.cache.find(role => role.name === "Member");
    if(!assignRole) return console.log("No role found to be assigned"); else
    member.roles.add(assignRole);   //ADD ROLE TO NEW USER
});



// detect if message contains discord.gg link
client.on('message', async message => {
    if(message.author.bot) return;
    if(message.content.includes("discord.gg")){
        message.delete();
        const warnEmbed = new MessageEmbed()
        .setTitle('⚠️ Warning!')
        .setDescription('You have been warned for advertising other Discord Servers!')
        .addField('Reason', 'Advertising other Discord Servers')
        .setColor('#ff0000')
        .setTimestamp()
        message.author.send({embeds: [warnEmbed]});
        message.channel.send(`${message.author} Please do not advertise other servers! You have been warned!`);
        } 
   // client.channels.cache.get('960689051155968070').send(`**Member Warned**: ${message.author} 
    
   // **REASON**: Advertising other servers in ${message.channel}`);
    
});

// DETECT IF MESSAGE CONTAINS OFFENSIVE WORDS
client.on('message', async message => {
    let blacklisted = ["NIGGER", "NIGGA", "NIG", "NIGG", "FAGGOT", "CUNT"]
    if(message.author.bot) return;
    for(var i in blacklisted){
        if(message.content.includes(blacklisted[i].toLowerCase())){
            message.delete();

            
        
        const bannedEmbed = new MessageEmbed()
            .setTitle('⛔ Temporary Banned')
            .setDescription('You have been temporary banned for using offensive language!')
            .addField('📝 Reason', 'Offensive Language')
            .addField('⌛ Ban Length', '5 Minutes')
            .addField('👮 Moderator', 'VecTor')
            .setColor('#ff0000')
            .setTimestamp()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            message.author.send({embeds: [bannedEmbed]});
        }
    }
   
    
});



//checks if command exists // error checking for commands
client.on("messageCreate", message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if(!client.commands.has(commandName)) 
    return message.reply(`${message.member.user.tag} 🤦 DOH! That command doesn't exist! https://i.gifer.com/9nCX.gif`)
    .then(msg => {
        setTimeout(() => msg.delete(), 3000)
      })
      .catch("Error deleting message");
  

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


