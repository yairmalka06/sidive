exports.run = async (bot, message, args, ops) => {
    let fetched = ops.active.get(message.guild.id);
    if (!fetched) return message.channel.send('אין שום מוסיקה מתנגנת כרגע !');
    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send('אתה לא באותו חדר עם הבוט !');
    
        let userCount = message.member.voiceChannel.members.size;
    
        let required = Math.ceil(userCount/2);
        
        if (!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = [];
        
        if (fetched.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(`אתה כבר הצבעת להעביר שיר !. ${fetched.queue[0].voteSkips.length}/${required} `);
        
        fetched.queue[0].voteSkips.push(message.member.id);
        
        ops.active.set(message.guild.id, fetched);      
        if (fetched.queue[0].voteSkips.length >= required) {
          message.channel.send('העביר שיר בהצלחה !');
          return fetched.dispatcher.emit("finish");
        }
        
        message.channel.send(`ההצבעה שלך נקלטה בהצלחה${fetched.queue[0].voteSkips.length}/${required}`);
  }