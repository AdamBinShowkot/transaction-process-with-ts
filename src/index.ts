import {ReadTransactionsCsvAsync} from "./services/ReadExcelAsync";
import {TransactionDataCleaner} from "./services/DataCleaner.js";
import { TransactionDataValidator } from "./services/DataValidator";
import {TransactionReportGenerator} from "./services/ReportGenerator.js";
import * as path from 'path';

const excelReader=new ReadTransactionsCsvAsync();
const dataCleaner = new TransactionDataCleaner();
const dataValidator = new TransactionDataValidator();
const reportGenerator = new TransactionReportGenerator();

async function Main(){
    const args = process.argv.slice(2);
    let file="src/data/european_format.csv";

    // Simple argument parsing for -f
    if (args[0] === '-f' && args[1]) {
        file = args[1];
    } else if (args[0] && !args[0].startsWith('-')) {
        file = args[0];
    }
    console.log(`Processing file: ${file}`);

    let data=await excelReader.read(file);
    const Cleandata = dataCleaner.Clean(data);
    const {validRows, invalidRows, duplicateIds} = dataValidator.validateDataset(Cleandata);
    const summary = reportGenerator.generateSummary(validRows, invalidRows, duplicateIds);
    const report = reportGenerator.formatReport(summary);
    console.log(report);
}
Main();