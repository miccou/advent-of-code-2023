var fs = require('fs');

let accumulator = 0;

fs.readFile('day-1/input.txt', function (err, data) {
    if (err) throw err;
    var array = data.toString().split("\n");
    for (let i in array) {
        const line = array[i];
        console.log(line);
        let numberOnly: string = line.replace(/\D/g, '');
        console.log(numberOnly)
        const firstNumber = numberOnly[0];
        const lastNumber = numberOnly.charAt(numberOnly.length - 1);
        const total = firstNumber+lastNumber;
        console.log(firstNumber);
        console.log(lastNumber);
        accumulator += parseInt(total);
    }

    console.log(accumulator)
});
