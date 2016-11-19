var WebhookCreator = require("../")
var Hook = new WebhookCreator(process.env.WEBHOOK_URL)

setTimeout(function(){

Hook.success("Travis","Testing all message types")
Hook.error("Travis","Testing all message types")
Hook.info("Travis","Testing all message types")
Hook.warn("Travis","Testing all message types")
Hook.custom("Travis","Testing all message types","Travis","#ff00b2")

},5000)

setTimeout(function(){
	process.exit(0)
},15000)