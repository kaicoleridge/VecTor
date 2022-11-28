const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kanye')
        .setDescription('Get a random Kanye West quote.'),
    async execute(interaction) {
        const response = await fetch('https://api.kanye.rest/');
        const json = await response.json();
        const embed = new EmbedBuilder()
            .setTitle('Kanye West once said...')
            .setDescription(`"${json.quote}"`)
            .setImage('https://media1.popsugar-assets.com/files/thumbor/QRLJW0hEKvbDWJIDWJw0KDui6Q4/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2015/08/30/168/n/1922398/79ec3b491c7a1d66_GettyImages-486013814/i/Kanye-West-Speech-MTV-VMAs-2015-Video.jpg')
            .setColor('#FFFFFF');
        await interaction.reply({ embeds: [embed]});
        
    }

};
       
        