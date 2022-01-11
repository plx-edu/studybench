//////////////////////////////////////////////////////////////////
/////////////////////// UTILITIES ////////////////////////////////
//////////////////////////////////////////////////////////////////
let smbl = ":::::";
const print = (...arg) => {
    let toPrint = "";
    for (const k of arg) {
        toPrint += k;
        if (arg.indexOf(k) < (arg.length - 1)) toPrint += " ";
    }
    console.log(toPrint);
};
const br = () => { print("\n"); };
const tab = (n = Number = 0) => { return "\t".repeat(n); };


/////////////////////////////////////////////////
//////////////// LESSON ACCESS //////////////////
function showLesson(num) {
    switch (num) {
        case 1:
            callbackStudy();
            break;
        case 2:
            promiseStudy();
            break;
        case 3:
            asyncAwaitStudy();
            break;
        default:
            // callbackStudy();
            // br();
            print("##### Start of Studies #####");
            promiseStudy();
            br();
            callbackStudy();
            print("##### End studies #####");
            br();
            break;
    }
}
showLesson(3);

/////////////////////////////////////////////////
/////////// DISSECTION OF A CALLBACK ////////////
function callbackStudy() {
    const switchLight = turnOnOff;

    let isLightOn = false;
    let _t = tab();

    // A
    print(smbl + " Dissection of a callback " + smbl);
    print(`(A) Init - light value: OFF`);
    // B
    function toggle(_val) {
        print(`${_t}(B) toggle() called`);
        return _val ? false : true;
    }
    // C
    function turnOnOff(arg, callback) {
        print(`${_t}(C) turnOnOff() called`);
        isLightOn = callback(arg);
        return isLightOn ? "Light is ON" : "Light is OFF";
    };
    // D
    print(`${_t}(D) switchLight() called (x2)`);
    for (let i = 0; i < 2; i++) {
        _t = tab(1) + `(${i + 1})`;
        print(`${_t + tab(1) + (i + 1)})`, switchLight(isLightOn, toggle));
    }
    // E
    print(`(E) End of Lesson\n`);
    print(smbl + " Dissection of a callback " + smbl);

}// callbackStudy()

/////////////////////////////////////////////////
////////// DISSECTION OF A PROMISE //////////////
function promiseStudy() {
    let successful = true; // change here to modify outcome
    let countCalls = 0; // used to check number of calls in promise

    // A
    print(smbl + " Dissection of a promise " + smbl);
    print(`(A) Init - successful result = true`);

    // B
    // function passed to new Promise is called the executor
    // executor runs automatically and immediately on promise creation
    // --> Callbacks
    print(`(B) promise is created`);
    let promise = new Promise(myExecutor);
    // B-1
    print(`(B-1) promise.then() is called`);
    promise.then(
        result => print(tab(2) + `(B-1.1)` + result),
        error => print(tab(2) + `(B-1.1)` + error));


    // C
    // resolve and reject are provided vy
    function myExecutor(myResolve, myReject) {
        print(`(C) executor is called`);

        if (thisIsOver()) {
            myResolve(success());
        } else {
            myReject(failure());
        }
    }
    // C-1 - function when "resolve"
    function success() {
        print(tab(1) + `(C-1.${++countCalls}) resolve runs function passed to it`);
        return `(C-1.${++countCalls}) result of resolved`;
    }
    // C-2 - function when "reject"
    function failure() {
        print(tab(1) + `(C-2.${++countCalls}) rejected runs function passed to it`);
        return `(C-2.${++countCalls}) result of rejected`;
    }

    // D
    function thisIsOver() {
        print(`(D) job that has to finish for promise outcome`);
        return successful;
    }

    // E
    print(`(E) promise.then() is called again with chaining`);
    successful = false;
    promise.then(
        result => print(tab(1) + `(E-1)` + result),
        error => print(tab(1) + `(E-1)` + error))
        .then(() => print(tab(2) + `(E-2) chained .then() based on result`))
        .then(print(tab(3) + `(E-3) chained .then() NOT based on result`));


    // F
    print(`(F) promise.then() is called with success function as callback`);
    print(`   you'll see another (C-1) amongst the other results`);
    print(`   notice how it's not the (C-1.x) that the function returns`);
    promise.then(success);

    // G
    print(`(G) End of Lesson (or is it ?)`);
    print(smbl + " Dissection of a promise " + smbl);

}// promiseStudy()

/////////////////////////////////////////////////
///////// DISSECTION OF ASYNC/AWAIT /////////////
function asyncAwaitStudy() {
    let countCalls = 0;

    // A
    print(smbl + " Dissection of async/await " + smbl);
    print(`(A) Init`);


    // B
    // async functions always returns a promise.
    print(`(B) "outer" async function definition`);
    async function asyncParent() {
        // B-1
        print(tab(1) + `(B-${++countCalls}) "inner" is running`);

        // B-2
        print(tab(1) + `(B-${++countCalls}) "inner", defining a promise through the async syntax`);
        async function asyncChild() {
            print(tab(2) + `(B-${++countCalls}) "inner async" is running`);
            return `(B-${++countCalls}) SUCCESS (inner)`;
        }

        // B-3
        print(tab(1) + `(B-${++countCalls}) using await through variable affectation`);
        let result = await asyncChild();
        print(tab(1) + `(B-${++countCalls})` + result);

        // something "nice" happens when duplicated
        // uncomment next line to see (and copy as many times as you want)
        // print(tab(1) + `(B-${++countCalls})` + result);

        // B-7
        print(tab(1) + `(B-${++countCalls}) using await "directly" with a then`);
        print(tab(2) + `(B-${++countCalls})` + await asyncChild()
            .then(print(tab(3) + `(B-${++countCalls}).then ` + await asyncChild())));


        return `(B-${++countCalls}) SUCCESS`;
    }

    // C
    // print(`(C) calling async function with .then()`);
    // console.log(asyncParent().then(
    //     result => print(tab(1) + `(C-1) result: ` + result)));

    print(`(C) calling async function WITHOUT .then()`);
    console.log(asyncParent());
    print(`(D) ^^^ Promise object above is async function called at "C"`);



    // (E)
    print(`(E) End of Lesson (or is it ?)`);
    print(smbl + " Dissection of asyn/await " + smbl);

}// asyncAwaitStudy()















