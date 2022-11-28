const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Measures the latency of the bot.'),
    async execute(interaction) {;
        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
        const embed = new EmbedBuilder()
        .addFields(
          {name: `:ping_pong: Pong!`, value: `:stopwatch: Uptime: ${Math.round(interaction.client.uptime / 60000)} minutes`},
          {name: `:sparkling_heart: Websocket heartbeat:`, value:  `${interaction.client.ws.ping}ms.`},
          {name: `:round_pushpin: Rountrip Latency:`, value: `${sent.createdTimestamp - interaction.createdTimestamp}ms`}
        )
        .setFooter({
            text: `Powered by Discord.js`
        })
        .setTimestamp()
        .setColor('#EB459E')
    
        interaction.editReply({ embeds: [embed] });
    },
};
