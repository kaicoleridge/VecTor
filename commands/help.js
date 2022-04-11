const { MessageEmbed, MessageAttachment } = require('discord.js');
module.exports = {
    name: "help",
    description: "Shows all commands",
    execute(message, args) {
        const helpEmbed = new MessageEmbed()
        .setImage('attachment://help.png')
        .setColor('#4c31e8')
        .setTitle('Get Help with VecTor')
        .setDescription("Here is a list of all current commands I can do! Pick a command below and see the magic I can perform!")
        .addFields(
           {name: ">ping", value: "Test the bot's latency"},
        )
        message.channel.send({ embeds: [helpEmbed], files: ['./imgs/help.png'] });
        }


}