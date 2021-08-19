const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Product = require('../models/Product');
const { isAuthenticated } = require('../helpers/auth');

router.get('/shop', async (req, res) => {
	let products = await Product.find().lean();
	res.render('shop/shop.hbs', { products });
});

/* COLLECTIBLES */
router.get('/coleccionables', async (req, res) => {
	let products = await Product.find({type:'coleccionable'}).lean();
	let title = 'COLECCIONABLES';
	res.render('shop/shop.hbs', { title, products });
});

/* ART */
router.get('/arte', async (req, res) => {
	let products = await Product.find({type:'arte'}).lean();
	let title = 'ARTE';
	res.render('shop/shop.hbs', { title, products });
});

/* ACCESSORIES */
router.get('/accesorios', async (req, res) => {
	let products = await Product.find({type:'accesorio'}).lean();
	let title = 'ACCESORIOS';
	res.render('shop/shop.hbs', { title, products });
});

/* COMMISSION */
router.get('/commissions', async (req, res) => {
	res.render('shop/commission.hbs');
});

/* PRODUCT VIEW */
router.get('/product-:id', async (req, res) => {
	let id = req.params.id;
	let product = await Product.find({ _id: id }).lean();
	res.render('shop/product.hbs', { product });
});

/* ADD PRODUCT TO CART */
router.put('/addCart', isAuthenticated , async (req, res) => {
	let { userId, productId } = req.body;
	let user = await User.findOne({ _id: userId }).lean();
	let userCart = user.cart;
	if (!userCart.includes(productId)) {
		userCart.push(productId);
	};
	await User.updateOne({ _id: userId }, { cart: userCart });
	res.redirect(`/cart-${userId}`);
});

module.exports = router;