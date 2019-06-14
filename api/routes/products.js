const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const ProductController = require('../controller/products');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.get('/', ProductController.product_get_all);

router.post('/', checkAuth, upload.single('productImage'), ProductController.product_create_product);

router.get('/:productId', ProductController.product_get_product);

router.patch('/:productId', checkAuth, ProductController.product_update_product);

router.delete('/:productId', checkAuth, ProductController.product_delete_product);

module.exports = router;