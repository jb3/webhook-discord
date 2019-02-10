const MessageBuilder = require('./builder');

const fetch = require('node-fetch');

const endpoint = 'https://discordapp.com/api/webhooks';

class Webhook {
    /**
    @constructor
    @param {String} url - The webhook's URL.
    */
    constructor(url, nowait = false) {
        /**
         * Webhook URL
         * @type {String}
         */
        this.url = url;

        /**
         * Webhook ID
         * @type {String}
         */
        this.id = '';

        /**
         * Webhook Token
         * @type {String}
         */
        this.token = '';

        /**
         * Webhook data
         * @type {Object}
         */
        this.meta = {};

        /**
         * Webhook ready to execute or not
         * @type {Boolean}
         */
        this.ready = false;

        /**
         * Webhook should be wait or not
         * @type {Boolean}
         */
        this.nowait = nowait;
        fetch(this.url)
            .then(async res => {
                const data = await res.json();
                Object.assign(this.meta, data);
                this.id = data.id;
                this.token = data.token;
                this.ready = true;
            })
            .catch(err => {
                throw err;
            });
    }

    /**
    Verify the name of a webhook.

    @param {String} name - The name of the webhook.
    */
    verifyName(name) {
        if (name.length > 32) {
            throw new Error(`The name specified was ${name.length} characters. Discord webhook names must be under 32 characters`);
        }
    }

    /**
    @param {Object} payloadRaw - The payload to send.
    @param {Function} resolveFunction - Used internally for ratelimiting handling
    */
    sendPayload(payloadRaw, resolveFunction) {
        let payload = this.sanitiseEmbeds(payloadRaw);
        this.verifyName(payload.username);
        if (this.ready) {
            return new Promise((resolve, reject) => {
                fetch(this.endpoint, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })
                .then(() => {
                    if (resolveFunction) {
                        resolveFunction();
                    }

                    resolve();
                })
                .catch((err) => {
                    let e = JSON.parse(err.text);

                    if (e.code === 50006) { // We've sent an empty message
                        reject({error: 'No content specified'});
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
    @returns {String} - The endpoint of the webhook.
    */
    get endpoint() {
        let qs = '';
        if(this.nowait){
            qs = '?wait=false';
        }
        return `${endpoint}/${this.id}/${this.token}${qs}`;
    }

    /**
    @param {String} name - The username of the error webhook.
    @param {String} message - The message of the error webhook.
    */
    error(name, message) {
        let color = parseInt('ff0000', 16);
        let payload = {
            username: name,
            embeds: [{
                color: color,
                fields: [{
                    title: 'Error',
                    value: message
                }],
                timestamp: new Date()
            }]
        };

        return this.sendPayload(payload);
    }

    /**
    @param {String} name - The username of the info webhook.
    @param {Sring} message - The message of the info webhook.
    */
    info(name, message) {
        let color = parseInt('00fffa', 16);
        let payload = {
            username: name,
            embeds: [{
                color: color,
                fields: [{
                    title: 'Information',
                    value: message
                }],
                timestamp: new Date()
            }]
        };

        return this.sendPayload(payload);
    }
    /**
    @param {String} name - The username of the success webhook.
    @param {String} message - The message of the success webhook.
    */
    success(name, message) {
        let color = parseInt('04ff00', 16);
        let payload = {
            username: name,
            embeds: [{
                color: color,
                fields: [{
                    name: 'Success',
                    value: message
                }],
                timestamp: new Date()
            }]
        };

        return this.sendPayload(payload);
    }
    /**
    @param {String} name - The username of the warning webhook.
    @param {String} message - The message of the warning webhook.
    */
    warn(name, message) {
        let color = parseInt('ffe900', 16);
        let payload = {
            username: name,
            embeds: [{
                color: color,
                fields: [{
                    title: 'Warning',
                    value: message
                }],
                timestamp: new Date()
            }]
        };

        return this.sendPayload(payload);
    }

    /**
    @param {String} name - The username of the custom webhook.
    @param {String} author - The author of the discord webhook. (optional)
    @param {String} title - A field title of the custom webhook
    @param {String} value - A field value of the custom webhook.
    @param {String} color - The color of the custom webhook. (optional)
    @param {String} imageUrl - The URL of the image to attach. (optional)
    @param {Object} footer - The footer of the discord webhook.
    */
    custom(name, author, value, title, color, imageUrl, footer) {
        let payload = {
            username: name,
            author: {
                name: author.name,
                url: author.url,
                icon_url: author.icon
            },
            embeds: [{
                fields: [{
                    name: title,
                    value: value
                }],
                footer: {
                    text: footer.text,
                    icon_url: footer.icon
                },
                timestamp: new Date()
            }]
        };
        if (color) {
            payload.embeds[0].color = color;
        }
        if (imageUrl) {
            payload.embeds[0].image_url = imageUrl;
        }
        return this.sendPayload(payload);
    }

    /**
    @param {String} name - The username of the webhook.
    @param {String} value - A field value for a custom webhook.
    @param {String} title - A field title for a custom webhook.
    @param {String} imageURL - The URL of the image to attach to the custom webhook.
    */
    image(name, value, title, imageURL) {
        let payload = {
            username: name,
            embeds: [{
                fields: [{
                    name: title,
                    value: value
                }],
                timestamp: new Date(),
                image: {
                    url: imageURL
                }
            }]
        };

        return this.sendPayload(payload);
    }

    /**
     * Remove embeds from a message if only text is specified
     *
     * @param {Object} data - The Discord webhook data.
     */
    sanitiseEmbeds(data) {
        // Need to copy a derefenced object so we don't touch the messagebuilder
        let newPayload = Object.assign({}, data);

        // if (data.attachments.length > 0) {
        if (data.embeds[0].length) {
            if (
                Object.keys(data.embeds[0].length) || 
                data.embeds[0].fields.length > 0
            ) {
                // There is an embed
                return newPayload;
            } else {
                // No embeds
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
     * @param {MessageBuilder} messageBuilder - The message.
     */
    send(messageBuilder) {
        return new Promise((resolve, reject) => {
            if (messageBuilder.data.content) { // Check for any text
                return this.sendPayload(messageBuilder.data, resolve);
            } else if (
                Object.keys(messageBuilder.data.embeds).length || // Check if there are any other properties in the embed (fields will always be there)
                messageBuilder.data.embeds[0].fields.length > 0 // Check if there are any fields in the emebd
            ) {
                return this.sendPayload(messageBuilder.data, resolve);
            } else {
                reject({error: 'No content specified'});
            }
        });
    }
}

module.exports = Webhook;
