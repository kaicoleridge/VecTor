const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "twitter",
    description: "Twitter Link",
    execute(message, args){
        const twitterEmbed = new MessageEmbed()
        .setTitle('Follow VecTor on Twitter! 🐦')
        .setDescription('Keep up to date with me on twitter! I post the latest news and updates here!')
        .setColor('#4c31e8')
        .setImage("attachment://twitterBanner.png")
        .setURL('https://twitter.com/officialvector_')
        .addFields(
              {name: "Follow me on Twitter!", value: "https://twitter.com/officialvector_", inline: false},
              {name: "One more thing", value:'P.S. You can also DM if you are having any issues with VecTor', inline: true}
        )
        .setThumbnail('')
        .setFooter('Powered by Twitter')
        message.channel.send({embeds: [twitterEmbed], files: ['./imgs/twitterBanner.png']});
    }
}