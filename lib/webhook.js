var Discord = require("discord.js")
var request = require("request")

function Webhook(url) {
    this.discord = require("discord.js")
    this.url = url
    request(this.url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    this.rawData = JSON.parse(body)
    this.id = this.rawData.id
    this.token = this.rawData.token
  }
})
    this.webhook = new this.discord.WebhookClient(this.id, this.token)
    this.error = function(name, msg) {

        try {
            this.webhook.sendSlackMessage({
                "username": name,
                "text": "[]()",
                "attachments": [{
                    "color": "#ff0000",
                    "fields": [{
                        "title": "Error",
                        "value": "`" + msg + "`"
                    }],
                    "ts": new Date() / 1000
                }]
            })
        } catch (err) {
            console.log("Error: " + err.stack)
        }
    }
    this.info = function(name, msg) {
        try {
            this.webhook.sendSlackMessage({
                "username": name,
                "text": "[]()",
                "attachments": [{
                    "color": "#00fffa",
                    "fields": [{
                        "title": "Information",
                        "value": msg
                    }],
                    "ts": new Date() / 1000
                }]
            })
        } catch (err) {
            console.log("Error: " + err.stack)
        }
    }
    this.success = function(name, msg) {
        try {
            this.webhook.sendSlackMessage({
                "username": name,
                "text": "[]()",
                "attachments": [{
                    "color": "#04ff00",
                    "fields": [{
                        "title": "Success",
                        "value": msg
                    }],
                    "ts": new Date() / 1000
                }]
            })
        } catch (err) {
            console.log("Error: " + err.stack)
        }
    }
    this.warn = function(name, msg) {
        try {
            this.webhook.sendSlackMessage({
                "username": name,
                "text": "[]()",
                "attachments": [{
                    "color": "#ffe900",
                    "fields": [{
                        "title": "Warning",
                        "value": msg
                    }],
                    "ts": new Date() / 1000
                }]
            })
        } catch (err) {
            console.log("Error: " + err.stack)
        }
    }
    this.custom = function(name,msg,title,color){
        if(color){
            var data = {
                "username": name,
                "text": "[]()",
                "attachments": [{
                    "color": color,
                    "fields": [{
                        "title": title,
                        "value": msg
                    }],
                    "ts": new Date() / 1000
                }]
            }
        }else{
            var data = {
                "username": name,
                "text": "[]()",
                "attachments": [{
                    
                    "fields": [{
                        "title": title,
                        "value": msg
                    }],
                    "ts": new Date() / 1000
                }]
            }
        }
        
        this.webhook.sendSlackMessage(data)
    }

}
module.exports = Webhook
