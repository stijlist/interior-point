// a level of indirection
// aiming to be able to swap out matrix libraries if possible

sylvester = require('sylvester');

module.exports.create = function(a) {
  return $M(a);
}
module.exports.vector = function(v) {
  return $V(v);
}
module.exports.transpose = function (a) {
  return a.transpose();
}
module.exports.matrix_multiply = function (lhs, rhs) {
  return lhs.multiply(rhs);
}
module.exports.scalar_multiply = function (a, rhs) {
  return rhs.multiply(a);
}
module.exports.matrix_addition = function (lhs, rhs) {
  return lhs.add(rhs);
}
module.exports.inverse = function (a) {
  return a.inverse();
}
module.exports.average = function (matrix) {
  var len = matrix.elements.length;
  var sum = 0;
  var rows = matrix.rows();
  var cols = matrix.cols();
  var count = rows * cols;
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      sum += matrix.e(i, j);
    }
  }
  return (sum / count);
}
module.exports.abs = function (matrix) { return matrix.map(Math.abs) }
