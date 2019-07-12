# Discord Webhooks
![version](https://img.shields.io/npm/v/webhook-discord.svg "Version")
![npm](https://img.shields.io/npm/dt/webhook-discord.svg "Total Downloads")

A Node.js package for easily creating formatted Discord webhooks. Forked from [jos-b/webhook-discord](https://github.com/jos-b/webhook-discord).

# Usage
It's simple

To initialise:
```js
const { Webhook}  = require('webhook-discord')

const hook = new Webhook('WEBHOOK URL')
```

## Presets

To send an info message:
```js
hook.info('WEBHOOK NAME','Info')
```

To send a warning message:
```js
hook.warn('WEBHOOK NAME', 'Warning message')
```

To send an error message:
```js
hook.error('WEBHOOK NAME','Error')
```

To send a success message:
```js
hook.success('WEBHOOK NAME','Yay we did something right')
```

## Custom messages

To send custom messages, you should make use of MessageBuilder.

```js
const { Webhook, MessageBuilder } = require('webhook-discord');

const hook = new Webhook('WEBHOOK URL');

const msg = new MessageBuilder()
    .setName('Username')
    .setAuthor('webhook-discord', 'https://github.com/acollierr17/webhook-discord', 'https://i.imgur.com/lKczpai.png') // name, url, icon
    .setColor('#dd9323')
    .setContent('This is going to be the coolest package yo!')
    .setDescription('Guess what? We\'re in the embed now!')
    .addField('Note', 'Adding a note to this bro.')
    .addField('Rank', 'Dank Owner')
    .setImage('Link your dank memes here 👍')
    .setTimestamp();

hook.send(msg);
```

### Example

To see an example on how this package functions, check out the `example.js` file.

# Installation
Either use `npm`: (if wishing to install the original)
```
npm install webhook-discord
```
Or clone from source:
```
git clone https://github.com/acollierr17/webhook-discord.git
```

# License

MIT
