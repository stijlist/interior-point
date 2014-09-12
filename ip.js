// the paper: ["constraint solvers for user interface
// layout"](http://arxiv.org/pdf/1401.1031v1.pdf)
// 

t = 1.1; // some initial value
convergence_parameter = 1.1; // some initial value
function solve(constraint_matrix) {
    var xs = newtons_method(constraint_matrix);
    var m = constraint_matrix.length; // the dimension of the matrix
    var objective_fn = function (xs) {
        return matrix_addition(scale(t, transpose(constraint_matrix)),
                               barrier(xs));
    }
    while (m / t > e) {
        xs = newtons_method(objective_fn, xs);
        t *= convergence_parameter;
    }

    return xs;
}
function newtons_method(fn, xs) {
    // xs: The initial value
    // fn: The function whose root we are trying to find
    tolerance = 10^(-7)         %7 digit accuracy is desired
    epsilon = 10^(-14) // Don't want to divide by a number smaller than this
    max_iterations = 20 // Don't allow the iterations to continue indefinitely
    found_solution = false // Were we able to find the solution to the desired tolerance? not yet.

    fprime = compute_derivative(fn); // we need to look at the symbolic 
                                     // representation of this function
                                     // sweet.js? hardcode the form of
                                     // the objective function? the only 
                                     // thing that changes is the 
                                     // constraint matrix
     
     
    for (var i = 1; i < max_iterations; i++) {
        ys = fn(xs);
        ysprime = fprime(x0);
     
        if(abs(yprime) < epsilon) {
            // Don't want to divide by too small of a number
            console.log('WARNING: denominator is too small\n');
            break; // Leave the loop
        } 
        xsprime = xs - ys/ysprime; // Do Newton's computation
     
        if(abs(x1 - x0)/abs(x1) < tolerance) { // If the result is within the desired tolerance
            found_solution = true
            break; // Done, so leave the loop
        }
     
        xs = xsprime; // Update x0 to start the process again                  
     
    }
     
    if (found_solution) {  // We found a solution within tolerance and maximum number of iterations
        console.log('The root is: %f\n', xs);
    } else { // If we weren't able to find a solution to within the desired tolerance
        console.log('Warning: Not able to find solution to within the desired tolerance of %f\n', tolerance);
        console.log('The last computed approximate root was %f\n', x1);
    }

    return xs;
}
