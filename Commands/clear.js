const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.delete();
  if(!message.member.hasPermissions("MANAGE_MESSAGES")) return message.reply("אין לך הרשאות לפקודה זאת");
  if(!args[0]) return message.channel.sendMessage("אנא רשום כמה הודעות אתה רוצה למחוק !");
  var amount = args[0];
  message.channel.bulkDelete(amount).then(() =>
  {
    message.channel.sendMessage("מחקתי"+" "+amount+" "+"הודעות").then(message => message.delete(5000));
  });
}
module.exports.help = {
  name: "clear"
}
