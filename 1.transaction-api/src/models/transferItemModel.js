// src/models/transferItemModel.js
/**
 * Transfer Item Model
 * Represents the transfer detail information
 */
class TransferItemModel {
    constructor(data = {}) {
      this.id = data.id;
      this.transfer_id = data.transfer_id;
      this.product_id = data.product_id;
      this.quantity = data.quantity;
      this.unit = data.unit;
      this.notes = data.notes;
      this.batch_number = data.batch_number;
      this.expiry_date = data.expiry_date;
      this.serial_number = data.serial_number;
      this.created_at = data.created_at;
      this.updated_at = data.updated_at;
    }
  
    validate() {
      if (!this.transfer_id) {
        throw new Error('Transfer ID is required');
      }
      if (!this.product_id) {
        throw new Error('Product ID is required');
      }
      if (this.quantity === undefined || this.quantity === null) {
        throw new Error('Quantity is required');
      }
      if (!this.unit) {
        throw new Error('Unit is required');
      }
      return true;
    }
  }
  
  module.exports = TransferItemModel;
  