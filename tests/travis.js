var WebhookCreator = require("../")
var Hook = new WebhookCreator(process.env.WEBHOOK_URL)

Hook.success("Travis","Testing all message types")
Hook.error("Travis","Testing all message types")
Hook.info("Travis","Testing all message types")
Hook.warning("Travis","Testing all message types")
Hook.custom("Travis","Testing all message types","Travis","#ff00b2")

process.exit(0)