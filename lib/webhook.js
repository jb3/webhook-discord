const request = require("request")
const endpoint = "https://discordapp.com/api/"

function Webhook(uri) {
    
    this.url = uri
this.id = ""
this.token = ""
    request(this.url, function (error, response, body) {
        if(error){
            console.log("Could not get webhook info: "+error)
            return
        }
   try{
    rawData = JSON.parse(body)
    
    global.webhook = {}
    webhook.token = rawData.token
    webhook.id = rawData.id
    webhook.guild_id = rawData.guild_id
    webhook.channel_id = rawData.channel_id
    webhook.name = rawData.name
    webhook.avatar = rawData.avatar
    console.log("Created webhook with token: "+token+" and ID: "+id)
    
    return "Creating webhook"
}catch(err){
    console.log("Could not create webhook: "+err.stack)
}
})
    
    
    
    
    this.error = function(name, msg) {

        try {
            var d = {
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
            }
            request({
      url:endpoint+"webhooks/"+webhook.id+"/"+webhook.token+"/slack",
      method:"POST",
      body:d,
      json:true
    }, (e,r,b) => {
      if (e) throw e;
  
    });
        } catch (err) {
            console.log("Error: " + err.stack)
        }
        
    }
    this.info = function(name, msg) {
        try {
            var d = {
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
            }

            request({
      url:endpoint+"webhooks/"+webhook.id+"/"+webhook.token+"/slack",
      method:"POST",
      body:d,
      json:true
    }, (e,r,b) => {
      if (e) throw e;
    });
        } catch (err) {
            console.log("Error: " + err.stack)
        }
    }
    this.success = function(name, msg) {
        try {
            var d = {
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
            }
            request({
      url:endpoint+"webhooks/"+webhook.id+"/"+webhook.token+"/slack",
      method:"POST",
      body:d,
      json:true
    }, (e,r,b) => {
      if (e) throw e;
    });
        } catch (err) {
            console.log("Error: " + err.stack)
        }
        
    }
    this.warn = function(name, msg) {
        try {
            var d = {
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
            }
            request({
      url:endpoint+"webhooks/"+webhook.id+"/"+webhook.token+"/slack",
      method:"POST",
      body:d,
      json:true
    }, (e,r,b) => {
      if (e) throw e;
    });
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
        
        request({
      url:endpoint+"webhooks/"+webhook.id+"/"+webhook.token+"/slack",
      method:"POST",
      body:data,
      json:true
    }, (e,r,b) => {
      if (e) throw e;
    });
        
    }

}
module.exports = Webhook
