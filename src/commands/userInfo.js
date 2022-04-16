const {MessageEmbed} = require('discord.js');

module.exports = {
    name: "userinfo",
    description: "Get information about a server member.",
    execute(message, args) {

        const previewEmbed = new MessageEmbed()
        .setTitle("👷 COMING SOON")
        .setColor('#4c31e8')
        .setDescription(`This command is currently under development.`)
        .setTimestamp()
        message.channel.send({embeds: [previewEmbed]})
    }
}