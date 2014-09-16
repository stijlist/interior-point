var _ = require('underscore');
var solver = require('./ip.js');

var variable_table = {};

function assert(condition) {
  if(!condition) {
    throw new Error("Assertion failed for " + condition);
  }
}

var simplestLP = {
  coefficients: [1],
  rhs: [10],
  objective_fn: function(x) { return x; },
  dimension: 1
}

var simpleLinearProblem = {
  // the expression to be maximized
  cTranspose: [],
  objective_fn: function(s_vec, x_vec) {
    var accumulator = 0;
    var dimension = s_vec.length;
    for(var i = 0; i < dimension; i++) {
      accumulator += s_vec[i] * x_vec[i];
    }
    return accumulator;
  }
}


function testInteriorPoint() {
  assert(solver.solve(simplestLP) == [10]);
}

testInteriorPoint()

