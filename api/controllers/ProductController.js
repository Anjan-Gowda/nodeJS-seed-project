const mongoose = require('mongoose'),
    moment = require('moment'),
    Validations = require('../utils/Validations'),
    Product = mongoose.model('Product');

module.exports.getProduct = async (req, res) => {
    console.log("in get");
    if (!Validations.isObjectId(req.params.productId)) {
        return res.status(422).json({
            status: 422,
            msg: 'productId parameter must be a valid ObjectId.',
            data: null
        });
    }
    const product = await Product.findById(req.params.productId).exec();
    if (!product) {
        return res
            .status(404)
            .json({ status: 404, msg: 'Product not found.', data: null });
    }
    res.status(200).json({
        status: 200,
        msg: 'Product retrieved successfully.',
        data: product
    });
};

module.exports.getProducts = async (req, res) => {
    const products = await Product.find({}).exec();
    res.status(200).json({
        status: 200,
        msg: 'Products retrieved successfully.',
        data: products
    });
};

module.exports.getProductsBelowPrice = async (req, res) => {
    if (!Validations.isNumber(req.params.price)) {
        return res.status(422).json({
            status: 422,
            msg: 'price parameter must be a valid number.',
            data: null
        });
    }
    const products = await Product.find({
        price: {
            $lt: req.params.price
        }
    }).exec();
    res.status(200).json({
        status: 200,
        msg:
            'Products priced below ' + req.params.price + ' retrieved successfully.',
        data: products
    });
};

module.exports.createProduct = async (req, res) => {
    console.log(req.body);
    const valid =
        req.body.name &&
        Validations.isString(req.body.name) &&
        req.body.price &&
        Validations.isNumber(req.body.price);
    if (!valid) {
        return res.status(422).json({
            status: 422,
            msg: 'name(String) and price(Number) are required fields.',
            data: null
        });
    }
    // Security Check
    delete req.body.createdAt;
    delete req.body.updatedAt;

    const product = await Product.create(req.body);
    res.status(201).json({
        status: 201,
        msg: 'Product was created successfully.',
        data: product
    });
};

module.exports.updateProduct = async (req, res) => {
    if (!Validations.isObjectId(req.params.productId)) {
        return res.status(422).json({
            status: 422,
            msg: 'productId parameter must be a valid ObjectId.',
            data: null
        });
    }
    const valid =
        req.body.name &&
        Validations.isString(req.body.name) &&
        req.body.price &&
        Validations.isNumber(req.body.price);
    if (!valid) {
        return res.status(422).json({
            status: 422,
            msg: 'name(String) and price(Number) are required fields.',
            data: null
        });
    }
    // Security Check
    delete req.body.createdAt;
    req.body.updatedAt = moment().toDate();

    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.productId,
        {
            $set: req.body
        },
        { new: true }
    ).exec();
    if (!updatedProduct) {
        return res
            .status(404)
            .json({ status: 404, msg: 'Product not found.', data: null });
    }
    res.status(200).json({
        status: 200,
        msg: 'Product was updated successfully.',
        data: updatedProduct
    });
};

module.exports.deleteProduct = async (req, res) => {
    if (!Validations.isObjectId(req.params.productId)) {
        return res.status(422).json({
            status: 422,
            msg: 'productId parameter must be a valid ObjectId.',
            data: null
        });
    }
    const deletedProduct = await Product.findByIdAndRemove(
        req.params.productId
    ).exec();
    if (!deletedProduct) {
        return res
            .status(404)
            .json({ status: 404, msg: 'Product not found.', data: null });
    }
    res.status(200).json({
        status: 200,
        msg: 'Product was deleted successfully.',
        data: deletedProduct
    });
};


module.exports.deleteAllProduct = async (req, res) => {
    const deletedAllProduct = await Product.remove().exec();
    if (!deletedAllProduct) {
        return res
            .status(404)
            .json({
                status: 404,
                msg: 'Product not found.', data: null
            });
    }
    res.status(200).json({
        status: 200,

        msg: 'Product was deleted successfully.',
        data: deletedAllProduct
    });
};