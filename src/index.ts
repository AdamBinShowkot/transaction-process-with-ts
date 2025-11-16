import {ReadTransactionsCsvAsync} from "./services/ReadExcelAsync";
import {TransactionDataCleaner} from "./services/DataCleaner.js";

const excelReader=new ReadTransactionsCsvAsync();
const dataCleaner = new TransactionDataCleaner();

async function Main(){
    const file="src/data/sample_messy_transactions.csv";
    let data=await excelReader.read(file);
    console.log(data);
    data = dataCleaner.Clean(data);
    console.log(data);
}
Main();