const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "help",
    description: "Shows all commands",
    execute(message, args) {
        const helpEmbed = new MessageEmbed()
        .setImage('attachment://help.png')
        .setColor('#4c31e8')
        .setTitle('Get Help with VecTor')
        .setDescription("Here is a list of all current commands I can do! Pick a command below and see the magic I can perform! ✨")
        .addFields(
           {name: ">ping 🏓", value: "Test the bot's latency, to see if I'm working correcly!"},
           {name: ">invite 🔗", value: "Get the invite link for the NUM Discord Server"},
           {name: ">meme 🐸", value: "Get a random meme"},
           {name: ">cat 🐈", value: "Get a random cat image"},
           {name: ">stats 📈", value: "Show Discord server stats ie. member count etc."},
           {name: ">report 🔴" ,value: "Report a user to the NUM Discord Server"},
           {name: ">twitter 🐦",   value:"Keep up to date with me on twitter!"},
           {name: ">movieShowings 🍿", value: "Get the current movie showings hosted in Bigscreen VR & Discord Server"},
           {name: "💜 MORE COMMANDS COMING SOON! 💜", value: "LOOK OUT FOR MORE UPCOMING COMMANDS!"}
           
        )
        message.channel.send({ embeds: [helpEmbed], files: ['./imgs/help.png'] });
        }


}