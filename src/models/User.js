const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	cart: { type: Array, required: true },
	date: { type: Date, default: Date.now }
});

UserSchema.methods.encryptPassword = async (password) => {
	let salt = await bcrypt.genSalt(10);
	let hash = bcrypt.hash(password, salt);
	return hash;
};

UserSchema.methods.matchPassword = async function (password) {
	return await (password == this.password);
	//return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);