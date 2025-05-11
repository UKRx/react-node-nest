// src/controllers/transferController.js
const transferService = require('../services/transferService');

class TransferController {
  /**
   * Create a new transfer with items
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   */
  async createTransfer(req, res) {
    try {
      const { transfer, transfer_items } = req.body;
      const result = await transferService.createTransfer(transfer, transfer_items);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || 'Some error occurred while creating the transfer.'
      });
    }
  }

  /**
   * Update a transfer with items
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   */
  async updateTransfer(req, res) {
    try {
      const id = parseInt(req.params.id);
      const { transfer, transfer_items } = req.body;
      const result = await transferService.updateTransfer(id, transfer, transfer_items);
      res.status(200).json(result);
    } catch (error) {
      if (error.message.includes('not found')) {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      res.status(500).json({
        success: false,
        message: error.message || 'Some error occurred while updating the transfer.'
      });
    }
  }

  /**
   * Get a transfer with its items
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   */
  async getTransferWithItems(req, res) {
    try {
      const id = parseInt(req.params.id);
      const result = await transferService.getTransferWithItems(id);
      res.status(200).json(result);
    } catch (error) {
      if (error.message.includes('not found')) {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }
      res.status(500).json({
        success: false,
        message: error.message || 'Some error occurred while retrieving the transfer.'
      });
    }
  }
}

module.exports = new TransferController();
