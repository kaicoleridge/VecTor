const {MessageEmbed} = require('discord.js');
const {Permissions} = require('discord.js');

module.exports = { 
    name: "purge",
    description: "Purges a certain amount of messages",
    Permissions: ['MANAGE_MESSAGES'],
    execute(message, args, client, member) {
        

            message.channel.bulkDelete(args[0]).then(() => {
                const purgeEmbed = new MessageEmbed()
                .setTitle("Deleted " + args[0] + " messages!")
                .setColor('#4c31e8')
                .setThumbnail('')
                .addFields(
                    {name: "Purged", value: `${args[0]} messages`, inline: false},
                    {name: "Purged by", value: `${message.author.username}`, inline: false}
                );
                message.channel.send({embeds: [purgeEmbed]});
            });
            
    }
}