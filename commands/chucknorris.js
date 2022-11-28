const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = { 
    data: new SlashCommandBuilder()
    .setName('chucknorris')
    .setDescription('Sends a random Chuck Norris joke.'),
    async execute(interaction) {
        await interaction.reply("Chuck Norris is on his way...");
        fetch('https://api.chucknorris.io/jokes/random')
        .then(response => response.json())
        .then(data => {
            const chuckEmbed = new EmbedBuilder()
            .setTitle('Chuck Norris Joke')
            .setDescription(data.value)
            .setFooter({
                text: `👍 ${data.categories}`
            })
            .setTimestamp()
            .setColor('#98FB98');
            interaction.editReply({ embeds: [chuckEmbed] });
        })
    }
}