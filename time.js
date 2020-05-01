
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
      console.log(input);
        let num = input.replace(/"/g, '');
      console.log(num);
     num = +num;
        let date = new Date(num);
      console.log(date);
        return JSON.stringify({
            "utc": date.toUTCString(),
            "unix": num
        });

    } else {
        return '"error": "Invalid Date"';
    }
  }

module.exports = isValid;