require("dotenv").config();

const { Client, GatewayIntentBits, AuditLogEvent } = require('discord.js'), client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ] 
});

client.on('ready', () => {
    console.clear();
    console.log(`Logged in as ${client.user.tag} !\nInvite: https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`);
});

client.on('messageDelete', async message => {
    if(message.author.bot) return;
    await message.guild.channels.fetch(process.env.LOGS_CHANNEL).then(c => c.send(`[<#${message.channel.id}>] => \`${message.author.tag}\`\nDeleted Message: \`${message.content}\`\n====================`));

}).on("messageUpdate", async (oldMessage, newMessage) => {
    if(oldMessage.author.bot) return;
    await oldMessage.guild.channels.fetch(process.env.LOGS_CHANNEL).then(c => c.send(`[<#${oldMessage.channel.id}>] => \`${oldMessage.author.tag}\`\nUpdated Message:\nOld => \`${oldMessage}\`\nNew => \`${newMessage}\`\n====================`));
});

client.login(process.env.TOKEN);