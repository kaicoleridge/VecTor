const {MessageEmbed} = require('discord.js');

module.exports = {
    name: "purge",
    description: "Purges a certain amount of messages",
    execute(message, args) {
        let amountToDelete = args[0];
        if(!amountToDelete) return message.reply("Please specify an amount of messages to delete!\n" + "`" + ">purge <amount>`");
        if(amountToDelete > 100) return message.reply("Please specify an amount of messages less than 100!");
        if(amountToDelete < 2) return message.reply("Please specify an amount of messages greater than 1!");

        message.channel.bulkDelete(amountToDelete, true).catch(err => {
            console.log(err);
            message.channel.send("Error: " + err);
        });

        const purgeEmbed = new MessageEmbed()
        .setTitle("🗑️ Deleted " + amountToDelete + " messages!")
        .setColor('#4c31e8')
        .setTimestamp()
        .setThumbnail(message.member.user.avatarURL({dynamic: true}))
        purgeEmbed.setFooter({
            text: "Powered by VecTor"
        })
        .addField('Messages deleted', amountToDelete + " messages")
        .addField('Purged by', message.author.tag)
        .setFooter({
            text: `This message will delete in 10 seconds`
        })
        message.channel.send({embeds: [purgeEmbed]})
        .then(msg => {
          setTimeout(() => msg.delete(), 10000)
        })
        .catch("Error deleting message");
    }
}