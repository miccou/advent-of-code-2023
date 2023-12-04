var fs = require('fs');

function calculateScore(matches: number) {
    return Math.trunc(Math.pow(2, matches - 1))
}

fs.readFile('day-4/input.txt', function (err, data) {
    if (err) throw err;
    var array = data.toString().split("\n");

    let totalScore = 0;

    array.forEach((card, cardIndex) => {
        console.log(card);

        var cardComponents = card.split(':')[1].split('|') as string[]
        var winningNumbers = cardComponents[0].split(" ").filter((x) => x !== '');
        var myNumbers = cardComponents[1].split(" ").filter((x) => x !== '');
        console.log(winningNumbers);
        console.log(myNumbers);


        var matches = winningNumbers.filter((x) => myNumbers.includes(x)).length;
        var score = calculateScore(matches);
        totalScore += score;
        console.log(`matches: ${matches}  --  score: ${score}`);




    });

    console.log(totalScore)

});

