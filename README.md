# Discord Webhooks
![version](https://img.shields.io/npm/v/webhook-discord.svg "Version")
<br/>
![build](https://img.shields.io/travis/JoeBanks13/webhook-discord.svg "Build status")
<br/>
![npm](https://img.shields.io/npm/dt/webhook-discord.svg "Total Downloads")
<br/>
<br/>
A simple Javascript file for nicely formatting Discord webhooks

# Usage
It's simple

To initialise:
```js
var Webhook = require("webhook-discord")

var Hook = new Webhook("WEBHOOK URL")
```

To send an info message:
```js
Hook.info("WEBHOOK NAME","Info")
```

To send an error message:
```js
Hook.error("WEBHOOK NAME","Error")
```

To send a success message:
```js
Hook.success("WEBHOOK NAME","Yay we did something right")
```

To send a message with a custom format:
```js
Hook.custom("WEBHOOK NAME","MESSAGE CONTENT","MESSAGE TITLE","MESSAGE COLOUR (optional)")
```

This is 100% compatible with any JS based discord bot scripts, this is a example of a [Discord.js](http://npmjs.com/package/discord.js "Discord.js NPM Link") bot

```js
const Discord = require("discord.js")
const Bot = new Discord.Client()
var prefix = "!"

const Webhook = require("webhook-discord")
const Hook = new Webhook("YOUR WEBHOOK URL")

Bot.on("ready", () => {
	Hook.success(Bot.user.username,"Bot is online and ready in "+Bot.guilds.size+" servers")
})

Bot.on("message", (msg) => {

	if(msg.content.startsWith(prefix + "ping")){
	Hook.info(Bot.user.username, msg.author.username + " executed "+msg.cleanContent+" in "+msg.guild.name)
}

})

Bot.on("error",(e) => {
Hook.error(Bot.user.username, e)
})

Bot.on("warn",(w) => {
	Hook.warn(Bot.user.username,"Warning: `"+w+"`")
})

Bot.login("token").then(() => {
	Hook.info("Bot Daemon","Logged in")
})
```

The hook will be ready before the bot is so we can tell when the bot logs in and when the bot is ready

# Installation
Either use npm:
```
npm install webhook-discord
```
Or clone from source:
```
git clone https://github.com/JoeBanks13/webhook-discord.git
```

# License

MIT


