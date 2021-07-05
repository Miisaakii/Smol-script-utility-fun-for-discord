//Made by Misakiii
//Was lazy to stay in a vc so i made this script!

const keepAlive = require("./server");
const Discord = require("misakiii-discordjs")
const client = new Discord.Client()
require('dotenv').config()

var TOKEN = (process.env.TOKEN)
var CHANNEL = (process.env.CHANNEL_ID)
var GUILD = (process.env.GUILD_ID)

client.on("ready", () => 
{
    console.clear()
    
    let channel = client.channels.get(CHANNEL);
    let guild = client.guilds.get(GUILD);

    if (!channel) { return console.log("There is no channel with this ID.") }
    if (!guild) { return console.log ("There is no guild with this ID.") }
    
    channel.join() 
    return console.log(`Successfully joined channel ${channel.name} from guild ${guild.name}.`)
});

keepAlive();
client.login(TOKEN).catch(() => 
{
    return console.log("Invalid token provided.")
});
