;(function() {
    var testsPassed = 0;
    function test(description, expression) {
        if (!expression) {
            console.log("Test failed: " + description);
        } else {
            console.log("Test passed: " + description);
            testsPassed = testsPassed + 1;
        }
    }

    test("sanity check", true);

    var solve = require('./ip.js');

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

    test("simple linear problem", solve(linear_problem));
    
    console.log(testsPassed + " test(s) passed");
})();
