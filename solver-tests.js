;(function() {
    var testsPassed = 0;
    function test(description, expression, expectation) {
        if (!(expression === expectation)) {
            console.log("Test failed: " + description + ". Expected " + expectation + " but got " + expression + ".");
        } else {
            console.log("Test passed: " + description);
            testsPassed = testsPassed + 1;
        }
    }

    test("sanity check", true, true);

    var solve = require('./ip.js');

    // trivial linear problem: expected answer is [0, 0]
    var linear_problem = {
        dimension: 2,
        vars: ['box1.left', 'window.left'],
        eq_constraints: {
            coefficients: [[1, -1],
                           [1,  0]],
            weights: [1, 1],
            rhs: [0, 0]
        },
        ineq_constraints: {
            coefficients: [[1, 1],
                           [1, 0]],
            rhs: [5, 3]
        }
    }

    test("simple linear problem", solve(linear_problem), [0, 0]);
    // console.log(solve(linear_problem));

    // var linear_problem_2 = {
    //     dimension: 2,
    //     vars: ['box1.left', 'window.left'],
    //     eq_constraints: {
    //         coefficients: [[1, -1, 0],
    //                        [1,  0, 0],
    //                        [0,  0, 1]],
    //         weights: [1, 1, 0.5],
    //         rhs: [0, 0, 10]
    //     },
    //     ineq_constraints: {
    //         coefficients: [[1, 1,  0],
    //                        [1, 0,  0],
    //                        [1, 0, -1]],
    //         rhs: [5, 3, 0]
    //     }
    // }

    // test("slightly more complex linear problem", solve(linear_problem_2));
    
    console.log(testsPassed + " test(s) passed");
})();
