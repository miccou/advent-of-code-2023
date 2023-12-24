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

  const times = array[0]
    .substring(9)
    .split(" ")
    .filter((x) => x.trim().length > 0)
    .map((y) => parseInt(y));
  const distances = array[1]
    .substring(9)
    .split(" ")
    .filter((x) => x.trim().length > 0)
    .map((y) => parseInt(y));

  let races: RaceEntry[] = [];

  //   console.log("times");
  //   console.table(times);

  //   console.log("distances");
  //   console.table(distances);

  times.forEach((time, timeIndex) => {
    races.push({
      time: time,
      distanceRecord: distances[timeIndex],
      waysToWin: 0,
    } as RaceEntry);
  });

  let answer = 1;

  races.forEach((race) => {
    for (let i = 1; i < race.time; i++) {
      if (i * (race.time - i) > race.distanceRecord) {
        race.waysToWin++;
      }
    }
    answer *= race.waysToWin;
  });

  console.log(answer);
});
