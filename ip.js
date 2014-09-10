// the paper: ["constraint solvers for user interface
// layout"](http://arxiv.org/pdf/1401.1031v1.pdf)
// 
// quadratic programming is a problem that can be formulated as: 
// minimize q(x_bar) 
//     where q(x_bar) = (1/2) * x_bar_transpose * Q * x_bar - g_transpose * x_bar
//     where Q is a positively semi-definite Hessian matrix (nxn) and
//     x_transpose is the vector transpose of x
//
//     C is a matrix of inequality constraints
//     A is a matrix of equality constraints

// I'm trying to get a sense of the tradeoffs of the interior point method,
// presented in the paper, vs. the simplex method the Cassowary algorithm uses
function solve(constraintTable, changedConstraints) {
    // for example, let's assume the constraint table is
    // { 
    //   item.left:   { equal: window.left }
    //   item.top:    { equal: window.top }
    //   item.width:  { equal: 40 }
    //   item.height: { equal: 40 }
    //   other.left:  { greaterThan: item.left }
    //   other.right: { lessThan: window.right }
    //   other.width: { equal: 100 }
    // }

    var objective_function = function () {
        // TODO
    }
    // necessary variables: 
    var A, // matrix of coefficients that will express our equality constraints
        u, // barrier parameter, used to tune the speed of convergence
        e, // error parameter; determines the threshold of convergence
        f_naught, // the name of our objective function
        phi, // the name of our barrier function
        t, // what we're updating; the input to the barrier function
        Q, // the Hessian matrix of second derivatives with respect to each Xi
        g, // the gradient matrix of first partial derivatives? not labeled
        m; // slope? not labeled

    f_naught = function (x_bar) {
        (1/2) * transpose(x_bar) * hessian(objective_function) * x_bar - transpose(g) * x_bar
    }
    // first step: 
    //   select barrier parameter > 1, epsilon parameter > 0
    //   the paper says "select strictly feasible x that violates at least one
    //   constraint"
    //   Q: how is 'feasibility' different from 'being within constraints'?
    //   according to wikipedia, a "feasible region is the set of all possible
    //   values that satisfy a given problem's constraints"
    //   ...
    //   okay, that's confusing, but let's press on with some more pseudocode.
    //
    //   repeat:
    //      compute x_naught(t) by minimizing t * f_naught + phi subject to Ax
    //      = b, starting at x
    //      x := x_naught(t)
    //      if m / t < e:
    //        return x
    //      else:
    //        t *= u
    //
    //  Q: is t a parameter to both the left and right terms? otherwise, 
    //  wouldn't we just minimize `t * f_naught`, and because t doesn't vary, 
    //  doesn't that just reduce to minimizing `f_naught`? 
    //
    //  A: looked it up. the argument to barrier functions is often called `t`,
    //  apparently, and t is fixed between loop iterations. if I understand
    //  correctly, we're allowed to vary the x parameter to minimize `t
    //  * f_naught + phi`, and the final value we get after minimization is the
    //  return value that we set x to before the next iteration
    //
    //  Q: by what procedure are we minimizing `t * f_naught + phi`?
    //  the inner loop might be a fairly standard algorithm for iteratively 
    //  minimizing the value of some function starting from a known initial 
    //  value. the paper itself doesn't give us any hints. well-known linear 
    //  algebra algorithms... gauss-jordan elimination? least-squares? gradient 
    //  descent of some kind?
    //
    //  according to the paper, we should have the Hessian (matrix of second 
    //  derivatives of each x_sub_i with respect to that i) Q and the gradient
    //  matrix (i think, as it's not actually explicitly labeled as such) g. 
    //  maybe those play a factor in the minimization algorithm. 
}
