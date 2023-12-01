var fs = require('fs');

const progressiveDigitReplace = (input:string) => {
    for(let i = 3; i <= input.length + 1; i++){
        input = replaceSpelledOutDigits(input.substring(0, i)) + input.substring(i, input.length)
    }
    return input;
}

const replaceSpelledOutDigits = (input: string) => {
    return input
    .replace('one', '1ne')
    .replace('two', '2wo')
    .replace('three', '3hree')
    .replace('four', '4our')
    .replace('five', '5ive')
    .replace('six', '6ix')
    .replace('seven', '7even')
    .replace('eight', '8ight')
    .replace('nine', '9ine')
}

let accumulator = 0;

fs.readFile('day-1/input.txt', function (err, data) {
    if (err) throw err;
    var array = data.toString().split("\n");
    for (let i in array) {
        let line = ' ' + array[i] + ' ';
        console.log(line);
        line = progressiveDigitReplace(line);
        console.log(line);
        let numberOnly: string = line.replace(/\D/g, '');
        console.log(numberOnly)
        const firstNumber = numberOnly[0];
        const lastNumber = numberOnly.charAt(numberOnly.length - 1);
        const total = firstNumber+lastNumber;
        console.log(total);
        accumulator += parseInt(total);
    }

    console.log(accumulator)
});
