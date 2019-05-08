const {Webhook, MessageBuilder} = require(".")

let webhook = new Webhook("https://canary.discordapp.com/api/webhooks/532699965361881108/czPhhjavMIZ1ybiD4pNUxSEn7uJiEvxZLwjIPtHYD4NGcF6i8Yk9LK0lnnmJx89T-RLQ")

var msg = new MessageBuilder()
                        .setName("Task created")
                        .setText("A task is created")
                        .setColor("#d80f0f")
                        .addField("Website", "blah")
                        .addField("Link", "blah")
                        .addField("Proxy", "blah")
                        .addField("Size", "blah")
                        .setTime();
webhook.send(msg);
