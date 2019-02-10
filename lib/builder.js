class MessageBuilder {
    /**
     * This is the class to initialize a new MessageBuilder.
     * @constructor
     */
    constructor() {
        this.data = {
            // "attachments": [ { "fields": [] } ]
            "embeds": [ { } ]
        };
    }

    /**
     * Set the author of the embed with an optional icon
     * 
     * @param {string} name The name to use
     * @param {string} url The url to use
     * @param {string} iconURL The icon url to use
     */
    setAuthor(name, url, iconURL) {
        this.data.embeds.author.name = name;
        this.data.embeds.author.url = url;
        this.data.embeds.icon_url = iconURL;
        return this;
    }

    /**
     * Set the description of the embed
     *
     * @param {string} description The description to use
     */
    setDescription(description) {
        // this.data.attachments[0].text = description;
        this.data.embeds.description = description;
        return this;
    }

    /**
     * Set the title of the embed
     *
     * @param {string} title The title to use
     * @param {string} url The url to use
     */
    setTitle(title, url) {
        // this.data.attachments[0].title = title;
        this.data.embeds.title = title;
        this.data.embeds.url = url;
        return this;
    }

    /**
     * This method sets the username of the hook
     *
     * @param {string} username The username to use
     */
    setName(username) {
        this.data.username = username;
        return this;
    }

    /**
     * This method sets the color of the embed.
     *
     * @param {string} color The hexadecimal color
     */
    setColor(color) {
        // this.data.attachments[0].color = color;
        this.data.embeds.color = color;
        return this;
    }

    /**
     * Set the text to be sent alongside the embed.
     *
     * @param {string} text The text.
     */
    setText(text) {
        // this.data.text = text;
        this.data.content = text;
        return this;
    }

    /**
     * This method adds a new field to the embed.
     *
     * @param {string} title The title of the field.
     * @param {string} value The value of the field.
     */
    addField(title, value) {
        const fieldObj = {
            "title": title,
            "value": value
        };

        // this.data.attachments[0].fields.push(fieldObj);
        this.data.embeds.fields.push(fieldObj);
        return this;
    }
    
    /**
     * Remove a field from an embed
     *
     * @param {string} name The name of the field to remove
     */
    removeField(name) {
        // this.data.attachments[0].fields = this.data.attachments[0].fields.filter(field => field.title != name);
        this.data.embeds.fields = this.data.embeds.fields.filter(field => field.title != name);

        return this;
    }

    /**
     * Set timestamp, if no argument is passed, the current
     * time is used.
     *
     * @param {number} timestamp The timestamp to use.
     */
    setTime(timestamp) {
        if (!timestamp) {
            timestamp = new Date() / 1000;
        }

        // this.data.attachments[0].ts = timestamp;
        this.data.embeds.timestamp = timestamp;
        return this;
    }

    /**
     * This method adds an image to the embed.
     *
     * @param {string} imageURL The URL to the image.
     */
    setImage(imageURL) {
        // this.data.attachments[0].image_url = imageURL;
        this.data.embeds.image.url = imageURL;
        return this;
    }
}

module.exports = MessageBuilder;
