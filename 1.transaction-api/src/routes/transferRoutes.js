// src/routes/transferRoutes.js
const express = require('express');
const transferController = require('../controllers/transferController');
const { validateCreateTransfer, validateUpdateTransfer } = require('../middleware/validation.middleware');

const router = express.Router();

// Create a new transfer with items
router.post('/transfers', validateCreateTransfer, transferController.createTransfer);

// Update a transfer with items
router.put('/transfers/:id', validateUpdateTransfer, transferController.updateTransfer);

// Get a transfer with its items (added for convenience)
router.get('/transfers/:id', transferController.getTransferWithItems);

module.exports = router;
