const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../models/User');
const Product = require('../models/Product');
const { isAuthenticated } = require('../helpers/auth');

// LOG IN VIEW
router.get('/users/signin', (req, res) => {
	res.render('users/signin');
});

// SIGN IN FORM
router.post('/users/signin', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/users/signin',
	failureFlash: true
}));

// LOG OUT
router.get('/users/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

// REGISTER VIEW
router.get('/users/signup', (req, res) => {
	res.render('users/signup');
});

// REGISTER FORM
/* Verificacion minima, se recomienda utilizar algun modulo de comprobacion */
router.post('/users/signup', async (req, res) => {
	let {name, email, password, confirm_password} = req.body;
	let errors = [];
	if(!name) {
		errors.push({text: 'Debe ingresar un usuario'});
	}
	if(!email) {
		errors.push({text: 'No a ingresado un email valido'});
	}
	if(password != confirm_password) {
		errors.push({text: 'Las contraseñas no coinciden'});
	}
	if(password.length < 5) {
		errors.push({text: 'La contraseña debe ser mayor a 5 caracteres'});
	}
	if(errors.length > 0) {
		res.render('users/signup', {errors, name, email});
	} else {
		let emailUser = await User.findOne({email: email});
		if (emailUser) {
			req.flash('error_msg', 'El email esta en uso');
			res.redirect('/users/signup');
		} else {
			let cart = [];
			let newUser = new User({name, email, password, cart});
			//newUser.password = await newUser.encryptPassword(password);
			await newUser.save();
			req.flash('success_msg', 'Registrado exitosamente');
			res.redirect('/users/signin');
		}
	}
});

// CART VIEW
router.get('/cart-:id', isAuthenticated, async (req, res) => {
	let userId = req.params.id;
	let user = await User.findOne({ _id: userId }).lean();
	let userCart = user.cart;
	let products = [];
	let subTotal = 0;
	for (let i = 0; i < userCart.length; i++) {
		let product = await Product.findOne({ _id: userCart[i] }).lean();
		if (product) {
			subTotal = subTotal += product.price;
			products.push(product);
		}
	};
	let shiping = 0;
	let total = subTotal + shiping;
	res.render('users/cart', { subTotal, shiping, total, products });
});

// DELETE PRODUCT FROM CART
router.delete('/cart-:id', isAuthenticated, async (req, res) => {
	let userId = req.params.id;
	let { productId } = req.body;
	let user = await User.findOne({ _id: userId }).lean();
	let userCart = user.cart;
	userCart.splice(userCart.indexOf(productId), 1);
	await User.updateOne({ _id: userId }, { cart: userCart });
	res.redirect(`/cart-${userId}`);
});

module.exports = router;