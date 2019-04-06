const MessageBuilder = require('./builder')
const COLORS = require('./colors')

const builder = new MessageBuilder()

class Message extends MessageBuilder {

	/**
	 * [warn description]
	 * @return {[type]} [description]
	 */
	warnMessage({ message, username }) {
		return builder
				.setText('')
				.setTitle('Warning')
				.setDescription(message)
				.setName(username)
				.setColor(COLORS.WARNING)
				.setTime()
	}

	errorMessage({ message, username }) {
		return builder
				.setText('')
				.setTitle('Error')
				.setDescription(message)
				.setName(username)
				.setColor(COLORS.ERROR)
				.setTime()
	}

	successMessage({ message, username }) {
		return builder
				.setText('')
				.setTitle('Success')
				.setDescription(message)
				.setName(username)
				.setColor(COLORS.SUCCESS)
				.setTime()
	}

	infoMessage({ message, username }) {
		return builder
				.setText('')
				.setTitle('Information')
				.setDescription(message)
				.setName(username)
				.setColor(COLORS.INFO)
				.setTime()
	}

	customMessage({ message, title, username, image, color }) {
		return builder
				.setText('')
				.setDescription(message)
				.setTitle(title)
				.setName(username)
				.setImage(image)
				.setColor(color)
				.setTime()
	}

	withMention({ message, username, image, title, description }) {
		return builder
				.setText(message)
				.setTitle(title)
				.setDescription(description)
				.setName(username)
				.setImage(image)
				.setTime()
	}
}

module.exports = Message