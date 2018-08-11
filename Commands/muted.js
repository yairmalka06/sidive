const Discord = require("discord.js");
const ms = require("ms");
module.exports.run = async (bot, message, args) => {


  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("אין לך הרשאות לפקודה זאת.");
  if(args[0] == "help"){
    message.reply("Usage: !tempmute <user> <1s/m/h/d>");
    return;
  }
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Couldn't find user.");
  if(tomute.hasPermission("ADMINISTRATOR")) return message.reply("לא יכול להשתיק את המשתמש שצוין");
  let reason = args.slice(2).join(" ");
  if(!reason) return message.reply("לא צינת סיבה");

  let muterole = message.guild.roles.find(`name`, "muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("לא ציינת זמן להשתק");

  message.delete().catch(O_o=>{});

  try{
    await tomute.send(`היי הורחקת מהצאט למשך${mutetime}.אנא נסה לכתוב שוב לאחר ההשתק`)
  }catch(e){
    message.channel.send(`המשתמש הושתק אבל ההודעות הפרטיות שלו חסומות המשתמש הורחק ל : ${mutetime}`)
  }

  let muteembed = new Discord.RichEmbed()
  .setDescription(`Mute executed by ${message.author}`)
  .setColor("#0263ff")
  .addField("Muted User", tomute)
  .addField("Muted in", message.channel)
  .addField("Time", message.createdAt)
  .addField("Length", mutetime)
  .addField("Reason", reason);

  let incidentschannel = message.guild.channels.find(`name`, "logs");
  if(!incidentschannel) return message.reply("אנא צור חדר לכל הציונים של ההשתקות");
  incidentschannel.send(muteembed);

  await(tomute.addRole(muterole.id));

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> כבר לא בהשתק !`);
  }, ms(mutetime));


//end of module
}

module.exports.help = {
  name: "tempmute"
}
