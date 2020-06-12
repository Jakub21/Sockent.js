const loops_ps = 20;
const port = 55000;
const address = 'http://127.0.0.1';
const snt = require('./index.js');

let server = new snt.Server(address, port);
server.on('connect', (evt) => {
  console.log('connected');
});
server.on('close', (evt) => {
  console.log('closed');
});
server.on('hello', (evt) => {
  console.log('hello', evt.data);
  server.transmit(new snt.Event('hi', {c:3, d:4}, evt.socket));
});
setInterval(function () {
  server.handlePendingEvents();
}, 1000/loops_ps);
