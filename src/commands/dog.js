const axios = require('axios');
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'dog',
    description: 'Sends a random dog picture',
    execute(message, args) {
        message.channel.send("📷 Fetching a random dog picture...");
        axios.get('https://dog.ceo/api/breeds/image/random')
        .then(response => {
            const dogEmbed = new MessageEmbed()
            .setTitle('Random Dog Picture 🦴')
            .setDescription('How much is that doggy in the window? 🐕 = 🪟' )
            .setImage(response.data.message)
            .setColor('#4c31e8')
            .setFooter('Powered by dog.ceo')
            .setThumbnail('http://assets.stickpng.com/images/5845e673fb0b0755fa99d7ed.png')
          
            message.channel.send({embeds: [dogEmbed]}).then(embedMessage => {
                embedMessage.react('👍');
                embedMessage.react('👎');
            });
            
            
        })
        .catch(error => {
            console.log(error);
            message.channel.send("🤦 Something went wrong! Please try again later!");
        });
    }
}