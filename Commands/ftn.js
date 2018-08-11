const Discord = require("discord.js");
const Client = require('fortnite');
var apikey = "c23d1fe9-7aad-4fb6-ab50-0b59c5d3b84b";
const fortnite = new Client(apikey);
    module.exports.run = async (bot, message, args) => {

      await message.delete();
      let username = args[0];
      let platform = args[2] || 'pc';
      let gamemode = args[1];

      if(gamemode != 'solo' && gamemode != 'duo' && gamemode != 'squad' && gamemode != 'lifetime')
      {
        return message.reply("שימוש : !ftn <username> <mode> <platform>");
      }


      if(!username) return message.reply("אנא הכנס את השם של השחקן !");
      let data = fortnite.user(username, platform).then( data =>{
        let stats = data.stats;

        if(gamemode === 'solo')
        {
          let solostats = stats.solo;
          let score =  solostats.score;
          let kd = solostats.kd;
          let matches = solostats.matches;
          let kills = solostats.kills;
          let wins = solostats.wins;
          let top3 = solostats.top_3;


          let embed = new Discord.RichEmbed()
          .setTitle("Solo Stats")
          .setAuthor(data.username)
          .setColor("#4286f4")
          .addField("Matches Played",matches,true)
          .addField("Wins",wins, true)
          .addField("Kills",kills,true)
          .addField("kd",kd,true);
  
         message.channel.send(embed);

        }

        else if(gamemode === 'duo')
        {
          let duostats = stats.duo;
          let score = duostats.score;
          let kd = duostats.kd;
          let matches = duostats.matches;
          let kills = duostats.kills;
          let wins = duostats.wins;
          let top3 = duostats.top_3;
          let embed = new Discord.RichEmbed()
          .setTitle("Duo Stats")
          .setAuthor(data.username)
          .setColor("#4286f4")
          .addField("Matches Played",matches,true)
          .addField("Wins",wins, true)
          .addField("Kills",kills,true)
          .addField("kd",kd,true);
  
         message.channel.send(embed);
        }

      else if(gamemode === 'squad')
        {
          let squadstats = stats.squad;
          let score = squadstats.score;
          let kd = squadstats.kd;
          let matches = squadstats.matches;
          let kills = squadstats.kills;
          let wins = squadstats.wins;
          let top3 = squadstats.top_3;
          let embed = new Discord.RichEmbed()
          .setTitle("Squad stats")
          .setAuthor(data.username)
          .setColor("#4286f4")
          .addField("Matches Played",matches,true)
          .addField("Wins",wins, true)
          .addField("Kills",kills,true)
          .addField("kd",kd,true);
        }

        else
        {
        let lifetime = stats.lifetime;
        let score = lifetime[6]['Score']
        let mplayed = lifetime[7]['Matches Played'];
        let wins = lifetime[8]['Wins'];
        let winper = lifetime[9]['Win%'];
        let kills = lifetime[10]['Kills'];
        let kd = lifetime[11]['K/d'];
        
        let embed = new Discord.RichEmbed()
        .setTitle("LifeTime Stats")
        .setAuthor(data.username)
        .setColor("#4286f4")
        .addField("Matches Played",mplayed,true)
        .addField("Wins",wins, true)
        .addField("Kills",kills,true)
        .addField("kd",kd,true);

       message.channel.send(embed);
        }
      })



    }
    module.exports.help = {
      name: "ftn"
    }
