/** @format */

const cvs = document.querySelector("canvas");
const ctx = cvs.getContext("2d");
grid = [];
const cols = 30;
const rows = 30;
cvs.height = 700;
cvs.width = 700;
const size = cvs.width / cols;
let current;
class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    // left, right, top, bottom
    this.walls = [true, true, true, true];
    this.color = "#262626";
    this.visited = false;
    this.size = size;
  }
  show() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size);
    ctx.strokeStyle = "white";
    ctx.beginPath();
    if (this.walls[0]) {
      ctx.moveTo(this.x * this.size, this.y * this.size);
      ctx.lineTo(this.x * this.size, (this.y + 1) * this.size);
    }
    if (this.walls[1]) {
      ctx.moveTo((this.x + 1) * this.size, this.y * this.size);
      ctx.lineTo((this.x + 1) * this.size, (this.y + 1) * this.size);
    }
    if (this.walls[2]) {
      ctx.moveTo(this.x * this.size, this.y * this.size);
      ctx.lineTo((this.x + 1) * this.size, this.y * this.size);
    }
    if (this.walls[3]) {
      ctx.moveTo(this.x * this.size, (this.y + 1) * this.size);
      ctx.lineTo((this.x + 1) * this.size, (this.y + 1) * this.size);
    }
    ctx.stroke();
  }
  set Color(color) {
    this.color = color;
    this.show(this.size);
  }
  findNeighbor(rows, cols) {
    const x = this.x;
    const y = this.y;
    const cells = [];
    // Up Cell
    if (y > 0) {
      let cell = grid[y - 1][x];
      if (!cell.visited) cells.push(cell);
    }
    // left cell
    if (x > 0) {
      let cell = grid[y][x - 1];
      if (!cell.visited) cells.push(cell);
    }
    // right cell
    if (x < rows - 1) {
      let cell = grid[y][x + 1];
      if (!cell.visited) cells.push(cell);
    }
    // down cell
    if (y < cols - 1) {
      let cell = grid[y + 1][x];
      if (!cell.visited) cells.push(cell);
    }
    return cells[Math.floor(Math.random() * cells.length)];
  }
}
function createGrid(grid) {
  for (let y = 0; y < cols; y++) {
    grid[y] = [];
    for (let x = 0; x < rows; x++) {
      grid[y][x] = new Cell(x, y);
      grid[y][x].show(size);
    }
  }
}
function removeWalls(a, b) {
  let x = a.x - b.x;
  if (x === -1) {
    a.walls[1] = false;
    b.walls[0] = false;
  }
  if (x === 1) {
    a.walls[0] = false;
    b.walls[1] = false;
  }
  let y = a.y - b.y;
  if (y === -1) {
    a.walls[3] = false;
    b.walls[2] = false;
  }
  if (y === 1) {
    a.walls[2] = false;
    b.walls[3] = false;
  }
  a.show(size);
  b.show(size);
}
createGrid(grid);
current = grid[0][0];
let stack = [];
function draw() {
  current.Color = "rgba(0, 0, 0, 1)";

  let next = current.findNeighbor(rows, cols);
  if (next) {
    next.visited = true;

    removeWalls(current, next);

    stack.push(next);

    current = next;
    current.Color = "rgba(0, 0, 0, 1)";
  } else if (stack.length > 0) {
    current = stack.pop();
  }

  requestAnimationFrame(draw);
}
draw();
