var Webhook = require("/home/travis/builds/JoeBanks13/webhook-discord/")

var Hook = new Webhook(process.env.WEBHOOK_URL)

Hook.success("Travis","Travis build is running...")

