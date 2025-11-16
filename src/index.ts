import {ReadTransactionsCsvAsync} from "./services/ReadExcelAsync";
import {TransactionDataCleaner} from "./services/DataCleaner.js";
import { TransactionDataValidator } from "./services/DataValidator";

const excelReader=new ReadTransactionsCsvAsync();
const dataCleaner = new TransactionDataCleaner();
const dataValidator = new TransactionDataValidator();

async function Main(){
    const file="src/data/sample_messy_transactions.csv";
    let data=await excelReader.read(file);
    const Cleandata = dataCleaner.Clean(data);
    const {validRows, invalidRows, duplicateIds} = dataValidator.validateDataset(Cleandata);

    console.log({validRows, invalidRows, duplicateIds});
}
Main();