"use strict"

const fs = require('fs')

const ParserClasse = require("./parserExClasse.js"); 

const arg = process.argv.slice(2);   
const fileToRead = arg[0];
const fileToWrite = arg[1];
// const outputType = arg[2]; //----> questo perchè uso la funzione parseCsv che ha output e devo poi chiamarlo nel terminale (node appExClasse.js -a ./filetoread ./filetowrite)


////////////////////////////////////////////////////////////////////////////////////
//NON PIù READFILESYNC MA SOLO READFILE!!

// fs.readFile(fileToRead, "utf8", (error, data) => {                                                 // //--->ASYNCRONOUS!!!!!!!!!!!
//     if (error) {
//         console.log(error);
//     } else {
//         const array = ParserClasse.parseCsvArray(data);
//         console.log(array);
//     }
// });

////////////////////////////////////////////////////////////////////////////////////
//LE VERSIONI SEGUENTI SONO SEMPRE ASYNC MA FATTE CON LA FUNZIONE ANZICHè DIRETTAMENTE IN LAMBDA!!

fs.readFile(fileToRead, "utf8", manageFileData); //----> da linea 24 a linea 33 è la stessa cosa che c'è da linea 13 a linea 20 (scritta senza la kambda e con la funzione passata come parametro!!)

function manageFileData(error, data) {
    if (error) {
        console.log(error);
    } else {
        // const array = ParserClasse.parseCsvArray(data);
        // const array = ParserClasse.parseCsvToMatrix(data);
        // const array = ParserClasse.parseCsv(data, outputType)
        const array = ParserClasse.parseCsvArraytoObject(data);
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