const Discord = require("discord.js");

const request = require('request');

const superagent = require("superagent");

const search = require("yt-search");

const TOKEN = NDY4ODA1MTY0NTI2OTkzNDE4.DlCXOw.X8KRODbj2kqR4a4lh433z8FlcrA;

const YTDL = require("ytdl-core");

const fs = require("fs");

const ms = require("ms");

const PREFIX = "!";

/* global Map*/
const active = new Map();

const fortnite = require('fortnite');

var ownerID = "279353707567644693";

var bot = new Discord.Client();

bot.commands = new Discord.Collection();
var ownerID = "279353707567644693"

let xp = require("./xp.json");

fs.readdir("./commands/", (err, files) => {

if(err) console.log(err);
let jsfile = files.filter(f => f.split(".").pop() === "js");
if(jsfile.length <= 0){
  console.log("Couldn't find commands.");
  return;
}

jsfile.forEach((f, i) =>{
  let props = require(`./commands/${f}`);
  console.log(`${f} loaded!`);
});
});
  bot .on("guildMemberAdd",function(member)
{
          var mem = member.user;
          var embed = new Discord.RichEmbed()
          .setTitle("הצטרף לשרת !")
          .setAuthor(member.user.username)
          .setColor("#0a68ff")
          .addField("מתי הצטרף ?",member.joinedAt)
          .setThumbnail(mem.displayAvatarURL)
        member.guild.channels.find("id","468770176490274836").sendMessage(embed);
        let Role = member.guild.roles.find("name", "☄️| SkyDivers");
         member.addRole(Role);
         bot.guilds.forEach(g =>{
          size = g.memberCount
          })
          bot.user.setGame(size +" "+"צנחנים בשרת !");
});
  bot .on("guildMemberRemove",function(member)
  {
    var mem = member.user;
   var lastMsg = member.user.lastMessage;
    var embed = new Discord.RichEmbed()
    .setTitle("יצא מהשרת")
    .setAuthor(member.user.username)
    .setColor("#0a68ff")
    .setThumbnail(mem.displayAvatarURL)
    .addField("מתי הצטרף ?",member.joinedAt)
    .addField("מה ההודעה האחרונה שהוא שלח ?",lastMsg)
  member.guild.channels.find("id","468770176490274836").send(embed);
   bot.guilds.forEach(g =>{
    size = g.memberCount
    })
    bot.user.setGame(size +" "+"צנחנים בשרת !");
  });
bot.on("ready", function(){
    console.log("Ready");
    var size;
    bot.guilds.forEach(g =>{
    size = g.memberCount
    })
    bot.user.setGame(size +" "+"צנחנים בשרת !");
});
var servers = {};
bot.on("message", function(message){
     if(message.author.equals(bot.user)) return;
     let xpAdd = Math.floor(Math.random() * 7) + 8;
 console.log(xpAdd);

 if(!xp[message.author.id]){
   xp[message.author.id] = {
     xp: 0,
     level: 1
   };
 }


 let curxp = xp[message.author.id].xp;
 let curlvl = xp[message.author.id].level;
 let nxtLvl = xp[message.author.id].level * 300;
 xp[message.author.id].xp =  curxp + xpAdd;
 if(nxtLvl <= xp[message.author.id].xp){
   xp[message.author.id].level = curlvl + 1;
   let lvlup = new Discord.RichEmbed()
   .setTitle("עלית רמה !")
   .setColor("#0c57d1")
   .addField("הרמה שלך עכשיו היא :", curlvl + 1);

   message.channel.send(lvlup);
 }
 fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
   if(err) console.log(err)
 });
 let msg = message.content.toUpperCase();
 let sender =message.author;
 let args = message.content.slice(PREFIX.length).trim().split(' ');
 let cmd = args.shift().toLowerCase();
 if (message.channel.type==="dm") return;
 if (!msg.startsWith(PREFIX)) return;
 if (message.author.bot) return;
 try {
  delete require.cache[require.resolve(`./commands/${cmd}.js`)];
  let ops = {
    ownerID: ownerID,
    active: active
  }
  let commandFile = require(`./commands/${cmd}.js`);
  commandFile.run(bot, message, args, ops);

  } catch (e) {
  console.log(e.stack);
  }  finally {
    console.log(`${message.author.tag} a utilisé la commande ${cmd}`);}

        });
bot.login(TOKEN);

           
