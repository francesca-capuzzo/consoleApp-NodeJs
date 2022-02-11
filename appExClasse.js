"use strict"

const fs = require('fs')

const ParserClasse = require("./parserExClasse.js"); 

const arg = process.argv.slice(2);   
const fileToRead = arg[0];
const fileToWrite = arg[1];


// fs.readFile(fileToRead, "utf8", (error, data) => {//--->ASYNCRONOUS!!!!!!!!!!!
//     if (error) {
//         console.log(error);
//     } else {
//         const array = ParserClasse.parseCsvArray(data);
//         console.log(array);
//     }
// });



fs.readFile(fileToRead, "utf8", manageFileData); //----> da linea 24 a linea 33 è la stessa cosa che c'è da linea 13 a linea 20 (scritta senza la kambda e con la funzione passata come parametro!!)

function manageFileData(error, data) {
    if (error) {
        console.log(error);
    } else {
        const array = ParserClasse.parseCsvArray(data);
        const json = JSON.stringify(array);
        writeJsonFile(json);
    }
}

function writeJsonFile(json) {
    fs.writeFile(fileToWrite, json, error => {
        if (error) {
            console.log(error);
        } else { 
            console.log("File scritto/salvato correttamente!");
        }
    })
}



console.log("già letto?");

// let data;
// try {
//     // data = fs.readFileSync("./test.csv", "utf8")   
//     data = fs.readFileSync(fileToRead, "utf8")
//     console.log(data)
// } catch (error) {
//     console.error(error.message);
// }

// let array = [];

// try {
//     array = ParserClasse.parseCsvLine(data);
//     console.log("array", array);
//     console.log("sum", array.reduce((a,b)=>a+b));
// } catch (error) {
//     console.log(error.message);
//     if (error instanceof PartialInvalidError) {
//         array = error.partialResult;
//     }
// }

// try {                                                               
//     //fs.writeFileSync("./result.json", JSON.stringify(array))       
//     fs.writeFileSync(fileToWrite, JSON.stringify(array));
// } catch (error) {                                                  
//     console.log(error.message);
// }