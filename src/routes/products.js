// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/product-create-form', productsController.create); 
router.post('/product-create-form', productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.post('/edit/:id', productsController.update); 

/* listado de productos */
/*router.get('/list', productsController.list);*/
/*** DELETE ONE PRODUCT ***/ 
router.get('/delete/:id', productsController.destroy); 


module.exports = router;
