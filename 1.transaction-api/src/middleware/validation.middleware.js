// src/middleware/validation.middleware.js
/**
 * Validation middleware for transfer requests
 */

const validateCreateTransfer = (req, res, next) => {
    const { transfer, transfer_items } = req.body;
  
    // Validate transfer
    if (!transfer) {
      return res.status(400).json({
        success: false,
        message: 'Transfer data is required'
      });
    }
  
    if (!transfer.reference_no) {
      return res.status(400).json({
        success: false,
        message: 'Reference number is required'
      });
    }
  
    if (!transfer.transfer_date) {
      return res.status(400).json({
        success: false,
        message: 'Transfer date is required'
      });
    }
  
    if (!transfer.status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }
  
    // Validate transfer items
    if (!transfer_items || !Array.isArray(transfer_items) || transfer_items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one transfer item is required'
      });
    }
  
    for (const [index, item] of transfer_items.entries()) {
      if (!item.product_id) {
        return res.status(400).json({
          success: false,
          message: `Product ID is required for item at index ${index}`
        });
      }
  
      if (item.quantity === undefined || item.quantity === null) {
        return res.status(400).json({
          success: false,
          message: `Quantity is required for item at index ${index}`
        });
      }
  
      if (!item.unit) {
        return res.status(400).json({
          success: false,
          message: `Unit is required for item at index ${index}`
        });
      }
    }
  
    next();
  };
  
  const validateUpdateTransfer = (req, res, next) => {
    const { transfer, transfer_items } = req.body;
  
    // Validate transfer
    if (!transfer) {
      return res.status(400).json({
        success: false,
        message: 'Transfer data is required'
      });
    }
  
    // Validate transfer items
    if (!transfer_items || !Array.isArray(transfer_items)) {
      return res.status(400).json({
        success: false,
        message: 'Transfer items must be an array'
      });
    }
  
    // Validate each item if there are any
    if (transfer_items.length > 0) {
      for (const [index, item] of transfer_items.entries()) {
        if (!item.product_id) {
          return res.status(400).json({
            success: false,
            message: `Product ID is required for item at index ${index}`
          });
        }
  
        if (item.quantity === undefined || item.quantity === null) {
          return res.status(400).json({
            success: false,
            message: `Quantity is required for item at index ${index}`
          });
        }
  
        if (!item.unit) {
          return res.status(400).json({
            success: false,
            message: `Unit is required for item at index ${index}`
          });
        }
      }
    }
  
    next();
  };
  
  module.exports = {
    validateCreateTransfer,
    validateUpdateTransfer
  };
  