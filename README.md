# Transaction Processor

A robust Node.js/TypeScript solution for cleaning, validating, and processing financial transaction data from multiple CSV formats. Built to handle inconsistent data with comprehensive validation and professional reporting.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Process a transaction file
npm start -- -f src/data/clean_transactions.csv
```markdown

## 📋 Features
Multi-format CSV Support: Handles comma, tab, and semicolon delimiters

Intelligent Data Cleaning: Normalizes dates, currency amounts, and status values

Comprehensive Validation: Business rule enforcement with duplicate detection

Professional Reporting: Detailed processing summaries and financial breakdowns

Error Resilience: Graceful handling of malformed data and edge cases

## 🛠️ Usage
Process Transaction Files
```bash
# Process clean transactions
npm start -- -f src/data/clean_transactions.csv

# Process messy transactions  
npm start -- -f src/data/messy_transactions.csv

# Process tab-delimited files
npm start -- -f src/data/tab_delimited.csv

# Process European format files
npm start -- -f src/data/european_format.csv

Development Commands
bash
# Build the project
npm run build

# Run in development mode with ts-node
npm run dev -- -f src/data/clean_transactions.csv

📁 Project Structure
text
src/
├── services/
│   ├── ReadExcelAsync.ts      # CSV file reader with format detection
│   ├── DataCleaner.ts         # Data normalization and standardization
│   ├── DataValidator.ts       # Business rule validation
│   └── ReportGenerator.ts     # Professional report generation
├── data/                      # Sample CSV files for testing
│   ├── clean_transactions.csv
│   ├── messy_transactions.csv
│   ├── tab_delimited.csv
│   └── european_format.csv
└── index.ts                   # Main application entry point

🔧 Data Processing Pipeline
The application follows a structured pipeline:

Extraction: Reads CSV files with automatic delimiter detection

Cleaning: Normalizes dates, amounts, currencies, and status values

Validation: Applies business rules and detects duplicates

Reporting: Generates comprehensive processing summaries

Supported Data Formats
Dates: YYYY-MM-DD, DD/MM/YYYY, MM/DD/YYYY, DD-MM-YYYY, YYYYMMDD

Amounts: $1,200.50, 1.200,50€, 1200.75, 1 200,25

Currencies: USD, EUR, GBP, JPY, CAD, AUD, CNY, CHF

Status Values: completed, success, failed, pending, processing, cancelled

📊 Sample Output
text
================================================================================
ACME PAYMENTS TRANSACTION PROCESSING REPORT
================================================================================
Generated: 2025-01-15 14:30:25

PROCESSING SUMMARY:
Total transactions processed: 1,240
Valid transactions: 1,215
Invalid transactions: 20
Duplicate transactions: 5
Processing time: 245ms

FINANCIAL SUMMARY:
Total amount (USD): 93,442.12
Total amount (EUR): 15,230.45

TRANSACTION STATUS BREAKDOWN:
Completed transactions: 1,180
Failed transactions: 35
Pending transactions: 25

================================================================================
🏗️ Technical Details
Language: TypeScript

Runtime: Node.js

Build Tool: TypeScript Compiler (tsc)

Module System: ES Modules

Architecture: Multi-layer pipeline with separation of concerns

🐛 Troubleshooting
Common Issues
File not found error:

Ensure file paths are relative to project root

Check file exists in src/data/ directory

Verify file extension is .csv

Build errors:

bash
# Clean install and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
TypeScript compilation issues:

bash
# Check TypeScript configuration
npx tsc --noEmit
📄 License
This project is part of a technical assessment for Ternary Solutions Inc.

🤝 Support
For questions or issues related to this implementation, please refer to the code documentation and inline comments.

Built with TypeScript + Node.js • Production-ready data processing • Comprehensive error handling