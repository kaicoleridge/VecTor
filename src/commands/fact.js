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
            .setColor('RANDOM')
            .setThumbnail('')
            factEmbed.setFooter({
                text: "Powered by uselessfacts.jsph.pl"
            })
            .addField('Fact', response.data.text)
            message.channel.send({embeds: [factEmbed]}).then(embedMessage => {
                embedMessage.react('👍');
                embedMessage.react('👎');
        })
    })
    .catch(error => {
        console.log(error);
        message.channel.send("🤦 Something went wrong! Please try again later!");
    });
    }
}