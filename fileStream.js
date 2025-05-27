const fs = require('fs');

const stream = fs.createReadStream('example.txt', 'utf8');
stream.on('data', chunk => {
  console.log('Received chunk:', chunk);
});
stream.on('end', () => {
  console.log('Stream ended');
});