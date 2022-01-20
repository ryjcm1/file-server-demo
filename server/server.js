const net = require('net');
const fs = require("fs");

const port = 3000;


const server = net.createServer();


// server.js
// add this line after server is created, before listen is called
server.on('connection', (socket) => {
  socket.setEncoding('utf-8');
  

  console.log('New client connected!');
  socket.write('Hello there, please enter the file name you want to download!');




  socket.on('data', (data)=>{
    
    if (isFileRequest(data)) {
      let fileName = data.split(" ")[1];

      let path = `./files/${fileName}`;
      let doesFileExist = fs.existsSync(path);
    
      if (doesFileExist) {
        console.log(`sending ${data}...`);
        let storedFile = fs.readFileSync(path, 'utf-8');
        socket.write(storedFile);
  
        
      } else {
        socket.write("Error: This file does not exist in our servers.");
      }


    } else {
      socket.write("Please type file: _____ for the file you want to download.");
    }


  });

  
});



server.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});


//checks if data is a file request
isFileRequest = (input) =>{
  let split = input.split(" ");
  if (split.length === 2 && split[0] === "file:") {
    return true;
  }
  return false;
};

