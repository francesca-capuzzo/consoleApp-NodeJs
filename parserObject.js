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

class ParseV2 {

    static parseToObject(csv) {
        const clearString = this.removeBlanckSpace(this.replaceCommaAtDot(csv))
        const lines = this.splitForNewLine(clearString);
        console.log("lines", lines);
        const properties = this.splitForSemicolon(lines[0]);
        console.log("proprietà", properties);
        let words = [];
        const users = [];
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            words = this.parseCSVLine(line);
            console.log(words);
            const objToReturn = {};
            for (let i = 0; i < properties.length; i++) {

                objToReturn[properties[i]] = words[i];
                console.log("obj", objToReturn);
                users.push(objToReturn);
            }
        }
        return users;

    }

    static parseCSVLine(line) {

        const arrayOfStrings = this.splitForSemicolon(line);

        const array6 = [];

        for (const word of arrayOfStrings) {
            const value = this.parseWord(word)

            array6.push(value);
        }
        return array6;
    }

    static parserToMatrix(csv) {

        const stringwithoutblanckspace = Parse.removeBlanckSpace(csv)

        const cleanString = this.replaceCommaAtDot(stringwithoutblanckspace);

        const stringNewLine = this.splitForNewLine(cleanString);

        let array2 = [];

        for (const line of stringNewLine) {
            const lineArray = this.parseCSVLine(line)
            array2.push(lineArray);

        }
        return array2;

    }

    static parseWord(word) {
        if (!isNaN(word)) {
            return parseFloat(word);
        }

        if (word.toLowerCase() === 'true' || word.toLowerCase() === 'false') {
            return word.toLowerCase() === 'true';
        }

        if ((new Date(word) !== "Invalid Date") && !isNaN(new Date(word))) {
            return new Date(word);
        }

        return word
    }

    static replaceCommaAtDot(string) {
        const replaced = string.replace(/,/g, ".");
        return replaced;
    }




    static removeBlanckSpace(string) {
        const replaced = string.replace(/ /g, "");
        return replaced;
    }

    static parseArrayToFloat(array) {
        let tempArray = [];
        for (let i = 0; i < array.length; i++) {
            const string = array[i];
            const parsed = parseFloat(string);
            if (!isNaN(parsed)) {
                tempArray.push(parsed);
            }

        }
        return tempArray;
    }
    static splitForNewLine(string) {
        const splittedStringOnNewLine = string.split(/\r?\n/);
        return splittedStringOnNewLine;
    }

    static splitForSemicolon(array) {
        const splittedString = array.split(";");
        return splittedString;
    }

}




module.exports = { ParseV2 };