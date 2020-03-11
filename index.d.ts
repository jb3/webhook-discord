declare module "webhook-discord" {
  export class Webhook {
    constructor(url: string, nowait?: boolean);

    /**
     * @param {string} name The username of the success webhook.
     * @param {string} message The message of the success webhook.
     */
    public success(name: string, message: string): void;

    /**
     * @param {string} name The username of the info webhook.
     * @param {string} message The message of the info webhook.
     */
    public info(name: string, message: string): void;

    /**
     * @param {string} name The username of the error webhook.
     * @param {string} message The message of the error webhook.
     */
    public err(name: string, message: string): void;

    /**
     *   @param {string} name The username of the warning webhook.
     *   @param {string} message The message of the warning webhook.
     */
    public warn(name: string, message: string): void;

  }

  // tslint:disable-next-line:max-classes-per-file
  export class MessageBuilder {
    constructor();

    /**
     * Add an avatar to the webhooks
     *
     * @param {string} avatarURL The URL to the avatar.
     */
    public setAvatar(avatarURL: string): MessageBuilder;

    /**
     * This method sets the username of the hook
     *
     * @param {string} username The username to use
     */
    public setName(username: string): MessageBuilder;

    /**
     * Set the footer of the embed
     *
     * @param {string} footer The footer to use
     * @param {string} footerIcon The icon to display in the footer
     */
    public setFooter(footer: string, footerIcon: string): MessageBuilder;

    /**
     * Set the description of the embed
     *
     * @param {string} description The description to use
     */
    public setDescription(description: string): MessageBuilder;

    /**
     * Set the text to be sent alongside the embed.
     *
     * @param {string} text The text.
     */
    public setText(text: string): MessageBuilder;

    /**
     * This method adds a new field to the embed.
     *
     * @param {string} title The title of the field.
     * @param {string} value The value of the field.
     * @param {bool} inline Should the field be an inline field
     */
    public addField(title: string, value: string, inline?: boolean): MessageBuilder;

    /**
     * This method adds an image to the embed.
     *
     * @param {string} imageURL The URL to the image.
     */
    public setImage(imageURL: string): MessageBuilder;

    /**
     * This method adds a thumbnail to the embed.
     *
     * @param {string} thumbnailURL The URL to the thumbnail.
     */
    public setThumbnail(thumbnailURL: string): MessageBuilder;

    /**
     * Set timestamp, if no argument is passed, the current
     * time is used.
     *
     * @param {number} timestamp The timestamp to use.
     */
    public setTime(timestamp?: number): MessageBuilder;

    /**
     * This method sets the color of the embed.
     *
     * @param {string} color The hexadecimal color
     */
    public setColor(color: string): MessageBuilder;
  }
}
