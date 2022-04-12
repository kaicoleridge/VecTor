const axios = require('axios');
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'dog',
    description: 'Sends a random dog picture',
    execute(message, args) {
        message.channel.send("📷 Fetching a random dog picture...");
        axios.get('https://dog.ceo/api/breeds/image/random')
        .then(response => {
            const embed = new MessageEmbed()
            .setTitle('Random Dog Picture 🦴')
            .setDescription('How much is that doggy in the window? 🐕 = 🪟' )
            .setImage(response.data.message)
            .setColor('#4c31e8')
            .setFooter('Powered by dog.ceo')
            
            message.channel.send({embeds: [embed]});
        })
        .catch(error => {
            console.log(error);
        });
    }
}