const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'coin',
    description: 'Flips a coin',
    execute(message, args) {
        let coin = ['Heads :coin:', 'Tails :coin:'];
        let randomCoin = coin[Math.floor(Math.random() * coin.length)];
        const coinEmbed = new MessageEmbed()
        .setTitle('Flipping a coin...')
        .setColor('YELLOW')
        .setDescription(`Coin landed on ${randomCoin}!`)
        .setFooter('Powered by VecTor')
        message.channel.send({embeds: [coinEmbed]});
    }
}