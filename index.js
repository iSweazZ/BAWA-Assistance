const Discord = require('discord.js');

const Bot = new Discord.Client();

Bot.on('ready', () => {

Bot.user.setPresence({ game: { name: ':D Vive BAWA Games', type: 0 } });
console.log("Bot en ligne");

});

Bot.login('NDczNDgxNzI1OTk4MDA2Mjgy.DkDJKg.LriabaAvdEnLqK9Nwny1wA58ZCE')


Bot.on('message', message => {

    var commande = "*";
    var existe = "0"

    if (message.content.toLowerCase().startsWith(commande + "hello")){//Bonjour
        
        message.channel.send("Salut " + message.member.displayName + " Permission(s): " + message.member.permissions.hasPermission("ADMINISTRATOR"));
        
    }
    
    if (message.content.toLowerCase().startsWith(commande + "arret")){ //permet d'arrêter le bot depuis le chat
        
        message.reply("Vérification des conditions...");
        if(message.member.hasPermission("ADMINISTRATOR")){
            message.reply("Bien reçu, je me déconnecte!");
           setTimeout(() => {
               console.log("Déconnexion demandée par: " + message.member.displayName)
               Bot.destroy();//déconnecte le bot et arrête le script
           }, 2000);
        }else{
            message.reply("La commande que vous tentez d'effectuer nécessite des droits que vous ne possédez pas!");
        }
        
    }

    var help_embed = new Discord.RichEmbed()

    if (message.content.toLowerCase().startsWith(commande + "help")){
        help_embed.setColor('#1801F7')
        help_embed.addField("Commande du bot BAWA Assistance", "*help : Afficher les commandes \n *hello : pour me dire bonjour")
        help_embed.addField("Intéragir avec le bot", "*game: modifier le nom du jeu (bot)")
        if (message.member.hasPermission('ADMINISTRATOR')){
        help_embed.setColor('#FD0103')
        help_embed.addField("Commande BAWA Assistance (Admin)", "*arret pour arrêter le bot")
        }
        message.channel.sendEmbed(help_embed)
    }
        

    if (message.content.toLowerCase().startsWith(commande + "game")){
        let jeu = message.content.split(' ')
        jeu.shift()
        jeu = jeu.join(' ')
        Bot.user.setPresence({ game: { name: jeu, type: 0 } });
      }
});
