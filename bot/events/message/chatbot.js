const { Events } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: process.env.AI_API
});
const fetch = require('node-fetch');
const chalk = require('chalk');
module.exports = {
  name: Events.MessageCreate,
  async execute(Anya, message) {
    if (message.channel.id === '1090377338065272873') {
      if(message.author.bot) return;
      
          const openai = new OpenAIApi(configuration);
          const input = message.content.split(' ').slice(0);
          
          const completion = await openai.createCompletion({
            model: 'text-davinci-003',
            max_tokens: 2048,
            temperature: 0.9,
            prompt: `ChatGpt is a friendly chatbot.\n\
	ChatGPT: Hello there!\n\
${message.member.user.username}: ${input}\n\
ChatGPT:`,
            stop: ['ChatGPT', `${message.member.user.username}`]
          });
          const res = completion.data.choices[0].text;
          message.reply({
            content: res,
            allowedMentions: {
              repliedUser: false
            }
          });
        }
      
  }
};
