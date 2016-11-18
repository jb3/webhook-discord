var Discord = require("discord.js")


function Webhook(url){
	this.discord = require("discord.js")
	this.url = url
	this.id = this.url.split("/")[5]
	this.token = this.url.split("/")[6]
	this.webhook = new this.discord.WebhookClient(this.id,this.token)
	this.error = function(name,msg){

		try{
		this.webhook.sendSlackMessage({
	"username":name,
	"text":"[]()",
	"attachments":[{
		"color":"#ff0000",
		"fields":[{
			"title":"Bot error",
			"value":"`"+msg+"`"
		}],
		"ts":new Date() / 1000
	}]
	
})
	}catch(err){
		console.log("Error: "+err.stack)
	}
	}
	this.info = function(name,msg){

		try{
		this.webhook.sendSlackMessage({
	"username":name,
	"text":"[]()",
	"attachments":[{
		"color":"#00fffa",
		"fields":[{
			"title":"Bot information",
			"value":msg
		}],
		"ts":new Date() / 1000
	}]
	
})
	}catch(err){
		console.log("Error: "+err.stack)
	}
	}
	this.success = function(name,msg){

		try{
		this.webhook.sendSlackMessage({
	"username":name,
	"text":"[]()",
	"attachments":[{
		"color":"#04ff00",
		"fields":[{
			"title":"Bot success",
			"value":msg
		}],
		"ts":new Date() / 1000
	}]
	
})
	}catch(err){
		console.log("Error: "+err.stack)
	}
	}

}

module.exports = Webhook