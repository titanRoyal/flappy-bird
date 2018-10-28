matrix.prototype.copy = function() {
  let m = new matrix(this.row, this.col);
  for (var i = 0; i < this.row; i++) {
    for (var j = 0; j < this.col; j++) {
      m.matrox[i][j] = this.matrox[i][j];
    }
  }
  return m;
}
matrix.prototype.add = function(n) {
  if (n instanceof matrix) {
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        this.matrox[i][j] += n.matrox[i][j];
      }
    }
  } else {
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        this.matrox[i][j] += n;
      }
    }
  }
}
matrix.prototype.mult = function(n) {
  if (n instanceof matrix) {
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        this.matrox[i][j] *= n.matrox[i][j];
      }
    }
  } else {
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        this.matrox[i][j] *= n;
      }
    }
  }
}
matrix.prototype.print = function() {
  console.table(this.matrox);
}
matrix.prototype.randomize = function() {
  for (let i = 0; i < this.row; i++) {
    for (let j = 0; j < this.col; j++) {
      this.matrox[i][j] = Math.random() * 2 - 1;
    }
  }

}
matrix.prototype.transpose = function() {
  let r = new matrix(this.col, this.row)
  for (let i = 0; i < this.row; i++) {
    for (let j = 0; j < this.col; j++) {
      r.matrox[j][i] = this.matrox[i][j];
    }
  }
  this.matrox = r.matrox;
}
matrix.prototype.map = function(func) {
  for (let i = 0; i < this.row; i++) {
    for (let j = 0; j < this.col; j++) {
      this.matrox[i][j] = func(this.matrox[i][j]);
    }
  }
}
