import {ReadTransactionsCsvAsync} from "./services/ReadExcelAsync";

const excelReader=new ReadTransactionsCsvAsync();

async function Main(){
    const file="src/data/sample_messy_transactions.csv";
    let data=await excelReader.read(file);
    console.log(data);
}
Main();