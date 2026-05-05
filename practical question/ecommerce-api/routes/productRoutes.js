const express = require('express');
const router = express.Router();
const { createProduct, updateProduct, deleteProduct, getProducts } = require('../controllers/productController');
const { validateRequest } = require('../middleware/validationMiddleware');
const { productSchema } = require('../validations/index');

router.route('/')
  .get(getProducts)
  .post(validateRequest(productSchema), createProduct);

router.route('/:id')
  .put(validateRequest(productSchema), updateProduct)
  .delete(deleteProduct);

module.exports = router;
