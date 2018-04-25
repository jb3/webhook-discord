const snekfetch = require("snekfetch");
const endpoint = "https://discordapp.com/api/v6/webhooks";

class Webhook {
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

    get endpoint() {
        return `${endpoint}/${this.id}/${this.token}/slack`
    }

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

    custom(name, message, title, color, imageUrl){
        let payload = {
            "username": name,
            "text": "[]()",
            "attachments": [
                {
                    "fields": [
                        {
                        "title": title,
                        "value": message
                        }
                    ],
                    "ts": new Date() / 1000
                }
            ]
        }
        if(color){
            payload["attachments"][0].color = color;
        }
        if(imageUrl){
            payload["embed"] = {
                "image": [
                    {
                        "url": imageUrl
                    }
                ]
            }
        }
        return this.sendPayload(payload);
    }

    image(name, message, title, imageUrl) {
        let payload = {
            "username": name,
            "text": "[]()",
            "attachments": [{
                "fields": [{
                    "title": title,
                    "value": message
                }],
                "ts": new Date() / 1000
            }],
            "embed":[{
                "image":[{
                    "url":imageUrl
                }]
            }]
        }

        return this.sendPayload(payload)
    }
}

module.exports = Webhook;