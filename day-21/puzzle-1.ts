var fs = require("fs");

fs.readFile("day-21/input.txt", function (err, data) {
  if (err) throw err;
  var array = data.toString().split("\n") as string[];

  let twoDArray: string[][] = new Array(array.length)
    .fill("-")
    .map(() => new Array(array[0].length).fill("-"));

  array.forEach((line, lineIndex) => {
    console.log(line);
    line.split("").forEach((character, characterIndex) => {
      twoDArray[lineIndex][characterIndex] = character;
    });
  });

  console.table(twoDArray);

  const steps = 64;
  for (let i = 1; i <= steps; i++) {
    console.log(`taking step number ${i}`);

    var newTwoDArray = structuredClone(twoDArray);

    for(var x = 0; x < twoDArray.length; x++) {
      var line = twoDArray[x];
      for(var y = 0; y < line.length; y++) {


          if((line[y] === 'S' || line[y] === 'O')){
              //try north
              if(x > 0 && newTwoDArray[x-1][y] != '#'){
                newTwoDArray[x-1][y] = 'O';
              }

              //try east
              if(x > 0 && newTwoDArray[x][y+1] != '#'){
                newTwoDArray[x][y+1] = 'O';
              }

              //try south
              if(x > 0 && newTwoDArray[x+1][y] != '#'){
                newTwoDArray[x+1][y] = 'O';
              }

              //try west
              if(x > 0 && newTwoDArray[x][y-1] != '#'){
                newTwoDArray[x][y-1] = 'O';
              }

              //remove current canwalk marker 
              newTwoDArray[x][y] = '.';
          }
      } 
  }

  twoDArray = newTwoDArray;

  }

  let total = 0;

  for(var x = 0; x < twoDArray.length; x++) {
    var line = twoDArray[x];
    for(var y = 0; y < line.length; y++) {
      if(
        twoDArray[x][y] == 'O'
      ){
        total++;
      }

    }}

    console.log(total);
});
