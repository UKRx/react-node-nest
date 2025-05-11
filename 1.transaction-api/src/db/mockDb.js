// src/db/mockDb.js
class MockDb {
  constructor() {
    this.transfers = [];
    this.transferItems = [];
    this.transferIdCounter = 1;
    this.transferItemIdCounter = 1;
  }

  // Transaction simulation
  async transaction(callback) {
    // Create temporary copies for transaction simulation
    const tempTransfers = [...this.transfers];
    let tempTransferItems = [...this.transferItems]; // Changed from const to let
    const tempTransferIdCounter = this.transferIdCounter;
    const tempTransferItemIdCounter = this.transferItemIdCounter;

    const queryRunner = {
      // Mock methods that will be used within the transaction
      findTransfer: async (id) => {
        return tempTransfers.find(t => t.id === id);
      },
      createTransfer: async (transferData) => {
        const newTransfer = {
          id: tempTransferIdCounter,
          ...transferData,
          created_at: new Date(),
          updated_at: new Date()
        };
        tempTransfers.push(newTransfer);
        this.transferIdCounter++;
        return newTransfer;
      },
      updateTransfer: async (id, transferData) => {
        const index = tempTransfers.findIndex(t => t.id === id);
        if (index === -1) return null;
        
        const updatedTransfer = {
          ...tempTransfers[index],
          ...transferData,
          updated_at: new Date()
        };
        tempTransfers[index] = updatedTransfer;
        return updatedTransfer;
      },
      findTransferItems: async (transferId) => {
        return tempTransferItems.filter(item => item.transfer_id === transferId);
      },
      createTransferItem: async (itemData) => {
        const newItem = {
          id: tempTransferItemIdCounter,
          ...itemData,
          created_at: new Date(),
          updated_at: new Date()
        };
        tempTransferItems.push(newItem);
        this.transferItemIdCounter++;
        return newItem;
      },
      deleteTransferItems: async (transferId) => {
        const itemsToDelete = tempTransferItems.filter(item => item.transfer_id === transferId);
        tempTransferItems = tempTransferItems.filter(item => item.transfer_id !== transferId);
        return itemsToDelete.length;
      },
      commit: async () => {
        // Apply changes to the actual data
        this.transfers = tempTransfers;
        this.transferItems = tempTransferItems;
        this.transferIdCounter = tempTransferIdCounter;
        this.transferItemIdCounter = tempTransferItemIdCounter;
      },
      rollback: async () => {
        // Do nothing, changes are not applied
      }
    };

    try {
      const result = await callback(queryRunner);
      await queryRunner.commit();
      return result;
    } catch (error) {
      await queryRunner.rollback();
      throw error;
    }
  }

  // Helper methods for tests
  getAllTransfers() {
    return this.transfers;
  }

  getAllTransferItems() {
    return this.transferItems;
  }

  getTransferWithItems(id) {
    const transfer = this.transfers.find(t => t.id === id);
    if (!transfer) return null;
    
    const items = this.transferItems.filter(item => item.transfer_id === id);
    return {
      transfer,
      transfer_items: items
    };
  }

  reset() {
    this.transfers = [];
    this.transferItems = [];
    this.transferIdCounter = 1;
    this.transferItemIdCounter = 1;
  }
}

module.exports = new MockDb();
