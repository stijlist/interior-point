var _ = require('underscore');
// translate constraints into a linear_constraints of equations
// method:
// given equality constraints with a symbol on the lhs and rhs,
// translate into lhs + rhs = 0

// we have domain knowledge about these constraints, though:
// they're attached to views in the linear_constraints. we're using the CSS
// box model to position them.
// all views will have a width, height, left, and top
// we need to map the views to four constraints in the vector of
// constraint_names `xs`

// ok, we don't have to group associated constraints together, so
// we can afford a simpler structure: a hash-map of constraint names
// to indices in the vector

var constraint_to_index_table = {};
var linear_constraints = { // modeling the linear_constraints
  A: [[]],
  x: [],
  b: []
}

// given a new equality constraint on the linear_constraints
//
//     eq('box1.left', 'window.left');
//
// when I query the state of the constraint_to_index_map, I should see
// values assoc'd with the keys box1.left and window.left
//
//     constraint_to_index_map['box1.left'] === 0
//       && constraint_to_index_map['window.left'] === 1;
//
// and I should see the vector [1, 1] as the first row of linear_constraints.A,
// two placeholder values (null? probably not) in linear_constraints.x, and one 0 in
// the vector b (like `[0]`)

// note: maybe we don't even need the vector for x in our linear_constraints yet: we
// won't use it until we're actually trying to solve the linear_constraints

// okay, what if we want to express some polynomial with multiple
// coefficients?
// maybe we could take an array of things: maybe we want the user's
// data to be as descriptive as possible.

// why don't we just have the user specify this with data?
// maybe something like this:
// var c1 = {
//   rel: 'eq',
//   lhs: [{variable: 'box1.left', coeff: 1}],
//   rhs: [{variable: 'window.left', coeff: 1}]
// }
// var c2 = {
//   rel: 'eq',
//   lhs: [{constant: 400, coeff: 1}],
//   rhs: [{variable: 'box2.left'}]
// }
// we just have a list of all the constraint_names and their coefficients
// if we want to add a constant, we can easily do so on either side
// my constraint->linear_constraints translator can easily flip lhs->rhs while
// negating coefficients, or add or subtract constants
function negate(var_or_constant) {
  var_or_constant.coeff *= -1;
  return var_or_constant;
}
// conceptually, this function just adds constraint_names to the 'x' vector in our linear_constraints state
function add_to_linear_constraints(constraint_names) {
  linear_constraints.x.concat(constraint_names);
}

// readability thrown out the window for the moment
// this is some weird clojure - javascript pidgin.. functional composition and mutable state
function constraint_to_vector_eqn(constraint) {
  var lhs_constants_and_vars = _.groupBy(constraint.lhs, function(c) { return c.hasOwnProperty('constant'); });
  var rhs_constants_and_vars = _.groupBy(constraint.rhs, function(c) { return c.hasOwnProperty('constant'); });
  // take all the constants out of the left hand side, negate them, and put them on the right hand side
  // rhs_constants_and_vars[true] is all the constants, and rhs_constants_and_vars[false] is all the constraint_names
  // (same for lhs)
  var new_rhs = rhs_constants_and_vars[true].concat(_.map(lhs_constants_and_vars[true], negate));
  // take all the vars out of the right hand side, negate them, and put them on the left hand side
  var new_lhs = lhs_constants_and_vars[false].concat(_.map(rhs_constants_and_vars[false], negate));
  // now add any constraint_names that aren't yet in the variable table to the variable table
  add_to_linear_constraints(_.reject(new_lhs, function(variable) {
    return constraint_to_index_table.hasOwnProperty(variable);
  }));
  // condense all constants on the right hand side into one value
  linear_constraints.b = [_.reduce(new_rhs, function (acc, constant) { return acc + constant.constant * constant.coeff }, 0)];
}

module.exports.load_constraints = constraint_to_vector_eqn;
