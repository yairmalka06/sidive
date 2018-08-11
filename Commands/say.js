const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermissions("ADMINISTRATOR")) return message.reply("אין לך הרשאות לפקודה זאת");
  message.delete();
  var text = args.join(" ");
  message.channel.sendMessage(text);
}
module.exports.help = {
  name: "say"
}
