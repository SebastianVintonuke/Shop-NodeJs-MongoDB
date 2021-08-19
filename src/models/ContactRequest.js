const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactRequestSchema = new Schema({
	name: { type: String, required: true},
	email: { type: String, required: true},
	topic: { type: String },
	text: { type: String, required: true},
	date: { type: Date, default: Date.now}
});

module.exports = mongoose.model('ContactRequest', ContactRequestSchema);