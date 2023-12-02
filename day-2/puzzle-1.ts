var fs = require("fs");

let redCubes = 12;
let greenCubes = 13;
let blueCubes = 14;

let possibleGames: number[] = [];

function checkPossible(count: number, colour: string) {
  switch (colour) {
    case "red":
      return count <= redCubes;
    case "green":
      return count <= greenCubes;
    case "blue":
      return count <= blueCubes;
    default:
      throw new Error();
  }
}

fs.readFile("day-2/input.txt", function (err, data) {
  if (err) throw err;

  var array = data.toString().split("\n") as string[];
  array.forEach((game, gameIndex) => {
    gameIndex = gameIndex + 1; //account for zero based index

    let sets = game
      .split(":")[1]
      .trim()
      .split(";")
      .map((x) => x.trim());
    let gamePossible = true;
    for (let set of sets) {
      let moves = set.split(",");
      for (let move of moves) {
        move = move.trim();
        let movePossible = checkPossible(
          parseInt(move.split(" ")[0].trim()),
          move.split(" ")[1].trim()
        );
        gamePossible = gamePossible && movePossible;
      }
    }
    if (gamePossible) {
      possibleGames.push(gameIndex);
    }
    console.log(`game ${gameIndex} possible? ${gamePossible}`);
  });

  let total = possibleGames.reduce((a, b) => {
    return a + b;
  });
  console.log(total);
});
