// constraints are expressed in the form Ax = b
// when we add a constraint, we want to add it to the equation that describes
// the relationship between two variables
// for example, if we have the variables box1.left and box2.right, and we want
// box1.left to equal box2.right
// we're trying to enforce the equation box1.left - box2.right = 0 
// which can be added to a system of linear equations
// what we're really after is if we can solve equations with 500+ constraints
// in sub-millisecond time
console.time("checking constraints: ")
check_constraints(constraints);
console.timeEnd("checking constraints: ")

// so we need: a method of keeping track of how many constraints we're working
// with. the matrix of constraints is nxn where n = number of variables
// we have, and will grow until we're done adding constraints
//
// each constraint needs to be translated into an equation
// is the mapping of constraints to equations 1-to-1? 
//
// constraints: a set of mappings from names to indices in the matrix & matrix
// of coefficients that describe the relationships between names
//
// what do we do? maybe each constraint we get in 'add-constraint' will set all 
// the variables it concerns to initial values that satisfy the constraint
//
//
add_constraint('equal', box1.left, box2.right)
