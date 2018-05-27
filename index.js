const Discord = require('discord.js');
const config = require('./config.json');

const client = new Discord.Client();

client.on("message", async message => {
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  	const command = args.shift().toLowerCase();

  	if(command === "kick") {
    	if(!message.member.roles.some(r=>["Knez Lazar", "Gospodar vremena"].includes(r.name)) )
      		return message.reply("Jel ti mislis da sam ja magarac jebem ti mater sisaj kurac!");
    	let member = message.mentions.members.first() 
    	if(!member)
      		return message.reply("Cigan se sakrio");
    	if(!member.kickable) 
      		return message.reply("Jel ti mislis da sam ja magarac jebem ti mater sisaj kurac!");
    
    	let reason = args.slice(1).join(' ');
    	if(!reason) reason = "radi fore ciganske";

    	await member.kick(reason)
      		.catch(error => message.reply(`Auuu ${message.author} Nemogu ga kikujem zbog : ${error}`));
       		message.reply(`${member.user.tag} je kikovan od strane ${message.author.tag} zbog: ${reason}`);
  	}

    if(command === "mute") {
    	if(!message.member.roles.some(r=>["Knez Lazar", "Gospodar vremena"].includes(r.name)) )
      		return message.reply("Jel ti mislis da sam ja magarac jebem ti mater sisaj kurac!");
    	let member = message.mentions.members.first(); 
    	if(!member)
      		return message.reply("Cigan se sakrio");
    	if(!member.kickable) 
      		return message.reply("Jel ti mislis da sam ja magarac jebem ti mater sisaj kurac!");
    
    	let reason = args.slice(1).join(' ');
    	if(!reason) reason = "radi fore ciganske";

    	await member.setMute(true, reason)
      		.catch(error => message.reply(`Auuu ${message.author} Nemogu ga mutujem zbog : ${error}`));
       		message.reply(`${member.user.tag} je mutovan od strane ${message.author.tag} zbog: ${reason}`);
  	}

    if(command === "unmute") {
    	if(!message.member.roles.some(r=>["Knez Lazar", "Gospodar vremena"].includes(r.name)) )
    		return message.reply("Jel ti mislis da sam ja magarac jebem ti mater sisaj kurac!");
    	let member = message.mentions.members.first() 
    	if(!member)
    		return message.reply("Cigan se sakrio");
    	if(!member.kickable) 
    		return message.reply("Jel ti mislis da sam ja magarac jebem ti mater sisaj kurac!");

    	await member.setMute(false)
    		.catch(error => message.reply(`Auuu ${message.author} Nemogu ga unmutujem zbog : ${error}`));
    		message.reply(`${member.user.tag} je unmutovan od strane ${message.author.tag}`);

  	}
  
  	if(command === "ban") {
    	if(!message.member.roles.some(r=>["Knez Lazar", "Gospodar vremena"].includes(r.name)) )
      		return message.reply("Jel ti mislis da sam ja magarac jebem ti mater sisaj kurac!");
    
    	let member = message.mentions.members.first();
   		if(!member)
      		return message.reply("Cigan se sakrio");
    	if(!member.bannable) 
      		return message.reply("Jel ti mislis da sam ja magarac jebem ti mater sisaj kurac!");

    	let reason = args.slice(1).join(' ');
    	if(!reason) reason = "radi fore ciganske";
    
   		 await member.ban(reason)
      		.catch(error => message.reply(`Auuu ${message.author} Nemogu ga banujem zbog : ${error}`));
    		message.reply(`${member.user.tag} je popio bancinu od strane ${message.author.tag} zbog: ${reason}`);
  	}
  
  	if(command === "purge") {
    
    	const deleteCount = parseInt(args[0], 1);
    
    	if(!deleteCount || deleteCount < 1 || deleteCount > 100)
      		return message.reply("unesi broj izmedju 1 i 100");
    
    	const fetched = await message.channel.fetchMessages({count: deleteCount});
    	message.channel.bulkDelete(fetched)
      		.catch(error => message.reply(`Bem ti kevu: ${error}`));
  }
})

client.login(config.token);