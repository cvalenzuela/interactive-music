import {
  C_SIZE
} from './constants';

class Triggers {
  constructor() {
    this.triggers = [];
  }

  getAll() {
    return this.triggers;
  }

  removeAll() {
    this.triggers = [];
  }

  add(trigger) {
    this.triggers.push(trigger);
  }
  
  remove(trigger) {
    const index = this.triggers.map(x => x.id).indexOf(trigger.id);
    this.triggers.splice(index, 1);
  }
}

export default Triggers;