const http = require('http');
const Socket = require('socket.io');
const {EventHandler} = require('./EventHandler.js');
const {Event} = require('./Event.js');

class Server {
  constructor(address, port) {
    this.name = 'SocketServer';
    this.http = http.createServer().listen(port);
    this.io = new Socket(this.http);
    this.handler = new EventHandler();
    this.bindSocketEvents();
  }
  bindSocketEvents() {
    this.io.on('connection', (socket) => {
      var socketData = {socket};
      this.push(new Event('connect', {}, socket));
      socket.on('event', (evt) => {
        this.push(new Event(evt.id, evt.data, socket));
      });
      socket.on('disconnect', (evt) => {
        this.push(new Event('close', {}, socket));
      });
      socket.on('pong', (evt) => {
        this.push(new Event('pong', {}, socket));
      });
      socket.on('ping', (evt) => {
        socket.transmit(new Event('pong', {}, socket));
      });
    });
  }
  on(key, callback) {
    this.handler.addHandler(key, callback);
  }
  push(evt) {
    this.handler.push(evt);
  }
  transmit(evt) {
    evt.socket.emit('event', evt.getClean());
  }

  handlePendingEvents() {
    while (this.handler.handleNext()) { continue; }
  }
}
exports.Server = Server;
