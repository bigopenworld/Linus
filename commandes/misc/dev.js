const { MessageEmbed } = require("discord.js"), 
fs = require("fs"), 
ms = require("ms"),
getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };

function update(message, db) {
    fs.writeFile(`./serveur/${message.guild.id}.json`, JSON.stringify(db), (x) => {
        if (x) console.error(x)
      });
};

module.exports.run = async (client, message, args) => {
    if(!message.guild) return;
   let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8")),
   filter = (reaction, user) => ['1️⃣', '2️⃣','3️⃣','❌'].includes(reaction.emoji.name) && user.id === message.author.id,
   dureefiltrer = response => { return response.author.id === message.author.id };

   const msgembed = new MessageEmbed()
   .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))
    .setAuthor(message.author.username , message.author.displayAvatarURL({dynamic: true}))
       .setColor(db.color)
       .setTitle(`Appuyez sur une réaction pour voir les informations d'un des créateur du bot.       `)
   .setDescription("`1️⃣` Apoo\n`2️⃣` Warstrolo\n`3️⃣` Scythe  ❌` Annuler")
   .setTimestamp()  
   

    message.channel.send(msgembed)
    .then(async m => { 
const collector = m.createReactionCollector(filter, { time: 900000 });
collector.on('collect', async r => { 
if(r.emoji.name === "1️⃣") {
    const msgembede = new MessageEmbed()
    .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))
    .setAuthor(message.author.username , message.author.displayAvatarURL({dynamic: true}))
       .setColor(db.color)
       .setTimestamp()  
       .setDescription(`**Apoo**\n<:github:845325036931645460> **Github**\n[apoo](https://github.com/apoow3b)\n<:sz:845284029237821490> **Discord**\n[Apoo.#0112](https://discordapp.com/users/758561030644170752)`)
         

      message.channel.send(msgembede)
    } else if(r.emoji.name === '2️⃣') {
        const msgembedee = new MessageEmbed()
        .setFooter(client.user.username,client.user.displayAvatarURL({dynamic : true }))
        .setAuthor(message.author.username , message.author.displayAvatarURL({dynamic: true}))
           .setColor(db.color)
           .setTimestamp()  

           .setDescription(`**Warstrolo**\n<:github:845325036931645460> **Github**\n[Warstrolo](https://github.com/warstrolo)\n<:sz:845284029237821490> **Discord**\n[Warstrolo#5463](https://discordapp.com/users/569815977924231168)`)

          message.channel.send(msgembedee)

    } else if(r.emoji.name === '❌') {
      m.delete()
    }
});
await m.react("1️⃣")
await m.react("2️⃣")
await m.react("❌")
    });
};


module.exports.help = {
    name: "owner",
    aliases: ['dev'],
    category: 'Gestion de serveur',
    description: "- Permet d'afficher le panel de configuration de l'autorole.",
  };