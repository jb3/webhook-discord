const snekfetch = require("snekfetch");
const endpoint = "https://discordapp.com/api/v6/webhooks";

class Webhook {
    /**
    @constructor
    @param {string} url The webhooks url.
    */
    constructor(url) {
        this.url = url;
        this.id = "";
        this.token = "";
        this.meta = {};
        this.ready = false;
        snekfetch.get(this.url)
            .then((res) => {
                let parsed = JSON.parse(res.text);
                Object.assign(this.meta, parsed);
                this.id = parsed.id;
                this.token = parsed.token;
                this.ready = true;
            })
            .catch((err) => {
                throw err;
            });
    }

    /**
    Verify the name of a webhook.

    @param {string} name The name of the webhook
    */
    verifyName(name) {
        if (name.length > 32) {
            throw new Error(`The name specified was ${name.length} characters. Discord webhook names must be under 32 characters`);
        }
    }

    /**
    Verify the message of a webhook.

    @param {string} message The message of the webhook in "text" property
    */

    verifyText(message){
        if(message.length > 2000){
            throw new Error(`The message specified was ${message.length} characters. Discord webhook message must be under 2000 characters`);
        }
    }

    /**
    @param {object} payload The payload to send.
    */
    sendPayload(payload) {
        this.verifyName(payload.username);
        if (this.ready) {
            return new Promise((resolve, reject) => {
                snekfetch.post(this.endpoint)
                    .send(payload)
                    .then(() => {
                        resolve();
                    })
                    .catch((err) => {
                        let e = JSON.parse(err.text);
                        if (e.retry_after) { // We are being ratelimited
                            setTimeout(() => {
                                this.sendPayload(payload);
                            }, e.retry_after);
                        } else {
                            reject(err);
                        }
                    });
            });
        } else {
            setTimeout(() => {
                this.sendPayload(payload);
            }, 10);
        }
    }

    /**
    @returns {string} The endpoint of the webhook.
    */
    get endpoint() {
        return `${endpoint}/${this.id}/${this.token}/slack`;
    }

    /**
    @param {string} name The username of the error webhook.
    @param {string} message The message of the error webhook.
    */
    err(name, message) {
        let payload = {
            "username": name,
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
            "attachments": [{
                "color": "#00fffa",
                "fields": [{
                    "title": "Information",
                    "value": message
                }],
                "ts": new Date() / 1000
            }]
        };

        return this.sendPayload(payload);
    }
    /**
    @param {string} name The username of the success webhook.
    @param {string} message The message of the success webhook.
    */
    success(name, message) {
        let payload = {
            "username": name,
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
    warn(name, message) {
        let payload = {
            "username": name,
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
    @param {string} color The color of the custom webhook. (optional)
    @param {string} imageUrl The url of the image to attach (optional)
    */
    custom(name, message, title, color, imageUrl) {
        let payload = {
            "username": name,
            "attachments": [{
                "fields": [{
                    "title": title,
                    "value": message
                }],
                "ts": new Date() / 1000
            }]
        };
        if (color) {
            payload.attachments[0].color = color;
        }
        if (imageUrl) {
            payload.attachments[0].image_url = imageUrl;
        }
        return this.sendPayload(payload);
    }

    /**
    @param {string} name The username of the webhook
    @param {string} message The message for the webhook to send
    @param {string} title The title of the message
    @param {string} imageUrl The URL of the image to attach
    */
    image(name, message, title, imageUrl) {
        let payload = {
            "username": name,
            "attachments": [{
                "fields": [{
                    "title": title,
                    "value": message
                }],
                "ts": new Date() / 1000,
                "image_url": imageUrl
            }]
        };

        return this.sendPayload(payload);
    }

    /**
    @param {string} name The username of the webhook
    @param {string} message The message for the webhook to send
    @param {string} url The URL of the link to attach
    */

   link(name, message, url){
       let text = message + " - "+url;
        this.verifyText(text);
        let payload = {
            "username": name,
            "text": text
        };
        return this.sendPayload(payload)
    }
}

module.exports = Webhook;
