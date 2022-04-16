const {MessageEmbed} = require('discord.js');

module.exports = {
    name: "purge",
    description: "Purges a certain amount of messages",
    execute(message, args) {
        let amountToDelete = args[0];
        if(!amountToDelete) return message.channel.send("Please specify an amount of messages to delete!\n " + "`" + ">purge <amount>`");
        if(amountToDelete > 100) return message.channel.send("Please specify an amount of messages less than 100!");
        if(amountToDelete < 2) return message.channel.send("Please specify an amount of messages greater than 1!");
        message.channel.bulkDelete(amountToDelete);
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
        message.channel.send({embeds: [purgeEmbed]})
        .then(msg => {
          setTimeout(() => msg.delete(), 10000)
        })
        .catch("Error deleting message");
    }
}