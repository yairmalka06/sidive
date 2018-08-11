const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  var size;
  bot.guilds.forEach(g =>{
  size = g.memberCount
  })
  var joined = message.member.joinedAt;
  var serverj = message.guild.createdAt;
  var embed = new Discord.RichEmbed()
    .setTitle("המצב הנוכחי של השרת")
    .addField("מספר האנשים הנוכחי בשרת ",size)
    .addField("אתה הצטרפת בתאריך : ", joined)
    .addField("השרת נוצר בתאריך : ", serverj)
}
module.exports.help = {
  name: "server"
}
