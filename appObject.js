"use strict"
const fs = require('fs');
const {ParseV2}= require('./parserV2.js');



const arg = process.argv.slice(2);

const fileToRead = arg[0];
const fileToWrite = arg[1];


let array1 = [];

try {
  const data = fs.readFileSync(fileToRead, 'utf8')
  array1 = ParseV2.parseToObject(data);
    console.log(array1)
  } catch (err) {
    console.error(err)
  } 


try {
    fs.writeFileSync(fileToWrite, JSON.stringify(array1))
} catch (error) {
    console.log(error);
}



console.log("ho già letto?");