import { Router } from 'express';

import {
  findAllProductBrand,
  findAllProduct,
  findProductById,
  findAllProductType,
  storeProductBrand,
  storeProduct,
  storeProductType,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller.js';

const router = Router();

router.get('/product', findAllProduct);

router.get('/product/:id', findProductById);

router.get('/productType', findAllProductType);

router.get('/productBrand', findAllProductBrand);

router.post('/product', storeProduct);

router.post('/productBrand', storeProductBrand);

router.post('/productType', storeProductType);

router.put('/product/:id', updateProduct);

router.delete('/product/:id', deleteProduct);

export default router;
