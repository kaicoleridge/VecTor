const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const config = require('../config.json');
const fetch = require('node-fetch');



module.exports = {
    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('Sends the weather for a given location.')
        .addStringOption(option =>
            option.setName('city')
                .setDescription('The location to get the weather for.')
                .setRequired(true)),
    async execute(interaction) {
        await interaction.reply("Fetching weather...")  

        const city = interaction.options.getString('city');
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.WEATHER_API_KEY}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === 200) {
            const weatherEmbed = new EmbedBuilder()
                .setTitle(`Weather for ${data.name}`)
                .setDescription(`🌡️ ${data.main.temp}°C`)
                .addFields(
                    {name: '☁️ Weather Conditions', value: data.weather[0].main},
                    {name: '💨 Wind Speed', value: `${data.wind.speed} m/s`},
                    {name: '💧 Humidity', value: `${data.main.humidity}%`},
                    {name: '☁️ Clouds', value: `${data.clouds.all}%`},
                    {name: '🌡️ Temperature', value: `${data.main.temp}°C`},
                    {name: '🌡️ Feels Like', value: `${data.main.feels_like}°C`},
                    {name: '🕒 Rain expected in', value: `${data.rain ? data.rain['1h'] : '0'} minutes`},
                )
                .setFooter({
                    text: `Powered by OpenWeatherMap`
                })
                .setTimestamp()
                .setColor('	#EB459E');
            interaction.editReply({embeds: [weatherEmbed]});
        } else {
            interaction.editReply(`Error: ${data.message}`);
        }
    }
}