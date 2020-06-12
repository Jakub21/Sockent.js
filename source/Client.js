const io = require('socket.io-client');
const {EventHandler} = require('./EventHandler.js');
const {Event} = require('./Event.js');

class Client {
  constructor(address, port) {
    this.name = 'SocketClient';
    this.handler = new EventHandler();
    this.io = io(`${address}:${port}`);
  }
  connect() {
    this.io.on('connect', () => {this.push(new Event('connect', {}));});
    this.io.on('event', (evt) => {this.push(new Event(evt.id, evt.data));});
    this.io.on('disconnect', () => {this.push(new Event('close', {}));});
    this.io.on('pong', (evt) => {this.push(new Event('pong', {}));});
    this.io.on('ping', (evt) => {this.io.emit('pong');});
  }
  on(key, callback) {
    this.handler.addHandler(key, callback);
  }
  push(evt) {
    this.handler.push(evt);
  }
  transmit(evt) {
    if (!this.io.connected) throw new TypeError('Socket is not connect');
    this.io.emit('event', evt);
  }

  handlePendingEvents() {
    while (this.handler.handleNext()) { continue; }
  }
}
exports.Client = Client;
