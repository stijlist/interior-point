var m = require('./matrix-math.js');

// the paper: ["constraint solvers for user interface
// layout"](http://arxiv.org/pdf/1401.1031v1.pdf)
//
// a much better description of the interior point method:
// http://www2.isye.gatech.edu/~nemirovs/Published.pdf

var t = 0.1;
var e = 0.01;
var mu = 0.9;
var convergence_speed = 1.1;

function zeros(num) {
    var result = new Array(num);
    for(var i = 0; i < num; i++) {
        result[i] = 0;
    }
    return result;
}

function ip(linear_problem) {
    // wow this parameter passing is superfluous; should just pass around the
    // lp instead
    var dimension = linear_problem.dimension;
    var eq_matrix = m.create(linear_problem.eq_constraints.coefficients);
    var ineq_matrix = m.create(linear_problem.ineq_constraints.coefficients);
    var weights = linear_problem.weights;
    var eq_rhs = linear_problem.eq_constraints.rhs;
    var ineq_rhs = linear_problem.ineq_constraints.rhs;
    
    // TODO: look at inequality constraints to do this initialization
    var xs = m.vector(zeros(5));

    while (dimension / t > e) {
        xs = interior_newtons(mu, xs, weights,
                              eq_matrix, eq_rhs,
                              ineq_matrix, ineq_rhs);
        t *= convergence_speed;
    }

    return xs;
}

// the hessian of the objective function results in a vector
function objective_jacobian(xs, weights, eq_matrix, eq_rhs, 
                            ineq_matrix, ineq_rhs, mu) {
    var num_cols = eq_matrix.cols();
    var second_term_row_summation_acc = m.create(zeros(num_cols));

    for (var i = 1; i <= num_rows; i++) {
        second_term_row_summation_denominator = ineq_matrix.row(i).multiply(xs)
        second_term_row_summation_acc = 
            second_term_row_summation_acc.add(
                    ineq_matrix.row(i).map(function (element) { 
                        return element / second_term_row_summation_denominator 
                    }));
    }
    weights.transpose().multiply(eq_matrix) + second_term_row_summation_acc;
}

// the hessian of the objective function results in a scalar
function objective_hessian(xs, ineq_matrix, ineq_rhs, mu) {

    var num_rows = ineq_matrix.rows();
    var summation_over_rows = 0;

    for (var i = 1; i <= num_rows; i++) {
        // TODO: naming
        var numerator = 
            ineq_matrix.row(i).transpose().multiply(ineq_matrix.row(i));
        var denominator = Math.pow(ineq_rhs[i] - ineq_matrix.row(i).multiply(xs), 2);
        summation_over_rows += numerator / denominator;
    }
    return -1 * mu * summation_over_rows;
}

function interior_newtons(mu, xs, weights, 
                          eq_matrix, eq_rhs,
                          ineq_matrix, ineq_rhs) {

    
    var xs_delta = objective_hessian(xs, ineq_matrix, ineq_rhs, mu);
        
    return m.matrix_subtraction(xs, xs_delta);
}

var solve = function (linear_problem) {
  return ip(linear_problem);
}

// API for our solver
// solves the linear equation of the form Ax <= b
// returns a vector of floats representing the solution
module.exports = solve;
