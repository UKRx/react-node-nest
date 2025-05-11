// src/services/transferService.js
const mockDb = require('../db/mockDb');
const TransferModel = require('../models/transferModel');
const TransferItemModel = require('../models/transferItemModel');

class TransferService {
  /**
   * Create a new transfer with items
   * @param {Object} transferData - The transfer data
   * @param {Array} transferItemsData - The transfer items data
   * @returns {Promise<Object>} The created transfer with items
   */
  async createTransfer(transferData, transferItemsData) {
    // Validate transfer data
    const transfer = new TransferModel(transferData);
    transfer.validate();

    // Validate transfer items data
    if (!Array.isArray(transferItemsData) || transferItemsData.length === 0) {
      throw new Error('At least one transfer item is required');
    }

    return mockDb.transaction(async (queryRunner) => {
      // Create the transfer
      const createdTransfer = await queryRunner.createTransfer(transferData);

      // Create the transfer items
      const transferItems = [];
      for (const itemData of transferItemsData) {
        const transferItem = new TransferItemModel({
          ...itemData,
          transfer_id: createdTransfer.id
        });
        transferItem.validate();
        
        const createdItem = await queryRunner.createTransferItem({
          ...itemData,
          transfer_id: createdTransfer.id
        });
        transferItems.push(createdItem);
      }

      return {
        success: true,
        data: {
          transfer: createdTransfer,
          transfer_items: transferItems
        }
      };
    });
  }

  /**
   * Update a transfer with items
   * @param {number} id - The transfer ID
   * @param {Object} transferData - The transfer data to update
   * @param {Array} transferItemsData - The new transfer items data
   * @returns {Promise<Object>} The updated transfer with items
   */
  async updateTransfer(id, transferData, transferItemsData) {
    // Validate transfer items data
    if (!Array.isArray(transferItemsData)) {
      throw new Error('Transfer items must be an array');
    }

    return mockDb.transaction(async (queryRunner) => {
      // Find the transfer
      const transfer = await queryRunner.findTransfer(id);
      if (!transfer) {
        throw new Error(`Transfer with ID ${id} not found`);
      }

      // Update the transfer
      const updatedTransfer = await queryRunner.updateTransfer(id, transferData);

      // Delete all existing transfer items
      await queryRunner.deleteTransferItems(id);

      // Create new transfer items
      const transferItems = [];
      for (const itemData of transferItemsData) {
        const transferItem = new TransferItemModel({
          ...itemData,
          transfer_id: id
        });
        
        // Only validate if we have items to add
        if (transferItemsData.length > 0) {
          transferItem.validate();
        }
        
        const createdItem = await queryRunner.createTransferItem({
          ...itemData,
          transfer_id: id
        });
        transferItems.push(createdItem);
      }

      return {
        success: true,
        data: {
          transfer: updatedTransfer,
          transfer_items: transferItems
        }
      };
    });
  }

  /**
   * Get a transfer with its items
   * @param {number} id - The transfer ID
   * @returns {Promise<Object>} The transfer with items
   */
  async getTransferWithItems(id) {
    const data = mockDb.getTransferWithItems(id);
    if (!data) {
      throw new Error(`Transfer with ID ${id} not found`);
    }
    return {
      success: true,
      data
    };
  }
}

module.exports = new TransferService();
