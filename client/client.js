const net = require("net");
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin
});


const client = net.createConnection({
  host: "127.0.0.1",
  port: 3000
})

// setting the encoding incoming from the connection
client.setEncoding('utf8');

// handling data sent from the server
client.on('data', (data) => {
  console.log(data);
});


rl.on('line', (input) => {
  client.write(input)
});

client.on("end", () => {
  console.log('diconnected from the server');
  rl.close();
})