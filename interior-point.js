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

function run_tests() {
  assert(solver.solve(simplestLP) == [10]);
}

run_tests();

