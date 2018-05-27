const Discord = require('discord.js');
const config = require('./config.json');
const sql = require("sqlite");

const client = new Discord.Client();
sql.open("./scores.sqlite");

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
    
    	const deleteCount = parseInt(args[0], 20);
    
    	if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      		return message.reply("unesi broj izmedju 2 i 100");
    
    	const fetched = await message.channel.fetchMessages({count: deleteCount});
    	message.channel.bulkDelete(fetched)
      		.catch(error => message.reply(`Bem ti kevu: ${error}`));
 	}

 	if(command === "ping") {
    	const m = await message.channel.send("Ping?");
    	m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  	}

  	if(command === "say") {
    	const sayMessage = args.join(" ");
    	message.delete().catch(O_o=>{}); 
    	message.channel.send(sayMessage);
  }
})

client.on('message', message => {
	if (message.channel.id === '450015304911945729' || message.channel.id === '261953065970696192'
	|| message.channel.id === '444493781119664139')
		if (message.content.includes('!play') || (message.member.id === '235088799074484224')
		|| message.content.includes('!leave')){
			message.delete();
			if (message.member.id !== '235088799074484224'){
			message.author.send('bem ti dete imas muzik kanal!!!');
			message.channel.send('radim na djubrici');
			}
		}
});

client.on("message", message => {
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  	const command = args.shift().toLowerCase();

  	if (command === "+rep"){
  		sql.get(`SELECT * FROM scores WHERE userId ="${args[0].slice(2,20)}"`).then(row => {
    	if (!row) {
      		sql.run("INSERT INTO scores (userId, reputation) VALUES (?, ?)", [args[0].slice(2,20), 25]);
    	} else {
      		sql.run(`UPDATE scores SET reputation = ${row.reputation + 25} WHERE userId = ${args[0].slice(2,20)}`);
    	}
 		}).catch(() => {
    		console.error;
      		sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, reputation INTEGER)").then(() => {
      		sql.run("INSERT INTO scores (userId, reputation) VALUES (?, ?)", [args[0].slice(2,20)]);
    		});
  		});
  		message.channel.send(`${args[0].slice(0,21)} je zaradio 25 poena!!!`);
 	}

  	if (command === "-rep"){
  		sql.get(`SELECT * FROM scores WHERE userId ="${args[0].slice(2,20)}"`).then(row => {
    	if (!row) {
      		sql.run("INSERT INTO scores (userId, reputation) VALUES (?, ?)", [args[0].slice(2,20), -15]);
    	} else {
      		sql.run(`UPDATE scores SET reputation = ${row.reputation - 15} WHERE userId = ${args[0].slice(2,20)}`);
    	}
  		}).catch(() => {
    		console.error;
      		sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, reputation INTEGER)").then(() => {
      		sql.run("INSERT INTO scores (userId, reputation) VALUES (?, ?)", [args[0].slice(2,20)]);
    		});
  		});
  		message.channel.send(`${args[0].slice(0,21)} je izgubio 15 poena!!!`)
 	}

 	if(command === "rep"){
    	sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
      	if (!row) return message.reply("Tvoja reputacija je 0!");
      		message.reply(`Tvoja reputacija je ${row.reputation}!`);
    	});
  	}

 	if(command === "showrep"){
    sql.get(`SELECT * FROM scores WHERE userId ="${args[0].slice(2,20)}"`).then(row => {
    	if (!row) return message.reply(`${args[0].slice(0,21)} ima reputaciju 0!`);
      		message.reply(`${args[0].slice(0,21)} ima reputaciju ${row.reputation}!`);
    	});
  	} 
})

client.login(config.token);