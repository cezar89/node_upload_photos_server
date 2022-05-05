// const Product = require('../models/product');
const Product = require('../models/productLocal');
const { validationResult } = require('express-validator/check');


exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const image = req.file;
    const price = req.body.price;
    const description = req.body.description;
    if (!image) {
        console.log('bad image');
        return res.status(400);
    }
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400);
    }
  
    const imageUrl = image.path;
  
    const product = new Product(title, price, description, imageUrl);
    // product
    //     .save()
    //     .then(result => {
    //         console.log('Created Product');
    //         res.status(200);
    //     })
    //     .catch(err => {
    //         console.log('There was an error');
    //         console.log(err);
    //         return res.status(500);
    //     });
    product.save()
};