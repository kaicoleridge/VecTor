const {SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder ,ButtonStyle} = require('discord.js');


// report command
module.exports = {
    data: new SlashCommandBuilder()
        .setName('report')
        .setDescription('Report a user.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to report.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for the report.')
                .setRequired(true)),
    async execute(interaction) {


        const uuid = Math.floor(Math.random() * 100000)
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');

        const userOptions = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('userOptions')
                    .setLabel('Close Report')
                    .setStyle(ButtonStyle.Danger)
            );

            // check if button is pressed
            interaction.client.on('interactionCreate', async interaction => {
                if (!interaction.isButton()) return;
                if (interaction.customId === 'userOptions') {
                    await interaction.reply({ content: `Your report has now been closed.`, ephemeral: true });
                    count = count + 1;
                    interaction.guild.channels.cache.get('1046230898938486986').send({ content: `${interaction.user} has closed the report ticket **${uuid}**` });

                }
            });

            interaction.client.on('interactionCreate', async interaction => {
                if (!interaction.isButton()) return;
                if (interaction.customId === 'modOptions') {
                    await interaction.reply({ content: `**${uuid}** Report closed succesfully`, ephemeral: true });

                }
            });

         
            const modOptions = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('modOptions')
                    .setLabel('Resolved')
                    .setStyle(ButtonStyle.Success)
                    .setEmoji('✅')
            );

            

        const embed = new EmbedBuilder()
            .setTitle( `** 🎫 New Report Ticket** ${uuid}`)
            .setDescription(
`**Reported user:** ${user}
**Reason**: ${reason}`)
            .setFooter({
                text: `Reported by: ${interaction.user.tag}`
            })
            .setTimestamp()
            .setColor('#FF0000');

            const confirmedEmbed = new EmbedBuilder()
            .setTitle(`**✅ Report Received** Case: ${uuid}`)
            .setDescription(`Thank you. We have received your report. A moderator will review your case shortly. Your case number is **${uuid}**.`);
            
        await interaction.reply({ embeds: [confirmedEmbed], components: [userOptions], ephemeral: true });
        interaction.guild.channels.cache.get('1046230898938486986').send({ embeds: [embed], components: [modOptions] });
    },
};