//Made by Misakiii

const fs = require('fs');
require('dotenv').config();
const keepAlive = require("./server");
const config = require("./config.json");
const language = require("./language.json")

const gradient = require('gradient-string');
const Discord = require("misakiii-discordjs")
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION" ]});

//config
const auto_vocal_config = require("./config/auto_vocal.json")
const auto_afk_config = require("./config/auto_afk.json")
const anti_invite_config = require("./config/anti_invite.json")

//config.json & .env
const TOKEN = config.TOKEN

const AUTO_VOCAL = config.AUTO_VOCAL
const AUTO_AFK = config.AUTO_AFK
const ANTI_INVITE = config.ANTI_INVITE
const AUTO_SPOILER = config.AUTO_SPOILER

//events
client.on("ready", () => 
{
    console.clear();
    console.log(gradient.morning(language.LOGGED + client.user.username + "#" + client.user.discriminator))
    console.log(gradient.morning("═══════════════════════════════════════════"))

    if (AUTO_VOCAL === "off" && AUTO_AFK === "off" && ANTI_INVITE === "off" && AUTO_SPOILER === "off") 
    { 
        return console.log("\x1b[31m" + "Error, please enable one options in the file config.json") 
    }
    
    if (AUTO_VOCAL === "on") { console.log(gradient.morning("Auto Vocal: Enabled")) }
    if (AUTO_AFK === "on") { console.log(gradient.morning("Auto AFK: Enabled")) }
    if (ANTI_INVITE === "on") { console.log(gradient.morning("Anti Invite: Enabled")) }
    if (AUTO_SPOILER === "on") { console.log(gradient.morning("Auto Spoiler: Enabled")) }

    if (AUTO_VOCAL == "on")
    {
        let channel = client.channels.get(auto_vocal_config.CHANNEL_ID);
        let guild = client.guilds.get(auto_vocal_config.GUILD_ID);
        
        if (!channel) { return console.log(language.ERROR_CHANNEL_ID) }
        if (!guild) { return console.log (language.ERROR_GUILD_ID) }
        
        channel.join(); return console.log(`Successfully joined channel ${channel.name} from guild ${guild.name}.`)
    }
});

client.on("message", message => 
{
    if (AUTO_AFK === "on")
    {
        if (message.channel.type === 'dm') 
        {
            if (message.author.username === client.user.username) return;
            message.channel.send(auto_afk_config.DM_MESSAGE)
        }
        
        if (message.isMemberMentioned(client.user))
        {
            if (message.author.username === client.user.username) return;
            message.channel.send(auto_afk_config.PING_MESSAGE)
        }
    }

    if (ANTI_INVITE === "on")
    {
        if (message.channel.type === 'dm')
        {
            if (message.content.includes('discord.gg'))
            {
                if (message.author.username === client.user.username) return;
                message.channel.send(anti_invite_config.RETURN_MESSAGE)
            }
        }
    }

    if (AUTO_SPOILER === "on")
    {
        if (message.author.username === client.user.username)
        {
            message.edit("|| " + message.content + " ||")
        }
    }
});


//login
keepAlive();
client.login(TOKEN).catch(() => 
{
    console.clear();
    return console.log("\x1b[31m " + language.ERROR_INVALID_TOKEN)
});
