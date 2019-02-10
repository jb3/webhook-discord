const MessageBuilder = require("./builder");

const snekfetch = require("snekfetch");
const util = require("util");

const endpoint = "https://discordapp.com/api/v6/webhooks";

class Webhook {
    /**
    @constructor
    @param {string} url The webhooks url.
    */
    constructor(url, nowait = false) {
        this.url = url;
        this.id = "";
        this.token = "";
        this.meta = {};
        this.ready = false;
        this.nowait = nowait;
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
    @param {object} payloadRaw The payload to send.
    @param {function} resolveFunction Used internally for ratelimiting handling
    */
    sendPayload(payloadRaw, resolveFunction) {
        let payload = this.sanitiseEmbeds(payloadRaw);
        this.verifyName(payload.username);
        if (this.ready) {
            return new Promise((resolve, reject) => {
                snekfetch.post(this.endpoint)
                    .send(payload)
                    .then(() => {
                        if (resolveFunction) {
                            resolveFunction();
                        }

                        resolve();
                    })
                    .catch((err) => {
                        let e = JSON.parse(err.text);

                        if (e.code === 50006) { // We've sent an empty message
                            reject({error: "No content specified"});
                        }

                        if (e.retry_after) { // We are being ratelimited
                            setTimeout(() => {
                                this.sendPayload(payload, resolve);
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
        let qs = "";
        if(this.nowait){
            qs = "?wait=false";
        }
        return `${endpoint}/${this.id}/${this.token}/slack${qs}`;
    }

    /**
    @param {string} name The username of the error webhook.
    @param {string} message The message of the error webhook.
    */
    err(name, message) {
        let payload = {
            "username": name,
            // "attachments": [{
            "embeds": [{
                "color": "#ff0000",
                "fields": [{
                    "title": "Error",
                    "value": message
                }],
                // "ts": new Date() / 1000
                "timestamp": new Date() / 1000
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
            // "attachments": [{
            "embeds": [{
                "color": "#00fffa",
                "fields": [{
                    "title": "Information",
                    "value": message
                }],
                // "ts": new Date() / 1000
                "timestamp": new Date() / 1000
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
            // "attachments": [{
            "embeds": [{
                "color": "#04ff00",
                "fields": [{
                    "title": "Success",
                    "value": message
                }],
                // "ts": new Date() / 1000
                "timestamp": new Date() / 1000
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
            // "attachments": [{
            "embeds": [{
                "color": "#ffe900",
                "fields": [{
                    "title": "Warning",
                    "value": message
                }],
                // "ts": new Date() / 1000
                "timestamp": new Date() / 1000
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
            // "attachments": [{
            "embeds": [{
                "fields": [{
                    "title": title,
                    "value": message
                }],
                // "ts": new Date() / 1000
                "timestamp": new Date() / 1000
            }]
        };
        if (color) {
            // payload.attachments[0].color = color;
            payload.embeds.color = color;
        }
        if (imageUrl) {
            // payload.attachments[0].image_url = imageUrl;
            payload.embeds.image_url = imageUrl;
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
            // "attachments": [{
            "embeds": [{
                "fields": [{
                    "title": title,
                    "value": message
                }],
                // "ts": new Date() / 1000,
                "timestamp": new Date() / 1000,
                "image_url": imageUrl
            }]
        };

        return this.sendPayload(payload);
    }

    /**
     * Remove embeds from a message if only text is specified
     *
     * @param {Object} data The Discord webhook data
     */
    sanitiseEmbeds(data) {
        // Need to copy a derefenced object so we don't touch the messagebuilder
        let newPayload = Object.assign({}, data);

        if (data.attachments.length > 0) {
            if (
                // Object.keys(data.attachments[0]).length > 1 ||
                // data.attachments[0].fields.length > 0
                Object.keys(data.embeds.length) ||
                data.embeds.fields.length > 0
            ) {
                // There is an embed
                return newPayload;
            } else {
                // No embeds
                // newPayload.attachments = [];
                newPayload.embeds = [];
                return newPayload;
            }
        } else {
            return newPayload;
        }
    }

    /**
     * This method is used to send a MessageBuilder to the webhook.
     *
     * @param {MessageBuilder} messageBuilder The message.
     */
    send(messageBuilder) {
        return new Promise((resolve, reject) => {
            if (
                // messageBuilder.data.text // Check for any text
                messageBuilder.data.content // Check for any text
            ) {
                return this.sendPayload(messageBuilder.data, resolve);
            } else if (
            // Object.keys(messageBuilder.data.attachments[0]).length > 1 || // Check if there are any other properties in the embed (fields will always be there)
            // messageBuilder.data.attachments[0].fields.length > 0 // Check if there are any fields in the emebd

                Object.keys(messageBuilder.data.embeds).length > 1 || // Check if there are any other properties in the embed (fields will always be there)
                messageBuilder.data.embeds.fields.length > 0 // Check if there are any fields in the emebd
            ) {
                return this.sendPayload(messageBuilder.data, resolve);
            } else {
                reject({error: "No content specified"});
            }
        });
    }
}

Webhook.prototype.custom = util.deprecate(Webhook.prototype.custom, "Custom is deprecated, use MessageBuilder instead");

module.exports = {
    Webhook,
    MessageBuilder
};
