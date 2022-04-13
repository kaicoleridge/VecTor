const {MessageEmbed} = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'fact',
    description: 'Sends a random fact',
    execute(message, args) {
        axios.get('https://uselessfacts.jsph.pl/random.json?language=en')
        .then(response => {
            const factEmbed = new MessageEmbed()
            .setTitle("DID YOU KNOW?")
            .setDescription('**DISHED UP THIS FACT FOR YOU**' )
            .setColor('RANDOM')
            .setThumbnail('')
            factEmbed.setFooter({
                text: "Powered by uselessfacts.jsph.pl"
            })
            factEmbed.setDescription(response.data.text)
            message.channel.send({embeds: [factEmbed]});
        })
    }
}