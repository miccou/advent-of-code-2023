var fs = require("fs");

let powers: number[] = [];

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
    let required = {
      red: 0,
      green: 0,
      blue: 0,
    };
    for (let set of sets) {
      let moves = set.split(",");
      for (let move of moves) {
        move = move.trim();
        console.log(move);

        let colour = move.split(" ")[1].trim();

        switch (colour) {
          case "red":
            required.red = Math.max(required.red, parseInt(move.split(" ")[0]));
            break;
          case "green":
            required.green = Math.max(
              required.green,
              parseInt(move.split(" ")[0])
            );
            break;
          case "blue":
            required.blue = Math.max(
              required.blue,
              parseInt(move.split(" ")[0])
            );
            break;
          default:
            throw new Error();
        }
      }
    }
    powers.push(required.red * required.green * required.blue);
  });

  let total = powers.reduce((a, b) => {
    return a + b;
  });
  console.log(total);
});
