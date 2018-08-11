exports.run = async (bot, message, args, ops) => {
  
    let fetched = ops.active.get(message.guild.id);
    
    if (!fetched) return message.channel.send('אין שום מוסיקה מתנגנת כרגע !');
    
    let queue = fetched.queue;
    
    let nowPlaying = queue[0];
    
    let resp = `__**עכשיו מנגן**__\n**${nowPlaying.songTitle}** -- **נוסף על ידי:** *${nowPlaying.requester}*\n\n__**הפלייליסט:**__\n`;
    
    for (var i=1; i < queue.length; i++) {
      resp += `${i}. **${queue[i].songTitle}** -- **נוסף על ידי:** *${queue[i].requester}*\n`;
    }
    message.channel.send(resp);
  
  }