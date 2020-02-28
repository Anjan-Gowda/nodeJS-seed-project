const express = require('express'),
    router = express.Router(),
    asyncMiddleware = require('express-async-handler'),
    productCtrl = require('../controllers/ProductController');

//-------------------------------Product Routes-----------------------------------
router.get('/product/getProducts', asyncMiddleware(productCtrl.getProducts));
router.get('/product/getProduct/:productId', asyncMiddleware(productCtrl.getProduct));
router.get('/product/getProductsBelowPrice/:price',
    asyncMiddleware(productCtrl.getProductsBelowPrice));
router.post('/product/createProduct', asyncMiddleware(productCtrl.createProduct));
router.patch('/product/updateProduct/:productId', asyncMiddleware(productCtrl.updateProduct));
router.delete('/product/deleteProduct/:productId', asyncMiddleware(productCtrl.deleteProduct));
router.post('/product/deleteAllProduct', asyncMiddleware(productCtrl.deleteAllProduct));






module.exports = router;
