var fs = require("fs");

function calculateScore(matches: number) {
  return Math.trunc(Math.pow(2, matches - 1));
}

interface RaceEntry {
  time: number;
  distanceRecord: number;
  waysToWin: number;
}

fs.readFile("day-6/input.txt", function (err, data) {
  if (err) throw err;
  var array = data.toString().split("\n") as string[];

  const time = parseInt(
    array[0]
      .substring(9)
      .split(" ")
      .filter((x) => x.trim().length > 0)
      .join("")
  );
  const distance = parseInt(
    array[1]
      .substring(9)
      .split(" ")
      .filter((x) => x.trim().length > 0)
      .join("")
  );

  // console.log("time");
  // console.table(time);

  // console.log("distance");
  // console.table(distance);

  let waysToWin = 0;

  for (let i = 1; i < time; i++) {
    if (i * (time - i) > distance) {
      waysToWin++;
    }
  }

  console.log(waysToWin);
});
