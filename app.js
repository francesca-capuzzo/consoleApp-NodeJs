"use strict"

//fs = "file system" ---> è un modulo di node che usa REQUIRE per essere chiamato.
//fs è una classe creata per leggere i file ---> viene poi chiamato un file (con uno specifico URL) con READFILESYNC e messo nella const DATA
//il try/catch è fondamentale perchè la lettura di file potrebbe essere inesistente, corrotto, ecc ecc ---> nonostante possa generare un errore, il programma continuerebbe a funzionare (se try/catch non ci fosse, il programma avrebbe lo stesso errore ma si fermerebbe)

const fs = require('fs')

const {Parser, PartialInvalidError, InvalidStringError, EmptyStringError} = require("./parser.js") //--> l'estensione non è obbligatoria ma il./ si!!

// console.log(process.argv);
const arg = process.argv.slice(2);     //vedi COMMENTI IN FONDO --> uso slice(2) perchè mi interessano solo i file di lettura e scrittura.
const fileToRead = arg[0];
const fileToWrite = arg[1];

let result;
let data;
try {
    // data = fs.readFileSync("./test.csv", "utf8")     -->CAMBIO CON LINEA 20 PERCHè DEFINISCO I FILETOREAD E WRITE DIRETTAMENTE NEL TERMINALE --> l'altro (filetowrite) è alla linea 50
    data = fs.readFileSync(fileToRead, "utf8")
    result = Parser.parseCsvLine(data);
    let result2 = Parser.sumArray(result);
    console.log(result2)
} catch (error) {
    console.error(error.message);
    // if (error instanceof InvalidStringError) {
    //     console.log(error.message)
    // }
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

try {                                                                //-->CAMBIO LINEA 50 con linea 51 PERCHè DEFINISCO I FILETOREAD E WRITE DIRETTAMENTE NEL TERMINALE --> l'altro (filetoread) è alla linea 20
    //fs.writeFileSync("./result.json", JSON.stringify(array))       //--> WRITEFILE è il modo di Node di scrivere i dati che gli vengono passati e metterli dentro ad un file di testo .txt o .json (json è meglio perchè riconosce il type dei dati)
    fs.writeFileSync(fileToWrite, JSON.stringify(array));            //--> il writefile prende 2 dati (nome del file da creare, + , file JSON quindi necessariamente stringa, dei dati che voglio riportare)
} catch (error) {                                                  
    console.log(error.message);
}

////////////////////////////////////// OUTPUT DEL TERMINALE ///////////////////////////////////////////////////////////////////////////////////////////////////

//CIò CHE PRINTA NEL TERMINALE IL CONSOLE.LOG FATTO ALLA RIGA 11:

/*PS C:\Users\Allievo10\Desktop\github\consoleApp-NodeJs> node app.js ./test.csv ./pippo.json
[
    'C:\\Program Files\\nodejs\\node.exe',                                            -->indica l'executable di js da cui parte tutto
    'C:\\Users\\Allievo10\\Desktop\\github\\consoleApp-NodeJs\\app.js',               -->indica la cartella dove sto lavorando
    './test.csv',                                                                     -->indica il file che voglio parsare(file to read) ---> const fileToRead = arg[0]; FATTO ALLA LINEA 13
    './pippo.json'                                                                    -->indica il file che volgio creare con il risultato del parse ---> const fileToWrite = arg[1]; FATTO ALLA LINEA 14
  ]
  23.734
  array [
      1,   5,    12,
      2, 1.4, 0.234,
    2.1
  ]*/


