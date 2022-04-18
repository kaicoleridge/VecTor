const {MessageEmbed} = require('discord.js');
const axios = require('axios');

module.exports = { 
    name: 'meme',
    description: 'Sends a random meme',
    execute(message, args) {
        message.channel.send("🍳Cooking up a meme for you...( ͡°👅 ͡°)")
        axios.get('https://meme-api.herokuapp.com/gimme')
        .then(response => {
            const memeEmbed = new MessageEmbed()
            .setTitle("( ͡ʘ ͜ʖ ͡ʘ)")
            .setDescription('**DISHED UP THIS MEME FOR YOU**' )
            .setImage(response.data.url)
            .setColor('#4c31e8')
            .setFooter({
                text: "Powered by meme-api.herokuapp.com"
            })
          
            message.channel.send({embeds: [memeEmbed]}).then(embedMessage => {
                embedMessage.react('👍');
                embedMessage.react('👎');
            });
            
        })

        .catch(error => {
            console.log(error);
            message.channel.send("🤦 Something went wrong! Please try again later!");
        })
    }
}