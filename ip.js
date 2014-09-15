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
e = 1.1;
function ip(constraint_matrix) {
    var xs = newtons_method(constraint_matrix); // TODO: initialize xs somehow? 
    var m = constraint_matrix.length; // the dimension of the matrix
    
    while (m / t > e) {
        xs = newtons_method(xs, constraint_matrix);
        t *= convergence_speed;
    }

    return xs;
}

// constraint_matrix :: [[Int]]
// xs :: [Int]
// bounds :: [Int]
// In this particular implementation of Newton's method, I've hardcoded the 
// objective function and its derivative ahead of time to avoid doing 
// differentiation on each iteration. 
function newtons_method(xs, constraint_matrix) {
    // xs: The initial value
    var ct = transpose(constraint_matrix);
    var barrier = function (x, bound) {
        return -(Math.log(bound - x));
    }
    var objective = function (xs) {
        var n = xs.length;
        for (var i = 0; i < n; i++) { 
            for (var j = 0; j < n; j++) {
                var x = ct[i][j];
                // FIXME: this bounds lookup is wrong 
                t * x + barrier(x, bounds[i]); // elementwise objective fn; conceptually we're just doing a map
            }
        }
    }
    tolerance = 10^(-7);         // 7 digit accuracy is desired
    epsilon = 10^(-14); // Don't want to divide by a number smaller than this
    max_iterations = 20; // Don't allow the iterations to continue indefinitely
    found_solution = false; // Were we able to find the solution to the desired tolerance? not yet.

    o_prime = function(xs) {
        var n = xs.length;
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                var x = ct[i][j];
                // derivative of elementwise objective fn
                // TODO: check division by zero
                t + (1 / (bounds[i][j] - a));  
            }
        }
    }
    for (var i = 1; i < max_iterations; i++) {
        ys = objective(xs);
        ysprime = o_prime(xs);
     
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
