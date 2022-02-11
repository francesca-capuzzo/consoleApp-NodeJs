class EmptyStringError extends Error {
    constructor(message) {
        super(message);
    }
}

class InvalidStringError extends Error {
    constructor(message) {
        super(message);
    }
}


class PartialInvalidStringError extends Error {
    constructor(message, array) {
        super(message)
        this.array = array;

    }
}

class Parser {

    static csvParse(string) {
        if (string.length === 0) {
            throw new EmptyStringError("Stringa vuota")
        }
        const tempString = Parser.ReplaceAll(string);
        // console.log("temp string",tempString);
        const tempArray = Parser.Splitter(tempString);
        // console.log("temp array",tempArray);
        let newArray = []
        for (let i = 0; i < tempArray.length; i++) {
            let intArray = Parser.checkParse(tempArray[i])
            newArray.push(intArray)

        }
        //const newArray = Parser.checkParse(tempArray);
        // console.log("new array",newArray);
        return newArray;
    }

    static ReplaceAll(string) {
        let stringNumber = string;
        if (string.includes(",")) {
            return stringNumber.replace(/,/g, ".");
        }
        return stringNumber;
    }

    static Splitter(string) {
        let tempString = string.split("\n");
        let resultArray = [];
        for (let i = 0; i < tempString.length; i++) {
            let tempArray = tempString[i].split("; ")
            resultArray.push(tempArray)
        }
        return resultArray;
    }

    static checkParse(array) {
        let newArray = [];
        for (let i = 0; i < array.length; i++) {
            let numbers = parseFloat(array[i])
            if (!isNaN(numbers)) {
                newArray.push(numbers);
            } else {
                if (array[i] === "true") {
                    let boolValue = (array[i] == "true")
                    newArray.push(boolValue);
                }
                else if (array[i] === "false") {
                    let boolValue2 = (array[i] == "true")
                    newArray.push(boolValue2);
                } else {
                    newArray.push(array[i])
                }
            }
        }
        return newArray;
    }
}


module.exports = { Parser, PartialInvalidStringError, InvalidStringError, EmptyStringError }