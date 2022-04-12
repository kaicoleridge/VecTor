const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'invite',
    description: 'Invite VecTor to your server!',
    execute(message, args) {
        const inviteEmbed = new MessageEmbed()
        .setTitle('🎉 Invite VecTor to your server!')
        .setDescription('Get VecTor on your server!')
        .setColor('#4c31e8')
        .setImage("attachment://invite.png")
        .setURL('https://discordapp.com/oauth2/authorize?client_id=723180989843791872&permissions=8&scope=bot')
        .addFields(
              {name: "Invite VecTor to your server!", value: "https://discord.com/api/oauth2/authorize?client_id=960748740556238868&permissions=8&scope=bot", inline: false},
              {name: "Any issues?", value:'If you are experience any issues with VecTor tweet us https://twitter.com/officialvector_', inline: false}
        )
        .setThumbnail('')
        .setFooter('Powered by VecTor')
        message.channel.send({embeds: [inviteEmbed], files: ['./imgs/invite.png']});
    }
}