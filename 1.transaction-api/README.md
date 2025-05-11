curl -X POST \
  http://localhost:3000/api/transfers \
  -H 'Content-Type: application/json' \
  -d '{
    "transfer": {
      "reference_no": "TRF-2025-0001",
      "transfer_date": "2025-05-10T10:00:00Z",
      "description": "Stock transfer from warehouse A to B",
      "status": "pending",
      "source_location": "Warehouse A",
      "destination_location": "Warehouse B",
      "approved_by": "John Doe"
    },
    "transfer_items": [
      {
        "product_id": 101,
        "quantity": 10,
        "unit": "box",
        "notes": "Handle with care",
        "batch_number": "BTC-2025-001",
        "expiry_date": "2026-05-10",
        "serial_number": "SN12345"
      },
      {
        "product_id": 102,
        "quantity": 20,
        "unit": "piece",
        "notes": "Fragile items",
        "batch_number": "BTC-2025-002",
        "expiry_date": "2026-06-15",
        "serial_number": "SN67890"
      }
    ]
  }'


curl -X PUT \
  http://localhost:3000/api/transfers/1 \
  -H 'Content-Type: application/json' \
  -d '{
    "transfer": {
      "description": "Updated stock transfer description",
      "status": "completed",
      "approved_by": "Jane Smith"
    },
    "transfer_items": [
      {
        "product_id": 101,
        "quantity": 15,
        "unit": "box",
        "notes": "Updated notes",
        "batch_number": "BTC-2025-001",
        "expiry_date": "2026-05-10",
        "serial_number": "SN12345"
      },
      {
        "product_id": 102,
        "quantity": 25,
        "unit": "piece",
        "notes": "Updated fragile items",
        "batch_number": "BTC-2025-002",
        "expiry_date": "2026-06-15",
        "serial_number": "SN67890"
      },
      {
        "product_id": 103,
        "quantity": 5,
        "unit": "pallet",
        "notes": "New item added",
        "batch_number": "BTC-2025-003",
        "expiry_date": "2026-07-20",
        "serial_number": "SN24680"
      },
      {
        "product_id": 104,
        "quantity": 30,
        "unit": "carton",
        "notes": "Another new item",
        "batch_number": "BTC-2025-004",
        "expiry_date": "2026-08-25",
        "serial_number": "SN13579"
      }
    ]
  }'

curl -X GET \
  http://localhost:3000/api/transfers/1