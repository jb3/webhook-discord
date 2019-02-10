class MessageBuilder {
    /**
     * This is the class to initialize a new MessageBuilder.
     * @constructor
     */
    constructor() {
        this.data = {
            embeds: [{
                fields: [],
                author: {},
                image: {}
            }]
        };
    }

    /**
     * Set the author of the embed with an optional icon
     * 
     * @param {String} name - The name to use.
     * @param {String} url - The url to use.
     * @param {String} icon - The icon url to use.
     */
    setAuthor(name, url, icon) {
        this.data.embeds[0].author.name = name;
        this.data.embeds[0].author.url = url;
        this.data.embeds[0].author.icon_url = icon;

        return this;
    }

    /**
     * Set the description of the embed
     *
     * @param {String} description - The description to use.
     */
    setDescription(description) {
        this.data.embeds[0].description = description;
        return this;
    }

    /**
     * Set the title of the embed
     *
     * @param {String} title - The title to use.
     * @param {String} url - The url to use.
     */
    setTitle(title, url) {
        this.data.embeds[0].title = title;
        this.data.embeds[0].url = url;
        return this;
    }

    /**
     * This method sets the username of the hook
     *
     * @param {String} username - The username to use.
     */
    setName(username) {
        this.data.username = username;
        return this;
    }

    /**
     * This method sets the color of the embed.
     *
     * @param {String} color - The hexadecimal color.
     */
    setColor(color) {
        if (color.startsWith('#')) color = color.replace('#', '');

        let converted = parseInt(color, 16);
        this.data.embeds[0].color = converted;
        return this;
    }

    /**
     * Set the content to be sent alongside the embed.
     *
     * @param {String} content - The content.
     */
    setContent(content) {
        // this.data.text = text;
        this.data.content = content;
        return this;
    }

    /**
     * This method adds a new field to the embed.
     *
     * @param {String} name - The name of the field.
     * @param {String} value - The value of the field.
     */
    addField(name, value) {
        const fieldObj = {
            name: name,
            value: value
        };

        this.data.embeds[0].fields.push(fieldObj);
        return this;
    }
    
    /**
     * Remove a field from an embed
     *
     * @param {String} name - The name of the field to remove.
     */
    removeField(name) {
        this.data.embeds[0].fields = this.data.embeds[0].fields.filter(field => field.title != name);

        return this;
    }

    /**
     * Set timestamp, if no argument is passed, the current
     * time is used.
     *
     * @param {number} timestamp - The timestamp to use.
     */
    setTimestamp(timestamp) {
        if (!timestamp) {
            timestamp = new Date();
        }

        this.data.embeds[0].timestamp = timestamp;
        return this;
    }

    /**
     * This method adds an image to the embed.
     *
     * @param {String} imageURL - The URL to the image.
     */
    setImage(imageURL) {
        this.data.embeds[0].image.url = imageURL;
        return this;
    }
}

module.exports = MessageBuilder;