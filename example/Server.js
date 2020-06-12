const {Server, Event} = require('./Sockent.js');
const loops_ps = 20;
const port = 55000;
const address = 'http://127.0.0.1';

let server = new Server(address, port);

server.on('hello', (evt) => {
  console.log('hello', evt.data);
  server.transmit(new Event('hi', {c:3, d:4}, evt.socket));
});
setInterval(function () {
  server.handlePendingEvents();
}, 1000/loops_ps);
