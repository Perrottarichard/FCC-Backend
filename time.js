
const isValid = (input) => {
  let now = new Date();
  console.log(now.getTime())
    let regexD = /[\d]{4}-[\d]{2}-[\d]{2}/g;
    let regexM = /[\d]{1,16}/g;
    if (input.match(regexD)) {
        let date = new Date(input);
        return ({
          unix: date.getTime(),
          utc: date.toUTCString()
        });
    } else if (input.length <= 16 && input.match(regexM)) {

     let num = +input;
        let date = new Date(num);
      console.log(date);
        return ({
          unix: num,
          utc: date.toUTCString()
        });

    } else {
        return {error: 'Invalid Date'};
    }
  }

module.exports = isValid;