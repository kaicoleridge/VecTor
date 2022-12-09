// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const {Client, Events, GatewayIntentBits, Collection, ActivityType} = require('discord.js');
const {token} = require('./config.json');
const {filteredWords} = require('./config.json');


// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});

client.commands = new Collection();
const user = client.users.cache.get('user id');
const userMap = new Map([['user', user]]);
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// executes commands in commands directory
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

// executes event files
for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.on('guildMemberAdd', member => {
    var role = member.guild.roles.cache.find(role => role.name === 'Member');
    member.roles.add(role);
});




client.once(Events.ClientReady, c => {
    client.user.setActivity({
        name: '/help',
        type: ActivityType.Listening,
    });

});


// detect messages for profanity // offensive words
client.on('messageCreate', message => {
    const logChannel = client.channels.cache.get('1045417263546773526');
    const user = message.author;


    let detected = false;
    filteredWords.forEach(word => {
        if (message.content.toLowerCase().includes(word)) {
            detected = true;

        }
    });




    if (detected) {
        if (userMap.has(user.id)) {
            userMap.set(user.id, userMap.get(user.id) + 1);
        } else {
            userMap.set(user.id, 1);
        }


        console.log(userMap.get(user.id));
        message.delete();
        message.channel.send(`${message.author} ⚠️ Your message contained a word that is not allowed in this server. You have been warned.`);
        message.author.send(`${message.author}` + " \n" + "**👮 AUTO MODERATION**" + "\n" + "\n" + "⚠️ We detected a word that is not allowed in this server. You will be banned automatically after 3 offences " + "\n\n" + "Word detected: " + "**" + message.content + "**");
        logChannel.send(`A message was deleted in ${message.channel} by ${message.author} because it contained a filtered word.`);

        // ban user if they have 3 warnings
        if (userMap.get(user.id) === 3) {
            const reason = message.member.ban({
                reason: 'Breaking server rules'
            });
            logChannel.send(`${message.author} was **banned** from the server for ${reason}.`);

        }


    }


});



// When slash command is executed check if it exists and execute it
client.on(Events.InteractionCreate, interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        command.execute(interaction);
    } catch (error) {
        console.error(error);
        interaction.reply({
            content: 'There was an error while executing this command!',
            ephemeral: true
        });
    }



    console.log(interaction);

});




// Log in to Discord with your client's token
client.login(token);
