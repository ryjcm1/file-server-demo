const net = require("net");
const readline = require('readline');
const fs = require("fs");

let recievingFile = false;
let file_name;

const rl = readline.createInterface({
  input: process.stdin
});


const client = net.createConnection({
  host: "127.0.0.1",
  port: 3000
});

// setting the encoding incoming from the connection
client.setEncoding('utf8');


client.on('data', (data) => {

  if (!isErrorMessage(data) && recievingFile) {
    fs.writeFile(`./downloads/${file_name}`, data, (err) =>{
      if (err) throw err;
      console.log('The file has been saved!');
      recievingFile = false;
    });
  } else {
    console.log(data);
  }
  
});


rl.on('line', (input) => {
  client.write(input);

  //checks if asking for file
  isFileName(input);
});

client.on("end", () => {
  console.log('diconnected from the server');
  rl.close();
});


//check if input is a file request and creates creates the file path
const isFileName = (input) =>{
  let split = input.split(" ");
  if (split.length === 2 && split[0] === "file:") {
    file_name = split[1];
    recievingFile = true;
  }

};

const isErrorMessage = (input) =>{
  let split = input.split(" ");
  if (split[0] === "Error:") {
    return true;
  }
  return false;
};