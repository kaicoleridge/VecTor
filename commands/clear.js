const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clears messages.')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('The amount of messages to clear.')
                .setRequired(true)),
    async execute(interaction) {
        if (interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            const amount = interaction.options.getInteger('amount');
            await interaction.channel.bulkDelete(amount + 1);
            await interaction.reply(`🗑️ Deleted ${amount} messages.`);
           
          
        } else {
            await interaction.reply('You do not have permission to use this command.', { ephemeral: true });
        }
    },
};