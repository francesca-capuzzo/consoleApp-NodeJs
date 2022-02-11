class ParserObject{

    static parseCsvArray(csv){//--> prima funzione per il primo caso di imput
        const cleanCsv = this.removeSpaces(this.changeCommaWithDot(csv));
        const lines = this.splitByLine(cleanCsv);
        let array = [];
        for (const line of lines) {
            const lineArray = this.parseLine(line);
            this.generateObjectFromArray(lineArray, array[0]);
            
        }
        return array;
    }

    static generateObjectFromArray(array, keys) {
        let object={};
        let values = array;
        for (let i = 0; i < array.length; i++) {
            object[keys[i]] = values[i];
        }
        return object;
    }



}

module.exports = ParserObject