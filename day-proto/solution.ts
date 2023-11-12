var fs = require('fs');
fs.readFile('day-proto/input.txt', function (err, data) {
    if (err) throw err;
    var array = data.toString().split("\n");
    for (let i in array) {
        console.log(array[i]);
    }
});
