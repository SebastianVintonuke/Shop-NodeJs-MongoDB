const express = require('express');
const router = express.Router();

const ContactRequest = require('../models/ContactRequest');

router.get('/', (req, res) => {
	res.render('index');
});

router.get('/faqs', (req, res) => {
	res.render('faqs');
});

router.get('/shippingInformation', (req, res) => {
	res.render('shippingInformation');
});

router.get('/contactUs', (req, res) => {
	res.render('contactUs');
});

/* Verificacion minima, se recomienda utilizar algun modulo de comprobacion */
router.post('/contactUs', async(req, res) => {
	let {name, email, topic, text} = req.body;
	let errors = [];
	if (!name) {
		errors.push({text: 'Nombre requerido'});
	}
	if (!email) {
		errors.push({text: 'Email requerido'});
	}
	if (!text) {
		errors.push({text: 'Porfavor ingrese su consulta'});
	}
	if(errors.length > 0) {
		res.render('contactUs', {
			errors,
			name,
			email,
			topic,
			text
		});
	} else {
		let newContactRequest = new ContactRequest({
			name,
			email,
			topic,
			text
		});
		await newContactRequest.save();
		req.flash('success_msg', 'Gracias por ponerte en contacto con nosotros');
		res.redirect('/contactUs');
	}
});

module.exports = router;