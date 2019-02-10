const { Webhook, MessageBuilder } = require('./lib');
const webHookURL = 'WEBHOOK URL';

const hook = new Webhook(webHookURL, true);

const sendToDiscord = new MessageBuilder()
    .setName('Nerd')
    .setContent('This is a cool message yo.')
    .setAuthor('anthony#8577', 'https://thenerdcave.us', 'https://cdn.discordapp.com/avatars/158063324699951104/d33751cec232a05f64a182f1aecef5aa.png')
    .setDescription('Hello world!')
    .setColor('#dd9323')
    .setFooter('And this is the footer!')
    .setTimestamp();

hook.send(sendToDiscord);

process.on('uncaughtException', (err) => {
    const msg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
    console.error(`Uncaught Exception: \n ${msg}`);
    process.exit(1);
});

process.on('unhandledRejection', err => {
    let msg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
	console.error(`Unhandled Rejection: \n ${msg}`);
});