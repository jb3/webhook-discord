var Webhook = require("webhook-discord")

var Hook = new Webhook(process.env.WEBHOOK_URL)

Hook.success("Travis","Travis build is running...")

