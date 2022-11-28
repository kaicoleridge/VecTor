const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = { 
    data: new SlashCommandBuilder()
    .setName('meme')
    .setDescription('Sends a meme from reddit.'),
    async execute(message) {
        message.channel.send(`(◑‿◐) (◑‿◐)
Fetching this juicy meme for ${message.user}`);
        axios.get('https://meme-api.herokuapp.com/gimme')
        .then(response => {
            const memeEmbed = new EmbedBuilder()
            .setTitle(response.data.title)
            .setDescription(`🔗 [Link to post](${response.data.postLink})`)
            .setURL(response.data.postLink)
            .setImage(response.data.url)
            .setFooter({
                text: `👍Upvotes ${response.data.ups} | 👤 by ${response.data.author}`
            })
            .setTimestamp()
            .setColor('#FFA500');
            message.channel.send({ embeds: [memeEmbed] });

            
        })

        
    }
}