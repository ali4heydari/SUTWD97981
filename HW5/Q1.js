
var Obj = {
    h(x, y) {
        return x + y;
    },

    slow(x, y) {
        console.log('called slow function with ' + x + ', ' + y);
        return x * y * this.h(x, y);
    }
};

function decorator(wrapped) {

    return function () {
        let cache = {};
        if (arguments in Object.keys(cache)) {
            console.log('Fetching from cache...');
            return cache[arguments];
        }
        else {
            console.log('Calculating result...');
            let result = wrapped.apply(this, arguments);
            cache[arguments] = result;
            return result;
        }

    }
}


Obj.slow(2, 3);
Obj.slow = decorator(Obj.slow);
Obj.slow(1, 4);
Obj.slow(1, 2);
Obj.slow(1, 4);
Obj.slow(1, 3);
Obj.slow(1, 2);
Obj.slow(1, 3);

