var m = require('./matrix-math.js');
// linear problem schema
// var simplestLP = {
//  coefficients: [1],
//  rhs: [10],
//  objective_fn: function(x) { return x; },
//  dimension: 1
//}

// the paper: ["constraint solvers for user interface
// layout"](http://arxiv.org/pdf/1401.1031v1.pdf)
//
// a much better description of the interior point method:
// http://www2.isye.gatech.edu/~nemirovs/Published.pdf

// t is the initial value of the barrier parameter; set to some initial value > 1
t = 1.1;
// the convergence speed governs how quickly we force the function along the
// central path. set to some initial value > 1
convergence_speed = 1.1;
// this is the stopping parameter epsilon; set to some value 0 < x < 1
e = 0.01;

var barrier = function (xs) {}
var barrier_prime = function (xs) {}


// We'll need a method for translating from the user input to a constraint
// matrix
function ip(constraint_matrix, rhs, objective_fn, dimension) {
    var dimension = constraint_matrix.length;
    var xs;
    var objective_fn = function(xs) {
        return m.matrix_addition(
                m.scalar_multiply(t,
                    m.matrix_multiply(m.transpose(constraint_matrix)), xs),
                barrier(xs));
    }

    var objective_fn_prime = function(xs) {
        // TODO: double check this derivative
        m.matrix_addition(m.scalar_multiply(t, m.transpose(constraint_matrix)),
            barrier_prime(xs));
    }

    while (dimension / t > e) {
        xs = newtons_method(xs, constraint_matrix, objective_fn, objective_fn_prime);
        t *= convergence_speed;
    }

    return xs;
}

// constraint_matrix :: [[Int]]
// xs :: [Int]
// bounds :: [Int]
function newtons_method(xs, constraint_matrix,
                        objective_fn, objective_fn_prime) {
    // xs: The initial value
    tolerance = 10^(-7);         // 7 digit accuracy is desired
    epsilon = 10^(-14); // Don't want to divide by a number smaller than this
    max_iterations = 20; // Don't allow the iterations to continue indefinitely
    found_solution = false; // Were we able to find the solution to the desired tolerance? not yet.
    for (var i = 1; i < max_iterations; i++) {
        ys = objective_fn(xs);
        ysprime = objective_fn_prime(xs);

        if(abs(yprime) < epsilon) {
            // Don't want to divide by too small of a number
            console.log('WARNING: denominator is too small\n');
            break; // Leave the loop
        }
        xsprime = xs - ys/ysprime; // Do Newton's computation

        if(m.scalar_multiply(
                    (1 / average(abs(xs))),
                    average(abs(m.matrix_addition(xs, m.scalar_multiply(-1, xsprime)))))
                < tolerance) { // If the result is within the desired tolerance
            found_solution = true
            break; // Done, so leave the loop
        }

        xs = xsprime; // Update xs to start the process again

    }

    if (found_solution) {  // We found a solution within tolerance and maximum number of iterations
        console.log('The root is: %f\n', xs);
    } else { // If we weren't able to find a solution to within the desired tolerance
        console.log('Warning: Not able to find solution to within the desired tolerance of %f\n', tolerance);
        console.log('The last computed approximate root was %f\n', xs);
    }

    return xs;
}

// API for our solver
// solves the linear equation of the form Ax <= b
// returns a vector of floats representing the solution
module.exports.solve = function solve(linear_problem) {
  return ip(linear_problem.coefficients, linear_problem.rhs,
            linear_problem.objective_fn, linear_problem.dimension);
}
