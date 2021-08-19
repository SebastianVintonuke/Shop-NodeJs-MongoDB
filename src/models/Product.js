const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
	name: { type: String, required: true },
	type: { type: String, required: false },
	image: { type: String, required: true },
	price: { type: Number, required: true },
	description: { type: String, required: true },
	date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);