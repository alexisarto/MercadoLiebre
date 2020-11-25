const fs = require('fs');
const path = require('path');

var products = JSON.parse(fs.readFileSync(__dirname + '/../data/productsDataBase.json', { encoding: "utf-8" }));


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products');
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		res.render('detail');
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('products/product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res,next) => {
		// Do the magic
		products.push(req.body);
		let productsJSON= JSON.stringify(products);
		fs.writeFileSync(__dirname, '/../data/productsDataBase.json', productsJSON);
		res.send("Se ha creado el producto: "+req.body.name);
	},

	// Update - Form to edit
	edit: (req, res, next) => {
		var idProduct= req.params.id;
		var productFound;
		for(var i=0; i< products.length;i++){
			if(products[i].id==idProduct){
				productFound=products[i];
				break;
			}
		}
		if(productFound){
			res.render("products/product-edit-form", {productFound})
		}else{
			res.send("Producto invalido")
		}

		res.send('producto');
	},
	// Update - Method to update
	update: (req, res, next) => {
		// Do the magic
		var idProduct=req.params.id;
		var editProducts=products.map(function(product){
			if(product.id==idProduct){
				let productEditado=req.body;
				productEditado.id = idProduct;
				return productEditado;
			}
			return product;
		});
		editProductsJSON= JSON.stringify(editProducts)
		fs.writeFileSync(__dirname, '/../data/productsDataBase.json', editProductsJSON);
		products=editProducts;
		res.send("Producto editado")
		},

	// Delete - Delete one product from DB
	destroy : (req, res, next) => {
		// Do the magic
		var idProduct = req.params.id;
        var productFound;
        for (var i = 0; i < products.length; i++) {
            if (products[i].id == idProduct) {
                productFound = products[i];
                break;
            }
        }
        if (productFound) {
            var productDestroy = products.filter(function(product) {
                return product.id != idProduct;
            });
            productsDestroyJSON = JSON.stringify(productDestroy);
            fs.writeFileSync(__dirname + '/../data/productsDataBase.json', productsDestroyJSON);
            products = productDestroy;
            res.send('El producto ha sido eliminado');
        } else {
            res.send('Producto invalido');
        }


	}
}

module.exports = controller;