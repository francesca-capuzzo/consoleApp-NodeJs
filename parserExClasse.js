class ParserClasse{

    static parseCsvArray(csv){//--> prima funzione per il primo caso di imput
        const cleanCsv = this.removeSpaces(this.changeCommaWithDot(csv));
        const lines = this.splitByLine(cleanCsv);
        let array = [];
        for (const line of lines) {
            const lineArray = this.parseLine(line);
            array = array.concat(lineArray);
        }
        return array;
    }



    static parseCsvToMatrix(csv){//--> seconda funzione per il secondo caso di imput (matrice)
        const cleanCsv = this.removeSpaces(this.changeCommaWithDot(csv));
        const lines = this.splitByLine(cleanCsv);
        let array = [];
        for (const line of lines) {
            const lineArray = this.parseLine(line);
            array.push(lineArray);
        }
        return array;
    }



    // static parseCsv(csv, outputType){// --> terza funzione per il comprimere le prime due
    //     const cleanCsv = this.removeSpaces(this.changeCommaWithDot(csv));
    //     const lines = this.splitByLine(cleanCsv);
    //     let array = [];
    //     for (const line of lines) {
    //         const lineArray = this.parseLine(line);
    //         if(outputType == "-a"){                          //--> outputType lo inserisco poi nel readFile di appExClasse --> -a è come intendere una flag della command line (in questo caso "-a" = array)
    //             array = array.concat(lineArray);
    //         }else{
    //             array.push(lineArray);
    //         }
    //     }
    //     return array;
    // }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    static parseLine(line){//--> prende ogni linea che gli passo e la parsa spezzandole sul punto e virgola
        const words = this.separateStringOnSemicolon(line);
        let array = [];
        for (const word of words) {
            const value = this.parseWord(word);
            array.push(value);
        }
        return array;
    }

    static parseWord(word){//--> prende un elemento di ogni linea e DECIDE IL TIPO e come parsarlo di conseguenza -----> FUNZIONE FONDAMENTALE CHE GESTISCE IL FLUSSO DI LAVORO GENERALE sulla matrice
        if (!isNaN(word)) {//--> se è un numero ritorna un numero parsato
            return parseFloat(word); 
        }
        if (word.toLowerCase() === "true" || word.toLowerCase() === "false") {//--> se è un boolean ritorna un boolean true se è true e false se è false mettendolo a confronto con il true
            return word.toLowerCase() === "true";
        }
        if ((new Date(word) !== "Invalid Date") && !isNaN(new Date(word))) {//--> se è una data ritorna una data (fun)
            return new Date(word);
        }
        return word;
    }

    static splitByLine(string){//--> splitta la stringa sull'a-capo
        const arrayOfStrings = string.split(/\n?\r/)  //--> prende \n , \r o entrambi
        return arrayOfStrings;
    }

    static replaceAll(string, charToReplace, newChar) {//--> regular expression che serve nelle funzioni seguenti per rimpiazzare un valore con un altro (in questo caso punteggiatura)
        const regex = new RegExp(charToReplace, "g");
        return string.replace(regex, newChar);
    }

    static removeSpaces(string) {//--> toglie gli spazi e li rimpiazza con niente
        return ParserClasse.replaceAll(string, " ", "");
    }

    static changeCommaWithDot(string) {//--> scambia la virgola con il punto (si tratta della virgola nei numeri decimali 2,1 che dovrebbe essere 2.1)
        return ParserClasse.replaceAll(string, ",", ".");
    }

    static separateStringOnSemicolon(string) {//--> splitta la stringa sul punto e virgola
        return string.split(";");
    }

}

module.exports = ParserClasse