"use strict"


const fs = require('fs')

const {Parser, PartialInvalidError, InvalidStringError, EmptyStringError} = require("./parser.js") //--> l'estensione non è obbligatoria ma il./ si!!

const arg = process.argv.slice(2);     
const fileToRead = arg[0];
const fileToWrite = arg[1];

let result;
let data;
try {
    
    data = fs.readFileSync(fileToRead, "utf8")
    result = Parser.parseCsvLine(data);
    let result2 = Parser.sumArray(result);
    console.log(result2)
} catch (error) {
    console.error(error.message);
    
    if(error instanceof PartialInvalidStringError){
        result = error.partialResult;
        let result2 = Parser.sumArray(result);
        console.log(result2);
    }
}

let array = [];

try {
    array = Parser.parseCsvLine(data);
    console.log("array", array);
    console.log("sum", array.reduce((a,b)=>a+b));
} catch (error) {
    console.log(error.message);
    if (error instanceof PartialInvalidError) {
        array = error.partialResult;
    }
}

try{
    fs.writeFileSync(fileToWrite, JSON.stringify(array));      
} catch (error) {                                                  
    console.log(error.message);
}