class LineManager{
  constructor() {
    this.lines = [];
  }

  getLines() {
    return this.lines;
  }

  setNewLine(line) {
    this.lines.push(line);
  }
  
  removeLine(id) {

  }
}

export default LineManager;