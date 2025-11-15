import {ReadTransactionsCsvAsync} from "./services/ReadExcelAsync";

const excelReader=new ReadTransactionsCsvAsync();

async function Main(){
    const file="src/data/european_format.csv";
    let data=await excelReader.read(file);
    console.log(data);
}
Main();