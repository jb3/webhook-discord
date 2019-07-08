declare module "webhook-discord" {
  export class Webhook {
    constructor(url: string, nowait?: boolean);
  }

  // tslint:disable-next-line:max-classes-per-file
  export class MessageBuilder {
    constructor(name?: string, color?: string, text?: string, image?: string, time?: number);

    /**
     * Add an avatar to the webhooks
     *
     * @param {string} avatarURL The URL to the avatar.
     */
    public setAvatar(avatarURL: string): void;

    /**
     * This method sets the username of the hook
     *
     * @param {string} username The username to use
     */
    public setName(username: string): void;

    /**
     * Set the footer of the embed
     *
     * @param {string} footer The footer to use
     * @param {string} footerIcon The icon to display in the footer
     */
    public setFooter(footer: string, footerIcon: string): void;

    /**
     * Set the description of the embed
     *
     * @param {string} description The description to use
     */
    public setDescription(description: string): void;

    /**
     * Set the text to be sent alongside the embed.
     *
     * @param {string} text The text.
     */
    public setText(text: string): void;

    /**
     * This method adds a new field to the embed.
     *
     * @param {string} title The title of the field.
     * @param {string} value The value of the field.
     * @param {bool} inline Should the field be an inline field
     */
    public addField(title: string, value: string, inline?: boolean): void;

    /**
     * This method adds an image to the embed.
     *
     * @param {string} imageURL The URL to the image.
     */
    public setImage(imageURL: string): void;

    /**
     * Set timestamp, if no argument is passed, the current
     * time is used.
     *
     * @param {number} timestamp The timestamp to use.
     */
    public setTime(timestamp?: number): void;

    /**
     * This method sets the color of the embed.
     *
     * @param {string} color The hexadecimal color
     */
    public setColor(color: string): void;
  }
}
