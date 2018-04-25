# Discord Webhooks
![version](https://img.shields.io/npm/v/webhook-discord.svg "Version")
![npm](https://img.shields.io/npm/dt/webhook-discord.svg "Total Downloads")
A simple Javascript file for nicely formatting Discord webhooks

# Usage
It's simple

To initialise:
```js
const Webhook = require("webhook-discord")

const Hook = new Webhook("WEBHOOK URL")
```

To send an info message:
```js
Hook.info("WEBHOOK NAME","Info")
```

To send a warning message:
```js
Hook.warn("WEBHOOK NAME", "Warning message")
```

To send an error message:
```js
Hook.err("WEBHOOK NAME","Error")
```

To send a success message:
```js
Hook.success("WEBHOOK NAME","Yay we did something right")
```

To send a message with a custom format:
```js
Hook.custom("WEBHOOK NAME","MESSAGE CONTENT","MESSAGE TITLE","MESSAGE COLOUR (optional)", "IMAGE URL (optional)")
```

To send a message with a custom format and an image:
```js
Hook.illustrated("WEBHOOK NAME","MESSAGE CONTENT","MESSAGE TITLE", "IMAGE URL")
```

If specified, color *must* be a hexadecimal color.

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


