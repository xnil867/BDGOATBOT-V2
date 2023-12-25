const axios = require('axios');

module.exports = {
	config: {
		name: 'claire',
		version: '2.5',
		author: 'JV Barcenas && LiANE For AI', // do not change
		credits: 'JV Barcenas && LiANE For AI', // do not change
		role: 0,
		usePrefix: true,
		hasPermission: 2,
		category: 'Ai - Chat',
		commandCategory: 'Ai - Chat',
		description: 'Baliw na babaeng ai',
		usages: '[prompt]',
		shortDescription: {
			en: 'Baliw na babaeng ai',
		},
		longDescription: {
			en: 'Baliw na babaeng ai',
		},
		guide: {
			en: '{pn} [prompt]',
		},
	},
	onStart: function () {},
	onChat: async function (context) {
		const { api, event, message } = context;
if (!event.body.toLowerCase().startsWith("ai ")) {
return;
}
let mid = ``;
message.reply(`Claire is answering your question, please wait..`, (err, info) => {
mid = info.messageID;
});
		try {
			//const prompt = event.body.trim();
			const [cmd, ...args] = event.body.split(" ");
			const prompt = args.join(" ");
			if (prompt) {


				const response = await axios.get(`https://school-project-lianefca.bene-edu-ph` + `.repl.co/` + `ask/claire?query=${encodeURIComponent(prompt)}`);

				if (response.data) {
					const messageText = response.data.message;
					await api.sendMessage(messageText, event.threadID, event.messageID);
message.unsend(mid);

					console.log('Sent answer as a reply to the user');
				} else {
					throw new Error('Invalid or missing response from API');
				}
			}
		} catch (error) {
			console.error(`Failed to get an answer: ${error.message}`);
			api.sendMessage(
				`${error.message}.\n\nYou can try typing your question again or resending it, as there might be a bug from the server that's causing the problem. It might resolve the issue.`,
				event.threadID
			);
		}
	},
	run: async function (context) {
		module.exports.onStart(context);
	}
};