const loops_ps = 20;
const snt = require('./index.js');

let client = new snt.Client('http://127.0.0.1', 55000);
client.connect();
client.on('hi', (evt) => {
  console.log('hi', evt.data);
});
setInterval(function () {
  client.handlePendingEvents();
}, 1000/loops_ps);

setInterval(function () {
  client.transmit(new snt.Event('hello', {a:1, b:2}));
}, 1250);
