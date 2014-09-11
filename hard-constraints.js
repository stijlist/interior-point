
// solve hard constraints in code
//
// simplest solution: brute force search the solution space?
//
// imagine a simple constraint system
//
// constraint: we have two variables, and we need them to be equal
//
// x = y
// how would we want to program this? 
// the user of the constraint solver would simply want to declare: 
eq(x, y);
// and be done with it.

// what are other kinds of equality constraints that we'd want to declare?
// maybe something like:
eq(plus(x, 10), y);
// we can't simply do x + 10, because that will be evaluated immediately, and
// we need to be continuously evaluating any relationship that isn't a direct
// one to check that it's still satisfied. 
// can we do this with arbitrary functions? for example, could the `plus`
// function be user-defined? hmm. e.g:

function plus(a1, a2) {
    return function() { a1 + a2 };
}

// okay, we'd need to add anything we wanted to check to some stateful 
// collection of constraints that the program knows about
constraints = [];
constraints.push(eq(plus(x, 10), y));

// alright, let's write the eq function:
function eq(a1, a2) {
    return invoke_if_fn(var1) === invoke_if_fn(var2);
}

function invoke_if_fn(maybe_fn) {
    return (typeof maybe_fn === 'function' ? maybe_fn() : maybe_fn);
}

// how would we check this?
function check_constraints(constraint_list) {
    // my instincts are SCREAMING that this is not going to be efficient enough
    // it's fine, let's get something working
    return constraints_list.filter(function(constraint) { 
        return !constraint(); // filter for constraints that aren't satisfied
    }).length == 0;
} 

console.time("checking constraints: ")
check_constraints(constraints);
console.timeEnd("checking constraints: ")



