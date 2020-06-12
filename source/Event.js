
class Event {
  constructor(id, data, socket=null) {
    this.id = id;
    this.data = data;
    this.time = Date.now();
    this.socket = socket; // only used in server
  }
  getClean() {
    var clone = Object.assign({}, this);
    delete clone.socket;
    return clone;
  }
}
exports.Event = Event;
