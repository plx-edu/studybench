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
    }
}
showLesson(2);

/////////////////////////////////////////////////
/////////// DISSECTION OF A CALLBACK ////////////
function callbackStudy() {
    const argCB = "arg of callback";
    const switchLight = turnOnOff;

    let isLightOn = false;
    let tab = "";

    // A
    print(smbl + " Dissection of a callback " + smbl);
    print(`${tab}(A) Init light value: OFF`);
    // B
    function toggle(_val) {
        print(`${tab}(B) toggle() called`);
        return _val ? false : true;
    }
    // C
    function turnOnOff(arg, callback) {
        print(`${tab}(C) turnOnOff() called`);
        isLightOn = callback(arg);
        return isLightOn ? "Light is ON" : "Light is OFF";
    };
    // D
    print(`${tab}(D) switchLight() called (x2)`);
    for (let i = 0; i < 2; i++) {
        tab = `\t(${i + 1})`;
        print(`${tab}\t${i + 1})`, switchLight(isLightOn, toggle));
    }
    // E
    print(`(E) End of Lesson\n`);
    print(smbl + " Dissection of a callback " + smbl);
}

/////////////////////////////////////////////////
/////////// DISSECTION OF PROMISE ///////////////
function promiseStudy() {
    let tab = "";

    // A
    print(smbl + " Dissection of a promise " + smbl);
    print(`${tab}(A) Init`);

    // B
    // How it's written normally
    // -> Directly calls the function given as argument
    // 
    let promise = new Promise(function (successCallback, failureCallback) { });
    let promise = new Promise(function (successCallback, failureCallback) { });

    function executor() {

    }

    function successCallback() {
        return "Success !";
    }

    function failureCallback() {
        return "Failure !";
    }

    promise.then();


    // Z
    print(`(Z) End of Lesson`);
    print(smbl + " Dissection of a promise " + smbl);
}

















