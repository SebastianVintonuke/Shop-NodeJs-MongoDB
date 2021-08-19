const fs = require("fs"),
readline = require("readline");
const Product = require('../models/Product');
const { isAuthenticated } = require('../helpers/auth');

let rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
})

rl.on('line', function (line) {
	if (line == "addNewProduct") {
		getData()
	} else if (line == "close") {
		rl.close();
	}
});

rl.on("close", function() {
	console.log("input closed");
	process.exit(0);
});

async function addProduct(name, type, image, price, description) {
	let newProduct = new Product({
		name,
		type,
		image,
		price,
		description
	});
	await newProduct.save();
	console.log('Nuevo producto agregado');
}

function getData() {
	rl.question("Escribe el nombre del producto:", (name) => {
		rl.question("Escribe el tipo de accesorio (coleccionable/arte/accesorio):", (type) => {
			rl.question("Escribe el nombre del archivo de imagen (con extencion jpg, png):", (image) => {
				rl.question("Escribe el precio (numero entero):", (price) => {
					rl.question("Escribe la descripcion:", async (description) => {
						await addProduct(name, type, image, price, description);
					});
				});
			});
		});
	});
};

// Inicializacion de productos para el desarrollo y pruebas
async function devAddProducts() {
	let nProducts = await Product.find().lean();
	if (nProducts == 0) {
		addProduct('Nombre Del Producto Tipo Coleccionable', 'coleccionable', 'gallery_1.jpg', 100, 'Descripcion Del Producto Tipo Coleccionable');
		addProduct('Nombre Del Producto Tipo Arte', 'arte', 'gallery_2.jpg', 200, 'Descripcion Del Producto Tipo Arte');
		addProduct('Nombre Del Producto Tipo Accesorio', 'accesorio', 'gallery_3.jpg', 300, 'Descripcion Del Producto Tipo Accesorio');
	}
}

devAddProducts();
