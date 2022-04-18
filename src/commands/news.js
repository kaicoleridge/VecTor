const {MessageEmbed} = require('discord.js');
const config = require(`${process.cwd()}/config.json`)
const axios = require('axios');

const newsAPIURL = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${config.API_KEY}`;

module.exports = {
    name: 'news',
    description: 'Sends a news headlines',
    execute(message, args) {
        message.channel.send("📰 Getting Top News Headlines...");
        axios.get(newsAPIURL)
        .then(response => {
            const newsEmbed = new MessageEmbed()
            .setTitle('Top World News Headlines 📰')
            .setDescription('Here are the latest news headlines from around the World')
            .setColor('RED')
            .setThumbnail('attachment://news.png')
            .setImage(response.data.articles[4].urlToImage)
            .setFooter({
                text: "Powered by NewsAPI.org. Source BBC News"
            })
            .setTimestamp()
            .addFields(
                  {name: "1️⃣ Headline", value: response.data.articles[0].title, inline: false},
                  {name: "Description", value: response.data.articles[0].description, inline: false},
                  {name: "🔗 URL", value: response.data.articles[0].url, inline: false},

                  {name: "\u200b", value: "\u200b", inline: false},

                  {name: "2️⃣ Headline", value: response.data.articles[1].title, inline: false},
                  {name: "Description", value: response.data.articles[1].description, inline: false},
                  {name: "🔗 URL", value: response.data.articles[1].url, inline: false},
                  

                  {name: "\u200b", value: "\u200b", inline: false},

                  {name: "3️⃣ Headline", value: response.data.articles[2].title, inline: false},
                  {name: "Description", value: response.data.articles[2].description, inline: false},
                  {name: "🔗 URL", value: response.data.articles[2].url, inline: false},

                  {name: "\u200b", value: "\u200b", inline: false},

                  {name: "4️⃣ Headline", value: response.data.articles[3].title, inline: false},
                  {name: "Description", value: response.data.articles[3].description, inline: false},
                  {name: "🔗 URL", value: response.data.articles[3].url, inline: false},

                  {name: "\u200b", value: "\u200b", inline: false},

                  {name: "5️⃣ Headline", value: response.data.articles[4].title, inline: false},
                  {name: "Description", value: response.data.articles[4].description, inline: false},
                  {name: "🔗 URL", value: response.data.articles[4].url, inline: false}

                  
            )
            message.channel.send({embeds: [newsEmbed], files: ['./imgs/news.png']});
        })
        .catch(error => {
            console.log(error);
            message.channel.send("🤦 Something went wrong! Please try again later!");
        })

        


        
    }
}