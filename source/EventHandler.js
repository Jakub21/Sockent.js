
class EventHandler {
  constructor() {
    this.events = [];
    this.handlers = {};
    this.warnings = [];
  }
  handleNext() {
    var evt = this.events.shift();
    if (evt == undefined) return false;
    if (this.handlers[evt.id] == undefined) {
      if (!this.warnings.includes(evt.id)) {
        this.warnings.push(evt.id);
        console.warn(`Event "${evt.id}" has no handlers assigned`);
      }
      return true;
    }
    for (var handler of this.handlers[evt.id]) handler(evt);
    return true;
  }
  addHandler(id, callback) {
    if (this.handlers[id] == undefined) this.handlers[id] = [];
    this.handlers[id].push(callback);
  }
  push(evt) {
    this.events.push(evt);
  }
}
exports.EventHandler = EventHandler;
