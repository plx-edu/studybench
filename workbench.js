//////////////////////////////////////////////////////////////////
/////////////////////// UTILITIES ////////////////////////////////
//////////////////////////////////////////////////////////////////
let smbl = ":::::";
const br = () => { console.log("\n"); };
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
            console.log("##### Start of Studies #####");
            promiseStudy();
            br();
            callbackStudy();
            br();
            asyncAwaitStudy();
            console.log("##### End studies #####");
            br();
            break;
    }
}
// showLesson(3);

/////////////////////////////////////////////////
/////////// DISSECTION OF A CALLBACK ////////////
function callbackStudy() {
    const switchLight = turnOnOff;

    let isLightOn = false;
    let _t = tab();

    // A
    console.log(smbl + " Dissection of a callback " + smbl);
    console.log(`(A) Init - light value: OFF`);
    // B
    function toggle(_val) {
        console.log(`${_t}(B) toggle() called`);
        return _val ? false : true;
    }
    // C
    function turnOnOff(arg, callback) {
        console.log(`${_t}(C) turnOnOff() called`);
        isLightOn = callback(arg);
        return isLightOn ? "Light is ON" : "Light is OFF";
    };
    // D
    console.log(`${_t}(D) switchLight() called (x2)`);
    for (let i = 0; i < 2; i++) {
        _t = tab(1) + `(${i + 1})`;
        console.log(`${_t + tab(1) + (i + 1)})`, switchLight(isLightOn, toggle));
    }
    // E
    console.log(`(E) End of Lesson\n`);
    console.log(smbl + " Dissection of a callback " + smbl);

}// callbackStudy()

/////////////////////////////////////////////////
////////// DISSECTION OF A PROMISE //////////////
function promiseStudy() {
    let successful = true; // change here to modify outcome
    let countCalls = 0; // used to check number of calls in promise

    // A
    console.log(smbl + " Dissection of a promise " + smbl);
    console.log(`(A) Init - successful result = true`);

    // B
    // function passed to new Promise is called the executor
    // executor runs automatically and immediately on promise creation
    // --> Callbacks
    console.log(`(B) promise is created`);
    let promise = new Promise(myExecutor);
    // B-1
    console.log(`(B-1) promise.then() is called`);
    promise.then(
        result => console.log(tab(2) + `(B-1.1)` + result),
        error => console.log(tab(2) + `(B-1.1)` + error));


    // C
    // resolve and reject are provided vy
    function myExecutor(myResolve, myReject) {
        console.log(`(C) executor is called`);

        if (thisIsOver()) {
            myResolve(success());
        } else {
            myReject(failure());
        }
    }
    // C-1 - function when "resolve"
    function success() {
        console.log(tab(1) + `(C-1.${++countCalls}) resolve runs function passed to it`);
        return `(C-1.${++countCalls}) result of resolved`;
    }
    // C-2 - function when "reject"
    function failure() {
        console.log(tab(1) + `(C-2.${++countCalls}) rejected runs function passed to it`);
        return `(C-2.${++countCalls}) result of rejected`;
    }

    // D
    function thisIsOver() {
        console.log(`(D) job that has to finish for promise outcome`);
        return successful;
    }

    // E
    console.log(`(E) promise.then() is called again with chaining`);
    successful = false;
    promise.then(
        result => console.log(tab(1) + `(E-1)` + result),
        error => console.log(tab(1) + `(E-1)` + error))
        .then(() => console.log(tab(2) + `(E-2) chained .then() based on result`))
        .then(console.log(tab(3) + `(E-3) chained .then() NOT based on result`));


    // F
    console.log(`(F) promise.then() is called with success function as callback`);
    console.log(`   you'll see another (C-1) amongst the other results`);
    console.log(`   notice how it's not the (C-1.x) that the function returns`);
    promise.then(success);

    // G
    console.log(`(G) End of Lesson (or is it ?)`);
    console.log(smbl + " Dissection of a promise " + smbl);

}// promiseStudy()

/////////////////////////////////////////////////
///////// DISSECTION OF ASYNC/AWAIT /////////////
function asyncAwaitStudy() {
    let countCalls = 0;

    // A
    console.log(smbl + " Dissection of async/await " + smbl);
    console.log(`(A) Init`);


    // B
    // async functions always returns a promise.
    console.log(`(B) "outer" async function definition`);
    async function asyncParent() {
        // B-1
        console.log(tab(1) + `(B-${++countCalls}) "inner" is running`);

        // B-2
        console.log(tab(1) + `(B-${++countCalls}) "inner", defining a promise through the async syntax`);
        async function asyncChild() {
            console.log(tab(2) + `(B-${++countCalls}) "inner async" is running`);
            return `(B-${++countCalls}) SUCCESS (inner)`;
        }

        // B-3
        console.log(tab(1) + `(B-${++countCalls}) using await through variable affectation`);
        let result = await asyncChild();
        console.log(tab(1) + `(B-${++countCalls})` + result);

        // something "nice" happens when duplicated
        // uncomment next line to see (and copy as many times as you want)
        // console.log(tab(1) + `(B-${++countCalls})` + result);

        // B-7
        console.log(tab(1) + `(B-${++countCalls}) using await "directly" with a then`);
        console.log(tab(2) + `(B-${++countCalls})` + await asyncChild()
            .then(console.log(tab(3) + `(B-${++countCalls}).then ` + await asyncChild())));


        return `(B-${++countCalls}) SUCCESS`;
    }

    // C
    // console.log(`(C) calling async function with .then()`);
    // console.log(asyncParent().then(
    //     result => console.log(tab(1) + `(C-1) result: ` + result)));

    console.log(`(C) calling async function WITHOUT .then()`);
    console.log(asyncParent());
    console.log(`(D) ^^^ Promise object above is async function called at "C"`);



    // (E)
    console.log(`(E) End of Lesson (or is it ?)`);
    console.log(smbl + " Dissection of async/await " + smbl);

}// asyncAwaitStudy()


/////////////////////////////////////////////////
/////////////// TEMPORARY TESTING  //////////////

function tempTest() {

    const getMainTag = () => { return document.getElementsByTagName("main"); };
    const numberOfPlayers = 4;
    const listOfPlayers = createPlayers(numberOfPlayers);
    const playerActions = {};
    let callCount = 0;


    for (const k of listOfPlayers) {
        let bttn = document.createElement("button");
        bttn.style.padding = "5px";
        bttn.id = k;
        bttn.classList.add("pBttn");
        bttn.innerText = k;
        bttn.addEventListener("click", hasClicked);
        // bttn.addEventListener("click", allHavePlayed);
        bttn.addEventListener("click", bttnAwait);

        getMainTag()[0].append(bttn);
    }

    function hasClicked(e) {
        const targ = e.target.id;
        callCount = 0;

        if (playerActions.hasOwnProperty(targ)) return;

        playerActions[targ] = true;
    }
    console.log(playerActions);

    async function allHavePlayed() {

        console.log(tab(1) + `${++callCount}: Start of allHavePlayed()`);
        async function confirmAllPlayed(obj) {
            console.log(tab(2) + `${++callCount}: Start of confirmAllPlayed()`);
            let n = 0;

            for (const k in obj) {
                n = obj[k] ? ++n : n;
                document.getElementById(k).disabled = true;
                // console.log("::", n);
            }


            return (n === numberOfPlayers) ? true : false;
            //if (n === numberOfPlayers)
            // return "CONFIRMED";
        }

        console.log(tab(1) + `${++callCount}: Await of confirmAllPlayed()`);
        // await confirmAllPlayed(playerActions).then();
        let result = await confirmAllPlayed(playerActions);
        console.log(`${++callCount}: Consuming(?) await confirmAllPlayed(): ` + result);

        return await confirmAllPlayed(playerActions).then(
            result => isMonsterTurn(result));
    }

    // console.log(`${++callCount}: Call of confirmAllPlayed()`);
    console.log(`A: Call of confirmAllPlayed()`);
    console.log("::: " + allHavePlayed()
        .then(
            result => console.log("::: " + result + " SUCCESS !")),
        error => new Error);

    function bttnAwait() {
        allHavePlayed().then(
            result => console.log("#:#:# ", result));
    }

    function isMonsterTurn(val) {
        if (val) {
            console.log("Monster is attacking!");
            for (const k of listOfPlayers) {
                document.getElementById(k).disabled = false;
            }
        }
    }



}// tempTest() {


tempTest();
doSomething();

function doSomething() { console.log("Doing Something"); }

function createPlayers(n = Number = 0) {
    let p = []; //["P1", "P2", "P3"]
    for (let i = 0; i < n; i++) p.push("P" + (i + 1));
    return p;
}

// Leads to study ?
// - new MutationObserver











