"use strict"

const fs = require("fs"); //--> leggi file di NODE

const ParserObjClass = require("./parserObjectClasse"); //-->leggi la classe parser che serve

// const fileToRead = "./input/test4.csv"; //--> leggi il file di input
// const fileToWrite = "./output/resultTest4Classe.json"
const fileToRead = "./input/test5-separator.csv"; //--> leggi il file di input
const fileToWrite = "./output/resultTest5Classe.json"

fs.readFile(fileToRead, "utf8", fileReaderCallback) //chiama la lettura del file e la funzione da chiamare per leggere il mio input file

function fileReaderCallback(error, data) {
    if (error) {
        console.log(error);
    } else {
        const arrayOfUsers = ParserObjClass.parseCsv(data, "#");
        fs.writeFile(fileToWrite, JSON.stringify(arrayOfUsers), (error) => {
            if (error) {
                console.log(error);
            }
        })
    }
}