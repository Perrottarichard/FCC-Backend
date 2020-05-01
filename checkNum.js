
const isValid = (input) => {
    let regexD = /[\d]{4}-[\d]{2}-[\d]{2}/g;
    let regexM = /[\d]{1,16}/g;
    if (input.match(regexD)) {
        let date = new Date(input);
        return JSON.stringify({
            "utc": date.toUTCString(),
            "unix": date.getTime()
        });
    } else if (input.length <= 16 && input.match(regexM)) {
        input = +input;
        let date = new Date(input);
        return JSON.stringify({
            "utc": date.toUTCString(),
            "unix": input
        });

    } else {
        return '"error": "Invalid Date"';
    }
}

const checkTime = (input) => {
    return "The input was: " + input;
}


console.log(isValid('1987-02-06'));
console.log(isValid('539568000000'))
console.log(isValid('12233334444465465656565656'))
console.log(isValid('absdcdkdkdk'))