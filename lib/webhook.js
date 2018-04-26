const snekfetch = require("snekfetch");
const endpoint = "https://discordapp.com/api/v6/webhooks";

class Webhook {
    /**
    @constructor
    @param {string} url The webhooks url.
    */
    constructor(url) {
        this.url = url;
        this.id = '';
        this.token = '';
        this.meta = {};
        snekfetch.get(this.url)
            .then((res) => {
                let parsed = JSON.parse(res.text);
                Object.assign(this.meta, parsed);
                this.id = parsed['id'];
                this.token = parsed['token'];
            })
            .catch((err) => {
                throw err;
            })
    }
    /**
    @param {string} payload The payload to send.
    */    
    sendPayload(payload) {
        return new Promise((resolve, reject) => {
            snekfetch.post(this.endpoint)
                .send(payload)
                .then(() => {
                    resolve()
                })
                .catch((err) => {
                    reject(err.text)
                })
        });
    }

    /**
    @returns {string} The endpoint of the webhook.
    */
    get endpoint() {
        return `${endpoint}/${this.id}/${this.token}/slack`
    }

    /**
    @param {string} name The username of the error webhook.
    @param {string} message The message of the errorwebhook.
    */
    err(name, message) {
        let payload = {
            "username": name,
            "text": "[]()",
            "attachments": [{
                "color": "#ff0000",
                "fields": [{
                    "title": "Error",
                    "value": message
                }],
                "ts": new Date() / 1000
            }]
        };

        return this.sendPayload(payload);
    }
    
    /**
    @param {string} name The username of the info webhook.
    @param {string} message The message of the info webhook.
    */
    info(name, message) {
        let payload = {
            "username": name,
            "text": "[]()",
            "attachments": [{
                "color": "#00fffa",
                "fields": [{
                    "title": "Information",
                    "value": message
                }],
                "ts": new Date() / 1000
            }]
        };

        return this.sendPayload(payload)
    }
    /**
    @param {string} name The username of the success webhook.
    @param {string} message The message of the success webhook.
    */
    success(name, message) {
        let payload = {
            "username": name,
            "text": "[]()",
            "attachments": [{
                "color": "#04ff00",
                "fields": [{
                    "title": "Success",
                    "value": message
                }],
                "ts": new Date() / 1000
            }]
        };

        return this.sendPayload(payload);
    }
    /**
    @param {string} name The username of the warning webhook.
    @param {string} message The message of the warning webhook.
    */
    warn(name, message){
        let payload = {
            "username": name,
            "text": "[]()",
            "attachments": [{
                "color": "#ffe900",
                "fields": [{
                    "title": "Warning",
                    "value": message
                }],
                "ts": new Date() / 1000
            }]
        };

        return this.sendPayload(payload);
    }
    /**
    @param {string} name The username of the custom webhook.
    @param {string} message The message of the custom webhook.
    @param {string} title The title of the custom webhook.
    @param {string} color The color of the custom webhook.
    */
    custom(name, message, title, color){
        let payload;
        if(color){
            payload = {
                "username": name,
                "text": "[]()",
                "attachments": [{
                    "color": color,
                    "fields": [{
                        "title": title,
                        "value": message
                    }],
                    "ts": new Date() / 1000
                }]
            }
        }else{
            payload = {
                "username": name,
                "text": "[]()",
                "attachments": [{

                    "fields": [{
                        "title": title,
                        "value": message
                    }],
                    "ts": new Date() / 1000
                }]
            }
        }

        return this.sendPayload(payload);
    }
}

module.exports = Webhook;
