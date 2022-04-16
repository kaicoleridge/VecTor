const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'purge',
    description: "Purges a certain amount of messages",
    userPermissions: ['MANAGE_MESSAGES'],
    execute(message, args) {
        if(!args[0]) return message.channel.send("Please specify the amount of messages you want to delete! \n **Usage:** `>purge <amount>`");
        if(isNaN(args[0])) return message.channel.send("Please specify a number!");
        if(args[0] > 100) return message.channel.send("Please specify a number less than 100!");
        if(args[0] < 2) return message.channel.send("Please specify a number greater than 1!");
        message.channel.bulkDelete(args[0])
        .then(messages => {
            const purgeEmbed = new MessageEmbed()
            .setTitle("Deleted " + messages.size + " messages!")
            .setColor('#4c31e8')
            .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
            .addField('Purged by', message.author.tag)
            .setTimestamp()
            purgeEmbed.setFooter({
                text: "Powered by VecTor"
            })
            .addField('Purged', `${messages.size} messages`)
            message.channel.send({embeds: [purgeEmbed]})
        }
        )
        .catch(error => {
            console.log(error);
        });
    }
}