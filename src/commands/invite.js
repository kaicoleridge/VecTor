const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'invite',
    description: 'Invite VecTor to your server!',
    execute(message, args) {
        const inviteEmbed = new MessageEmbed()
        .setTitle('🎉 Invite link to the NUM Discord Server!')
        .setDescription('Invite other people to the NUM Discord Server!')
        .setColor('#4c31e8')
        .setImage("attachment://invite.png")
        .setURL('https://discordapp.com/oauth2/authorize?client_id=723180989843791872&permissions=8&scope=bot')
        .addFields(
              {name: "Invite link to the server!", value: "Use this link which will redirect you to invite VecTor to your chosen server. https://discord.gg/B6ERp7ehDD ", inline: false},
        )
        .setThumbnail('')
        .setFooter({
            text: 'Powered by VecTor'
        })
        message.channel.send({embeds: [inviteEmbed], files: ['./imgs/invite.png']});
    }
}