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

    var solve = require('ip.js');

    var c1 = {
        vars: ['box1.left', 'window.left'],
        coefficients: [1, -1],
        rhs: [0]
    };
    var c2 = {
        vars: ['box1.left', 'window.left'],
        coefficients: [1, 0],
        rhs: [0]
    }

    test("simple linear problem", solve([c1, c2]));
    
    console.log(testsPassed + " tests passed");
})();
