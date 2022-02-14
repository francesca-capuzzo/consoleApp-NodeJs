//NB in generale un csv (comma separated value) sono valori separati da una virgola (se il computer è in inglese) o da un punto e virgola (se è in italiano).


// ripulire la stringa da spazi e trasformare le virgole in punti 
// creare un array di linee (lines) spezzando la stringa per ogni linea
// creare un array di proprietà (properties) spezzando la prima linea per punto e virgola
// creare un array (users) vuoto per contenere gli oggetti che creeremo
// ciclare sulle linee rimanenti
// per ogni linea: creare un array di parole (words) spezzando la linea sul punto e virgola e parsando le parole
//                 creare un oggetto vuoto
//                 ciclare sull'array delle proprietà 
//                 per ogni proprietà assegnare  all'oggeto la proprietà attribuendogli il valore corrispondente all'indice della proprietà nell'array delle parole
//                 aggiungere l'oggetto all'array users
// ritornare l'array users



class ParserObjClass {
    
    // static parseCsv(csvString){
    //     const csvNoSpaces = this.removeSpaces(csvString); //--> USO FUNZIONE 2 (e 1 intrinseca)
    //     console.log(csvNoSpaces); //2*
    //     const csvNoCommas = this.removeCommas(csvNoSpaces); //--> USO FUNZIONE 3
    //     console.log((csvNoCommas)); //3*
    //     const arrayOfLines = this.splitLines(csvNoCommas); //--> USO FUNZIONE 4 (creo array con tutto su una linea in cui ogni linea ha un index)
    //     console.log(arrayOfLines); //4*

    //     const firstLine = arrayOfLines[0]; //5*
    //     const arrayOfProperties = this.splitLineBySemicolon(firstLine); //--> CREO LE KEY (PROPERTIES)
    //     console.log(arrayOfProperties);

    //     const arrayOfUsers = [];

    //     for (let i = 1; i < arrayOfLines.length; i++) {
    //         const line = arrayOfLines[i];  //--> CICLO SULLE LINEE 2 3 4 5
    //         const arrayOfWords = this.parseValueFromLine(line); //7 e 6
    //         const user = {};
    //         for (let j = 0; j < arrayOfProperties.length; j++) {  //-->CICLO SULL'ARRAY DELLE KEY
    //             const property = arrayOfProperties[j]; //--> ASSEGNO A KEY[J] IL NOME PROPERTY
    //             user[property] = arrayOfWords[j]; //--> PER OGNUNA DELLE PROPERTY(KEY), GLI ASSEGNO IL VALORE DI OGNI LINEA ALL'INDICE J (uguale a quello della proprietà) --> key[0]=value[0]
    //         }
    //         arrayOfUsers.push(user);
    //     }
    //     return arrayOfUsers;
    // }


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //WITH SEPARATOR:
    static parseCsv(csvString, separator = ","){
        const csvNoSpaces = this.removeSpaces(csvString); //--> USO FUNZIONE 2 (e 1 intrinseca)
        console.log(csvNoSpaces); //2*
        
        const arrayOfLines = this.splitLines(csvNoSpaces); //--> USO FUNZIONE 4 (creo array con tutto su una linea in cui ogni linea ha un index)
        console.log(arrayOfLines); //4*

        const firstLine = arrayOfLines[0]; //5*
        const arrayOfProperties = this.splitLineBySeparator(firstLine, separator); //--> CREO LE KEY (PROPERTIES)
        console.log(arrayOfProperties);

        const arrayOfUsers = [];

        for (let i = 1; i < arrayOfLines.length; i++) {
            const line = arrayOfLines[i];  //--> CICLO SULLE LINEE 2 3 4 5
            const arrayOfWords = this.parseValueFromLine(line, separator); //7 e 6
            const user = {};
            for (let j = 0; j < arrayOfProperties.length; j++) {  //-->CICLO SULL'ARRAY DELLE KEY
                const property = arrayOfProperties[j]; //--> ASSEGNO A KEY[J] IL NOME PROPERTY
                user[property] = arrayOfWords[j]; //--> PER OGNUNA DELLE PROPERTY(KEY), GLI ASSEGNO IL VALORE DI OGNI LINEA ALL'INDICE J (uguale a quello della proprietà) --> key[0]=value[0]
            }
            arrayOfUsers.push(user);
        }
        return arrayOfUsers;
    }
    


    //1
    static replaceAll(originalString, charToRemove, newChar){
        const regex = new RegExp(charToRemove, "g");
        const replacedString = originalString.replace(regex, newChar);
        return replacedString;
        // return originalString.replace(regex, newChar)
    }
    //2
    static removeSpaces(string){
        const stringNoSpaces = this.replaceAll(string, " ", "");
        return stringNoSpaces;
    }
    //3
    static removeCommas(string){
        const stringNoCommas = this.replaceAll(string, ",", ".");
        return stringNoCommas;
    }
    //4
    static splitLines(string){
        const arrayOfLines = string.split(/\r?\n/g);
        return arrayOfLines;
    }
    //5
    static splitLineBySemicolon(string){
        const arrayOfWords = string.split(";");
        return arrayOfWords;
    }
    //5- with separator
    static splitLineBySeparator(string, separator){
        const arrayOfWords = string.split(separator);
        return arrayOfWords;
    }
    //6
    static parseWord(string){
        if (isNaN(string) === false) {
            return parseFloat(string);
        }
        if (string.toLowerCase() === "true"){
            return true;
        }
        if (string.toLowerCase() === "false") {
            return false;
        }
        if (new Date(string) !== "Invalid Date" && !isNaN(new Date(string))) {
            return new Date(string);
        }
        return string;
    }
    //7
    static parseValueFromLine(string){
        const arrayOfWords = this.splitLineBySemicolon(string);
        const arrayOfValues = [];
        for (const word of arrayOfWords) {
            const value = this.parseWord(word);
            arrayOfValues.push(value);
        }
        return arrayOfValues;
    }
    //7 - with separator
    static parseValueFromLine(string, separator){
        const arrayOfWords = this.splitLineBySeparator(string, separator);
        const arrayOfValues = [];
        for (const word of arrayOfWords) {
            const value = this.parseWord(word);
            arrayOfValues.push(value);
        }
        return arrayOfValues;
    }
}

module.exports = ParserObjClass;