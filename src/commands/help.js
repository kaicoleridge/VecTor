const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "help",
    description: "Shows all commands",
    execute(message, args) {
        const helpEmbed = new MessageEmbed()
        .setImage('attachment://help.png')
        .setColor('#4c31e8')
        .setTitle('Get help from VecTor')
        .setDescription("Here is a list of all current commands I can do! Pick a command below and see the magic I can perform! ✨")
        .addFields(
           {name: ">ping 🏓", value: "Test the bot's latency, to see if I'm working correcly!"},
           {name: ">invite 🔗", value: "Get the invite link to invite me to your server!"},
           {name: ">meme 🐸", value: "Get a random meme"},
           {name: ">coin :coin:", value: "flip a coin"},
           {name: ">dog 🐈", value: "Get a random dog image"},
           {name: ">football ⚽  **(COMING SOON)**", value: "Get latest football matches scores from the Premire League"},
           {name: ">news 📰", value: "Get the latest news headlines from around the world"},
           {name: ">userinfo 📈 **(COMING SOON)**", value: "Get information about a server member."},
           {name: ">report 🔴 **(COMING SOON)**" ,value: "Report a user in the server"},
           {name: ">twitter 🐦",   value:"Keep up to date with me on twitter!"},
           {name: "💜 MORE COMMANDS COMING SOON! 💜", value: "LOOK OUT FOR MORE UPCOMING COMMANDS!"}
           
        )
        message.channel.send({ embeds: [helpEmbed], files: ['./imgs/help.png'] });
        }


}