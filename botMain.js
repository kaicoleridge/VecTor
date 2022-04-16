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


client.on('message', message => {
    const welcomeGreetings = [
    "📢 LOUD AND CLEAR", 
    "🎤 Testing, Testing, 123.", 
    "Ready to serve!", 
    "What can I do for you? Start with``>help``"];
    "I'm here to help you! Type ``>help`` to see all my commands!"
    "I can do most things get started with ``>help``"
    const randomGreeting = welcomeGreetings[Math.floor(Math.random() * welcomeGreetings.length)];
    if(message.author.bot) return;
    if(message.mentions.users.has(client.user.id)){
        message.reply(`${randomGreeting}` + ` ${message.author}`);
    }

});
    

//SEND PRIVATE DM TO USER ON JOIN
client.on('guildMemberAdd', member => {
    if(!member.user.bot){
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

    }
   
});

//AUTO ASSIGN ROLE ON JOIN
client.on('guildMemberAdd', member => {
    const bot = member.user.bot;
    const botRole = member.guild.roles.cache.find(role => role.name === "Bots");

    if(!bot){
    const assignRole = member.guild.roles.cache.find(role => role.name === "Member");
    if(!assignRole) return console.log("No role found to be assigned"); else
    member.roles.add(assignRole);   //ADD ROLE TO NEW USER
    }

    if(bot){
        member.roles.add(botRole);
    }

   
});
    


// detect if message contains discord.gg link
client.on('message', async message => {
    if(message.author.bot) return;
    if(message.content.includes("discord.gg", "discordapp.com/invite", "discord.me", "discord.io", "discord.com/invite")){
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
/**client.on('message', async message => {
    let blacklisted = ["NIGGER", "NIGGA", "NIG", "NIGG", "FAGGOT", "CUNT"]
    let count = 0;
    if(message.author.bot) return;
    for(var i in blacklisted){
        if(message.content.includes(blacklisted[i].toLowerCase())){
            message.delete();
            count++;

           message.channel.send(`${message.author} Please do not use offensive words! Check your DM!`);
           console.log(count);
        
           break;
        }
            
           if(count === 2){
            count++;
               message.channel.send("⚠️ Warning! You have been warned for using offensive words! This is your last warning!");
           }

           if(count === 3){
            message.channel.send("NOOOOOOO");
        }

           
        
         
        const bannedEmbed = new MessageEmbed()
            .setTitle('⛔ WARNING!')
            .setDescription('You have been warned for using offensive language! This ')
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

/** */


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


