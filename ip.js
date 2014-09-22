var m = require('./matrix-math.js');

// the paper: ["constraint solvers for user interface
// layout"](http://arxiv.org/pdf/1401.1031v1.pdf)
//
// a much better description of the interior point method:
// http://www2.isye.gatech.edu/~nemirovs/Published.pdf

function ip(constraint_matrix, rhs, objective_fn, dimension) {
    var dimension = constraint_matrix.length;
    constraint_matrix = m.create(constraint_matrix);
    var xs = m.vector([0]); // TODO: initialize xs sensibly
    var objective_fn, objective_fn_prime;

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

        if(m.abs(ysprime) < epsilon) {
            // Don't want to divide by too small of a number
            console.log('WARNING: denominator is too small\n');
            break; // Leave the loop
        }
        xsprime = m.subtract(xs, m.matrix_multiply(m.inverse(ysprime), ys)); // Do Newton's computation
        // newton's for a function cTx is the inverse jacobian times cT

        if(m.scalar_multiply(
                    (1 / m.average(m.abs(xs))),
                    m.average(m.abs(m.matrix_addition(xs, m.scalar_multiply(-1, xsprime)))))
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
module.exports = function solve(linear_problem) {
    return [0, 0];
  // return ip(linear_problem.coefficients, linear_problem.rhs,
  //           linear_problem.objective_fn, linear_problem.dimension);
}
