# Transaction Reconciliation Engine

A production-style backend service built with **Node.js, Express, MongoDB, and CSV processing** to reconcile crypto transactions between user-provided records and exchange exports.

## Live Demo

Deployment:
https://transaction-reconciliation-engine-nqr8.onrender.com

GitHub:
https://github.com/Shailendrayadav18/transaction-reconciliation-engine

---

# Problem Statement

Given two CSV datasets representing the same crypto account activity:

- `user_transactions.csv`
- `exchange_transactions.csv`

Build a reconciliation engine that:

- Imports both datasets
- Handles messy and incomplete data
- Matches transactions using configurable tolerance rules
- Produces reconciliation reports
- Exposes REST APIs

---

# Features

### CSV Ingestion
- Upload user and exchange transaction CSV files
- Parse and validate records
- Store records in MongoDB
- Log bad rows instead of silently dropping them

### Data Quality Validation
Detects:
- Missing timestamps
- Invalid dates
- Missing asset values
- Invalid quantities

Invalid rows are stored separately with reasons.

### Transaction Matching Engine

Transactions are matched using configurable tolerances:

| Field | Rule |
|-------|------|
| Timestamp | ± configurable seconds |
| Quantity | ± configurable percentage |
| Asset | Case-insensitive + alias mapping |
| Type | Exact match + equivalent mapping |

Supported mappings:

```text
TRANSFER_OUT ↔ TRANSFER_IN
BTC ↔ BITCOIN
ETH ↔ ETHEREUM
```

---

# Reconciliation Categories

### Matched
Transactions matched successfully.

### Conflicting
Transactions found but values exceed tolerance.

### Unmatched User
Present only in user dataset.

### Unmatched Exchange
Present only in exchange dataset.

---

# Architecture

```text
CSV Upload
    ↓
Validation Layer
    ↓
Normalization
    ↓
MongoDB Storage
    ↓
Matching Engine
    ↓
Report Generator
    ↓
REST API
```

---

# Tech Stack

Backend:
- Node.js
- Express.js

Database:
- MongoDB Atlas
- Mongoose

Utilities:
- Multer
- CSV Parser
- json2csv

Deployment:
- Render

---

# Folder Structure

```text
src
├── config
│   └── db.js

├── controllers
│   └── reconciliation.controller.js

├── models
│   ├── Transaction.js
│   ├── Report.js
│   ├── DataQualityIssue.js

├── routes
│   └── reconciliation.routes.js

├── services
│   ├── csv.service.js
│   ├── validation.service.js
│   ├── normalization.service.js
│   ├── matching.service.js
│   └── reconciliation.service.js

├── utils
│   └── csvExport.js

├── app.js
└── server.js
```

---

# API Endpoints

## Trigger Reconciliation

```http
POST /api/reconcile
```

Body → multipart/form-data

| Key | Type |
|------|------|
| user | File |
| exchange | File |
| timestampTolerance | Text |
| quantityTolerance | Text |

Example:

```text
timestampTolerance=300
quantityTolerance=0.01
```

Response:

```json
{
  "success": true,
  "runId": "1779691573022"
}
```

---

## Get Full Report

```http
GET /api/report/:runId
```

---

## Get Summary

```http
GET /api/report/:runId/summary
```

Response:

```json
{
  "matched": 25,
  "conflicting": 3,
  "userOnly": 4,
  "exchangeOnly": 2
}
```

---

## Get Unmatched Records

```http
GET /api/report/:runId/unmatched
```

---

# Environment Variables

Create `.env`

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

TIMESTAMP_TOLERANCE_SECONDS=300

QUANTITY_TOLERANCE_PCT=0.01
```

---

# Local Setup

Clone repository:

```bash
git clone https://github.com/Shailendrayadav18/transaction-reconciliation-engine
```

Install:

```bash
npm install
```

Run:

```bash
npm run dev
```

Server:

```text
http://localhost:3000
```

---

# Deployment

Deployed using Render.

Production URL:

https://transaction-reconciliation-engine-nqr8.onrender.com

---

# Design Decisions

### Why MongoDB?
Flexible schema for handling inconsistent CSV data.

### Why configurable tolerances?
Different exchanges report slightly different timestamps and quantities.

### Why store invalid rows?
To preserve auditability and improve reconciliation transparency.

---

# Future Improvements

- Docker support
- Swagger API documentation
- Authentication
- Background processing
- Web dashboard
- Batch reconciliation
- Report download endpoint

---

# Author

Shailendra Yadav

Backend Engineering Assignment