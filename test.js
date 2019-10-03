const webhook = require(".")
const WebhookURL = "https://canary.discordapp.com/api/webhooks/629103897683820545/JEVj_R_Z-ytY0RQw4JoUFYY6zi84GvxcWph6kUi3-fmLWLDMKjNW_9ljZ1L3rsdPz1fK"

let Hook = new webhook.Webhook(WebhookURL)
const msg = new webhook.MessageBuilder()
    .setName("Webhook name")
    .setAvatar("https://icon-library.net/images/transparent-discord-icon/transparent-discord-icon-27.jpg")
    .setText("Message")

Hook.send(msg)
