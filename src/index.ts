import {ReadTransactionsCsvAsync} from "./services/ReadExcelAsync";
import {TransactionDataCleaner} from "./services/DataCleaner.js";
import { TransactionDataValidator } from "./services/DataValidator";
import {TransactionReportGenerator} from "./services/ReportGenerator.js";

const excelReader=new ReadTransactionsCsvAsync();
const dataCleaner = new TransactionDataCleaner();
const dataValidator = new TransactionDataValidator();
const reportGenerator = new TransactionReportGenerator();

async function Main(){
    const file="src/data/sample_tab_delimited.csv";
    let data=await excelReader.read(file);
    const Cleandata = dataCleaner.Clean(data);
    const {validRows, invalidRows, duplicateIds} = dataValidator.validateDataset(Cleandata);
    const summary = reportGenerator.generateSummary(validRows, invalidRows, duplicateIds);
    const report = reportGenerator.formatReport(summary);
    console.log(report);
}
Main();