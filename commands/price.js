const fetch = require("node-fetch");

module.exports = {
	name: 'price',
	description: 'Display first two results on Mercadolibre.',
	execute(message, args, client, Discord) {
        (async () => {

            const response = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${args.join(" ")}&limit=2`);
            const json = await response.json();
            const product1 = json.results[0];
            const product2 = json.results[1];

            const embedMessage = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Mercadolibre:`)
                .setThumbnail(product1.thumbnail)
                .setURL(product1.permalink)
                .addFields(
                    { name: product1.title, value: `${product1.currency_id} ${(product1.price).toFixed(2)}` },
                );

            const embedMessage2 = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Mercadolibre:`)
                .setThumbnail(product2.thumbnail)
                .setURL(product1.permalink)
                .addFields(
                    { name: product2.title, value: `${product2.currency_id} ${(product2.price).toFixed(2)}` },
                );
            
            message.channel.send(embedMessage);
            message.channel.send(embedMessage2);
        })();
	},
};