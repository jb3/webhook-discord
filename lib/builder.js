class MessageBuilder {
    /**
     * This is the class to initialize a new MessageBuilder.
     * @constructor
     */
    constructor() {
        this.data = {"attachments": []};
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

        // Create an attachment if we don't have any
        if (this.data.attachments[0] === undefined) {
            this.data.attachments = [{}];
        }

        this.data.attachments[0].color = color;
        return this;
    }

    /**
     * Set the text to be sent alongside the embed.
     *
     * @param {string} text The text.
     */
    setText(text) {
        this.data.text = text;
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

        // Create an attachment if we don't have any
        if (this.data.attachments[0] === undefined) {
            this.data.attachments = [{}];
        }

        // Add the fields object to our attachments
        if (this.data.attachments[0].fields === undefined) {
            this.data.attachments[0].fields = [];
        }

        this.data.attachments[0].fields.push(fieldObj);
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

        // Create an attachment if we don't have any
        if (this.data.attachments[0] === undefined) {
            this.data.attachments = [{}];
        }

        this.data.attachments[0].ts = timestamp;

        return this;
    }

    /**
     * This method adds an image to the embed.
     *
     * @param {string} imageURL The URL to the image.
     */
    setImage(imageURL) {

        // Create an attachment if we don't have any
        if (this.data.attachments[0] === undefined) {
            this.data.attachments = [{}];
        }

        this.data.attachments[0].image_url = imageURL;
        return this;
    }
}

module.exports = MessageBuilder;
