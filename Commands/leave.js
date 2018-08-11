const Discord = require("discord.js");
const ytdl = require("ytdl-core");
module.exports.run = async (bot, message, args, ops) => {

if(!message.member.voiceChannel) return message.reply("אנא התחבר לחדר קולי !");

if(!message.guild.me.voiceChannel) return message.reply("הבוט לא מחובר לשום חדר !");

 if(message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.reply("אתה לא מחובר לאותו חדר עם הבוט !");

  message.guild.voiceConnection.disconnect();

 message.channel.send("עוזב את החדר !");
}
module.exports.help = {
  name: "leave"
}