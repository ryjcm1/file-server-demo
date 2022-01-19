const net = require('net');
const fs = require("fs")

const port = 3000;


const server = net.createServer();




// server.js
// add this line after server is created, before listen is called
server.on('connection', (socket) => {
  socket.setEncoding('utf-8')
  

  console.log('New client connected!');
  socket.write('Hello there, please enter the file name you want to download!');




  socket.on('data', (data)=>{
    let path = `./files/${data}`
  
    if(fs.existsSync(path)){
      socket.write(`The file ${data} exists!`)
      let storedFile = fs.readFileSync(path, 'utf-8')
      console.log(storedFile)
    }

  })
});



server.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
