var fs = require("fs");

class MapEntry {
  destinationRangeStart: number;
  sourceRangeStart: number;
  rangeLength: number;

  constructor(
    destinationRangeStart: number,
    sourceRangeStart: number,
    rangeLength: number
  ) {
    this.destinationRangeStart = destinationRangeStart;
    this.sourceRangeStart = sourceRangeStart;
    this.rangeLength = rangeLength;
  }

  within(input: number) {
    return (
      input >= this.sourceRangeStart &&
      input < this.sourceRangeStart + this.rangeLength
    );
  }

  map(input: number) {
    return input - (this.sourceRangeStart - this.destinationRangeStart);
  }

  print() {
    console.log(
      `destStart: ${this.destinationRangeStart}, sourceStart: ${this.sourceRangeStart}, length: ${this.rangeLength}`
    );

    const firstValue = this.sourceRangeStart;
    const lastValue = this.sourceRangeStart + this.rangeLength - 1;
    const firstResult = this.map(firstValue);
    const lastResult = this.map(lastValue);

    console.log(
      `for first source value ${firstValue} the result would be ${firstResult}, for last value ${lastValue} the result would be ${lastResult}`
    );
  }
}

fs.readFile("day-5/input.txt", function (err, data) {
  if (err) throw err;
  var array: string[] = data.toString().split("\n");

  let stage: number = 0;

  var seeds: number[];
  var seedToSoil: MapEntry[] = [];
  var soilToFertilizer: MapEntry[] = [];
  var fertilizerToWater: MapEntry[] = [];
  var waterToLight: MapEntry[] = [];
  var lightToTemperature: MapEntry[] = [];
  var temperatureToHumidity: MapEntry[] = [];
  var humidityToLocation: MapEntry[] = [];

  array.forEach((line) => {
    switch (line.substring(0, 5)) {
      case "seeds":
        seeds = line
          .replace("seeds: ", "")
          .trim()
          .split(" ")
          .map((x) => parseInt(x));
        break;
      case "seed-":
        stage = 1;
        break;
      case "soil-":
        stage = 2;
        break;
      case "ferti":
        stage = 3;
        break;
      case "water":
        stage = 4;
        break;
      case "light":
        stage = 5;
        break;
      case "tempe":
        stage = 6;
        break;
      case "humid":
        stage = 7;
        break;
      case "":
      case " ":
        break;
      default:
        var [dest, source, len] = line.split(" ");
        switch (stage) {
          case 1:
            seedToSoil.push(
              new MapEntry(parseInt(dest), parseInt(source), parseInt(len))
            );
            break;
          case 2:
            soilToFertilizer.push(
              new MapEntry(parseInt(dest), parseInt(source), parseInt(len))
            );
            break;
          case 3:
            fertilizerToWater.push(
              new MapEntry(parseInt(dest), parseInt(source), parseInt(len))
            );
            break;
          case 4:
            waterToLight.push(
              new MapEntry(parseInt(dest), parseInt(source), parseInt(len))
            );
            break;
          case 5:
            lightToTemperature.push(
              new MapEntry(parseInt(dest), parseInt(source), parseInt(len))
            );
            break;
          case 6:
            temperatureToHumidity.push(
              new MapEntry(parseInt(dest), parseInt(source), parseInt(len))
            );
            break;
          case 7:
            humidityToLocation.push(
              new MapEntry(parseInt(dest), parseInt(source), parseInt(len))
            );
            break;
          default:
            throw new Error();
        }
    }
  });

  console.log("seeds");
  console.log(seeds);

  var lowest = Number.MAX_SAFE_INTEGER;
  var lowest2 = Number.MAX_SAFE_INTEGER;

  seeds.forEach((seed) => {
    var soil = seedToSoil.find((x) => x.within(seed))?.map(seed) ?? seed;
    var fertilizer =
      soilToFertilizer.find((x) => x.within(soil))?.map(soil) ?? soil;
    var water =
      fertilizerToWater.find((x) => x.within(fertilizer))?.map(fertilizer) ??
      fertilizer;
    var light = waterToLight.find((x) => x.within(water))?.map(water) ?? water;
    var temperature =
      lightToTemperature.find((x) => x.within(light))?.map(light) ?? light;
    var humidity =
      temperatureToHumidity
        .find((x) => x.within(temperature))
        ?.map(temperature) ?? temperature;
    var location =
      humidityToLocation.find((x) => x.within(humidity))?.map(humidity) ??
      humidity;

    lowest = Math.min(lowest, location);
  });

  for (let i = 0; i < seeds.length; i += 2) {
    if (i + 1 < seeds.length) {
      const seedPair = seeds.slice(i, i + 2);
      console.log(seedPair);

      for (let i = seedPair[0]; i < seedPair[0] + seedPair[1]; i++) {
        var soil = seedToSoil.find((x) => x.within(i))?.map(i) ?? i;
        var fertilizer =
          soilToFertilizer.find((x) => x.within(soil))?.map(soil) ?? soil;
        var water =
          fertilizerToWater
            .find((x) => x.within(fertilizer))
            ?.map(fertilizer) ?? fertilizer;
        var light =
          waterToLight.find((x) => x.within(water))?.map(water) ?? water;
        var temperature =
          lightToTemperature.find((x) => x.within(light))?.map(light) ?? light;
        var humidity =
          temperatureToHumidity
            .find((x) => x.within(temperature))
            ?.map(temperature) ?? temperature;
        var location =
          humidityToLocation.find((x) => x.within(humidity))?.map(humidity) ??
          humidity;

        lowest2 = Math.min(lowest2, location);
      }
    }
  }

  console.log(lowest);
  console.log(lowest2);
});
