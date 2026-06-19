const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/:userId', cartController.getCart);
router.post('/add', cartController.addToCart);
router.put('/item/:idDetalle', cartController.updateQuantity);
router.delete('/item/:idDetalle', cartController.removeItem);

module.exports = router;
