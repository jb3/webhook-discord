# Discord Webhooks
![version](https://img.shields.io/npm/v/npm.svg "Version")
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