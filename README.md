# Transaction Processor

A robust **Node.js + TypeScript** solution for cleaning, validating, and
processing financial transaction data from multiple CSV formats.\
Designed to handle messy, inconsistent data with intelligent cleaning,
strong validation, and professional reporting.

## 🚀 Quick Start 

``` bash
# Install dependencies
npm install

# Build the project
npm run build

# Process a transaction file
npm start -- -f src/data/clean_transactions.csv
```

## ✨ Features

-   **Multi-format CSV Support:** Handles comma, tab, space, and
    semicolon delimiters\
-   **Intelligent Data Cleaning:** Normalizes dates, currency amounts,
    and status values\
-   **Comprehensive Validation:** Business rule enforcement + duplicate
    detection\
-   **Professional Reporting:** Detailed summaries, financial totals,
    and breakdowns\
-   **Error Resilience:** Graceful handling of malformed or inconsistent
    data

## 🛠️ Usage

### Process Transaction Files

``` bash
npm start -- -f src/data/clean_transactions.csv
npm start -- -f src/data/messy_transactions.csv
npm start -- -f src/data/tab_delimited.csv
npm start -- -f src/data/european_format.csv
```

### Development Commands

``` bash
npm run build
npm run dev -- -f src/data/clean_transactions.csv
```

## 📁 Project Structure

    src/
    ├── services/
    │   ├── ReadExcelAsync.ts
    │   ├── DataCleaner.ts
    │   ├── DataValidator.ts
    │   └── ReportGenerator.ts
    ├── data/
    │   ├── clean_transactions.csv
    │   ├── messy_transactions.csv
    │   ├── tab_delimited.csv
    │   └── european_format.csv
    └── index.ts

## 🔧 Data Processing Pipeline

1.  **Extraction** -- Reads CSV with automatic delimiter detection\
2.  **Cleaning** -- Normalizes dates, amounts, currencies, status
    values\
3.  **Validation** -- Business rules + duplicate detection\
4.  **Reporting** -- Generates structured summaries

## 📐 Supported Data Formats

### Date Formats

YYYY-MM-DD, DD/MM/YYYY, MM/DD/YYYY, DD-MM-YYYY, YYYYMMDD

### Amount Formats

\$1,200.50, 1.200,50€, 1200.75, 1 200,25

### Currencies

USD, EUR, GBP, JPY, CAD, AUD, CNY, CHF

### Status Values

completed, success, failed, pending, processing, cancelled

## 📊 Sample Output

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

## 🏗️ Technical Details

-   TypeScript\
-   Node.js\
-   TypeScript Compiler (tsc)\
-   ES Modules\
-   Multi-layer pipeline architecture

## 🐛 Troubleshooting

### File not found

Ensure correct file path and CSV extension.

### Build issues

``` bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### TypeScript check

``` bash
npx tsc --noEmit
```

## 📄 License

This project is part of a technical assessment.

## 🤝 Support

Refer to inline comments and documentation.
