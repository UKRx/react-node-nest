// src/models/transferModel.js
/**
 * Transfer Model
 * Represents the transfer header information
 */
class TransferModel {
    constructor(data = {}) {
      this.id = data.id;
      this.reference_no = data.reference_no;
      this.transfer_date = data.transfer_date;
      this.description = data.description;
      this.status = data.status;
      this.source_location = data.source_location;
      this.destination_location = data.destination_location;
      this.approved_by = data.approved_by;
      this.created_at = data.created_at;
      this.updated_at = data.updated_at;
    }
  
    validate() {
      if (!this.reference_no) {
        throw new Error('Reference number is required');
      }
      if (!this.transfer_date) {
        throw new Error('Transfer date is required');
      }
      if (!this.status) {
        throw new Error('Status is required');
      }
      return true;
    }
  }
  
  module.exports = TransferModel;
  