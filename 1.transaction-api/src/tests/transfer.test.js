// src/tests/transfer.test.js
const mockDb = require('../db/mockDb');
const transferService = require('../services/transferService');

// Reset the mock database before each test
beforeEach(() => {
  mockDb.reset();
});

describe('Transfer Service', () => {
  // Test Case 1: Create Transfer with Items
  test('Should create a transfer with items', async () => {
    // Arrange
    const transferData = {
      reference_no: 'TRF-2025-0001',
      transfer_date: new Date('2025-05-10'),
      description: 'Stock transfer from warehouse A to B',
      status: 'pending',
      source_location: 'Warehouse A',
      destination_location: 'Warehouse B',
      approved_by: 'John Doe'
    };

    const transferItemsData = [
      {
        product_id: 101,
        quantity: 10,
        unit: 'box',
        notes: 'Handle with care',
        batch_number: 'BTC-2025-001',
        expiry_date: new Date('2026-05-10'),
        serial_number: 'SN12345'
      },
      {
        product_id: 102,
        quantity: 20,
        unit: 'piece',
        notes: 'Fragile items',
        batch_number: 'BTC-2025-002',
        expiry_date: new Date('2026-06-15'),
        serial_number: 'SN67890'
      }
    ];

    // Act
    const result = await transferService.createTransfer(transferData, transferItemsData);

    // Assert
    expect(result.success).toBe(true);
    expect(result.data.transfer.id).toBe(1);
    expect(result.data.transfer.reference_no).toBe('TRF-2025-0001');
    expect(result.data.transfer_items.length).toBe(2);
    expect(result.data.transfer_items[0].product_id).toBe(101);
    expect(result.data.transfer_items[1].product_id).toBe(102);

    // Verify database state
    const allTransfers = mockDb.getAllTransfers();
    const allTransferItems = mockDb.getAllTransferItems();
    expect(allTransfers.length).toBe(1);
    expect(allTransferItems.length).toBe(2);
  });

  // Test Case 2: Update Transfer with Items
  test('Should update a transfer with new items', async () => {
    // Arrange - First create a transfer
    const transferData = {
      reference_no: 'TRF-2025-0001',
      transfer_date: new Date('2025-05-10'),
      description: 'Initial description',
      status: 'pending',
      source_location: 'Warehouse A',
      destination_location: 'Warehouse B',
      approved_by: 'John Doe'
    };

    const transferItemsData = [
      {
        product_id: 101,
        quantity: 10,
        unit: 'box',
        notes: 'Initial notes'
      },
      {
        product_id: 102,
        quantity: 20,
        unit: 'piece',
        notes: 'Initial notes 2'
      }
    ];

    const createResult = await transferService.createTransfer(transferData, transferItemsData);
    const transferId = createResult.data.transfer.id;

    // Update data
    const updateTransferData = {
      description: 'Updated description',
      status: 'completed',
      approved_by: 'Jane Smith'
    };

    const updateTransferItemsData = [
      {
        product_id: 101,
        quantity: 15,
        unit: 'box',
        notes: 'Updated notes',
        batch_number: 'BTC-2025-001',
        expiry_date: new Date('2026-05-10'),
        serial_number: 'SN12345'
      },
      {
        product_id: 102,
        quantity: 25,
        unit: 'piece',
        notes: 'Updated notes 2',
        batch_number: 'BTC-2025-002',
        expiry_date: new Date('2026-06-15'),
        serial_number: 'SN67890'
      },
      {
        product_id: 103,
        quantity: 5,
        unit: 'pallet',
        notes: 'New item',
        batch_number: 'BTC-2025-003',
        expiry_date: new Date('2026-07-20'),
        serial_number: 'SN24680'
      }
    ];

    // Act
    const updateResult = await transferService.updateTransfer(
      transferId,
      updateTransferData,
      updateTransferItemsData
    );

    // Assert
    expect(updateResult.success).toBe(true);
    expect(updateResult.data.transfer.id).toBe(transferId);
    expect(updateResult.data.transfer.description).toBe('Updated description');
    expect(updateResult.data.transfer.status).toBe('completed');
    expect(updateResult.data.transfer.approved_by).toBe('Jane Smith');
    expect(updateResult.data.transfer_items.length).toBe(3);
    
    // Verify database state
    const updatedData = mockDb.getTransferWithItems(transferId);
    expect(updatedData.transfer.description).toBe('Updated description');
    expect(updatedData.transfer_items.length).toBe(3);
    
    // Check that old items were replaced
    const productIds = updatedData.transfer_items.map(item => item.product_id);
    expect(productIds).toContain(101);
    expect(productIds).toContain(102);
    expect(productIds).toContain(103);
  });

  // Test Case 3: Update Non-existent Transfer
  test('Should throw error when updating non-existent transfer', async () => {
    // Arrange
    const nonExistentId = 999;
    const updateData = { description: 'Updated description' };
    const updateItemsData = [{ product_id: 101, quantity: 15, unit: 'box' }];

    // Act & Assert
    await expect(
      transferService.updateTransfer(nonExistentId, updateData, updateItemsData)
    ).rejects.toThrow(`Transfer with ID ${nonExistentId} not found`);
  });

  // Test Case 4: Create Transfer with Multiple Items
  test('Should create a transfer with multiple items', async () => {
    // Arrange
    const transferData = {
      reference_no: 'TRF-2025-0005',
      transfer_date: new Date('2025-05-15'),
      description: 'Multiple items test',
      status: 'pending',
      source_location: 'Warehouse A',
      destination_location: 'Warehouse B',
      approved_by: 'John Doe'
    };

    const transferItemsData = [
      {
        product_id: 101,
        quantity: 10,
        unit: 'box',
        notes: 'Item 1'
      },
      {
        product_id: 102,
        quantity: 20,
        unit: 'piece',
        notes: 'Item 2'
      },
      {
        product_id: 103,
        quantity: 5,
        unit: 'pallet',
        notes: 'Item 3'
      },
      {
        product_id: 104,
        quantity: 30,
        unit: 'carton',
        notes: 'Item 4'
      },
      {
        product_id: 105,
        quantity: 15,
        unit: 'box',
        notes: 'Item 5'
      }
    ];

    // Act
    const result = await transferService.createTransfer(transferData, transferItemsData);

    // Assert
    expect(result.success).toBe(true);
    expect(result.data.transfer_items.length).toBe(5);
    
    // Verify database state
    const allTransfers = mockDb.getAllTransfers();
    const allTransferItems = mockDb.getAllTransferItems();
    expect(allTransfers.length).toBe(1);
    expect(allTransferItems.length).toBe(5);
  });
});
