class EmptyStringError extends Error{
    constructor(message){
        super(message);
    }
}


class InvalidStringError extends Error{
    constructor(message){
        super(message);
    }
}


class PartialInvalidStringError extends Error{
    constructor(message, partialResult){
        super(message);
        this.partialResult = partialResult;
    }
}

class Parser { 
    /* The second part is divided into two sub-parts:
     * @param {string} string - The string to be parsed.
     * @returns an array of numbers.
     */
    static parseCsvLine(string) {

        const IsStringEmpty = string.length === 0;

        if (IsStringEmpty) {
            throw new EmptyStringError("Stringa vuota")
        }

        const stringNoSpaces = this.removeSpaces(string);
        const stringNoCommas = this.changeSpecialChar(stringNoSpaces);
        const arrayOfString = this.separateStringOnSpecialChar(stringNoCommas);
        const numberArray = this.transformStringArrayInNumberArray(arrayOfString);


        if (numberArray.length === 0) {
            throw new InvalidStringError("Stringa invalida");
        }

        const AtLeastOneParseIsFailed = numberArray.length < arrayOfString.length;

        if (AtLeastOneParseIsFailed) {
            throw new PartialInvalidStringError("Parzialmente invalido", numberArray);
        }
        return numberArray;
    }


    static replaceAll(string, charToReplace, newChar) {
        const regex = new RegExp(charToReplace, "g");
        return string.replace(regex, newChar);
    }

    static removeSpaces(string) {
        return Parser.replaceAll(string, " ", "");
    }

    static changeSpecialChar(string) {
        return Parser.replaceAll(string, ",", ".");
    }

    static separateStringOnSpecialChar(string) {
        return string.split(";");
    }


    /* The function returns the number array
      * @param array - The array to be transformed.
      * @returns an array of numbers.
      */
    static transformStringArrayInNumberArray(array) {
        const numberArray = [];
        for (const string of array) {
            const number = parseFloat(string);
            if (isNaN(number) === false) {
                numberArray.push(number);
            }
        }
        return numberArray;
    }

    static sumArray(array){
        return array.reduce((a, b) => a + b, 0);
    }
}


module.exports = {Parser, InvalidStringError, EmptyStringError, PartialInvalidStringError};