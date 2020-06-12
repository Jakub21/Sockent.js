const {Client, Event} = require('./Sockent.js');
const loops_ps = 20;
const port = 55000;
const address = 'http://127.0.0.1';

let client = new Client(address, port);

client.on('hi', (evt) => {
  console.log('hi', evt.data);
});
setInterval(function () {
  client.handlePendingEvents();
}, 1000/loops_ps);

setInterval(function () {
  client.transmit(new Event('hello', {a:1, b:2}));
}, 1250);
