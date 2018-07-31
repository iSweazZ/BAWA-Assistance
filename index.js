const Discord = require('discord.js');

const Bot = new Discord.Client();

var dernier_message = new Array()

Bot.on('ready', () => {

Bot.user.setPresence({ game: { name: 'Vive BAWA musique :D', type: 0 } });
console.log("Bot musique en ligne");

});

Bot.login('NDczNjAxMzMwMDkxNjU1MTg4.DkEUCA.V4IbQkeAK5jTeOXKMbLgwYdry4c')


Bot.on('message', message => {

    console.log(message.channel.name.toLowerCase() + " , " + message.channel.name.toLowerCase() == "général")
    if (message.channel.name.toLowerCase() == "général"){
    
    var commande = "!";

    if (message.content.toLowerCase().startsWith(commande + "hello")){//Bonjour
        
        message.channel.send("Salut " + message.member.displayName + ", je suis heureux de te voir :)");
        
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
        help_embed.addField("Commande du bot BAWA Musique", "!help : Afficher les commandes \n !hello : pour me dire bonjour \n !musique + url : joue la musique présente à l'URL indiqué \n !sa vas : demander si le bot va bien \n !oui : donner une réponse positive au bot \n !non : donner une réponse négative au bot")        
        help_embed.addField("Intéragir avec le bot", "!game: modifier le nom du jeu (bot)")
        if (message.member.hasPermission('ADMINISTRATOR')){
        help_embed.setColor('#FD0103')
        help_embed.addField("Commande BAWA Assistance (Admin)", "!arret pour arrêter le bot")
        }
        message.channel.sendEmbed(help_embed)
    }
        

    if (message.content.toLowerCase().startsWith(commande + "game")){
        let jeu = message.content.split(' ')
        jeu.shift()
        jeu = jeu.join(' ')
        Bot.user.setPresence({ game: { name: jeu, type: 0 } });
    }
    
    

    if (message.content.toLowerCase().startsWith(commande + "sa vas")){
        var index = 0
        var phrase = new Array("je vais bien et toi?", "Je vais bien, merci de te soucier de moi :)", "Je vais parfaitement bien, si tu veux de la musique dis le moi ;)")
        index = getRandomInt(0, 3);
        console.log(index)
        dernier_message[0] = phrase[index]
        dernier_message[1] = message.member.displayName
        console.log(dernier_message[0])
        message.reply(dernier_message[0]);
        if (index == 0){
            console.log(dernier_message[0] + " " + dernier_message[1])
        }
    }

    if (dernier_message[0] == "je vais bien et toi?" && dernier_message[1] == message.member.displayName){
        if (message.content.toLowerCase().startsWith(commande + "oui")){
        console.log("répondu oui")
        message.reply("Je suis heureux de savoir que toi aussi, tu aille bien :)");
        dernier_message[0] = ""
        }else if ((message.content.toLowerCase().startsWith(commande + "non"))){
            message.reply("Je suis désolé de savoir que tu vas mal :( mais donne moi un URL de musique pour tu remonter le moral :)")
            dernier_message[0] = ""
        }
    }


    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      }
    }
});
