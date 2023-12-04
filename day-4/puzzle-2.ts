const fs = require("fs");

fs.readFile("day-4/input.txt", (err, data) => {
  if (err) throw err;

  const array = data.toString().split("\n");

  for (let i = 0; i < array.length; i++) {
    const card = array[i];
    const cardComponents = card.split(":")[1].split("|") as string[];
    const winningNumbers = cardComponents[0].split(" ").filter((x) => x !== "");
    const myNumbers = cardComponents[1].split(" ").filter((x) => x !== "");
    const matches = winningNumbers.filter((x) => myNumbers.includes(x)).length;
    const cardNumber = parseInt(card.split(":")[0].replace("Card ", "").trim());
    const cardsToAdd = array.slice(
      cardNumber,
      Math.min(cardNumber + matches, array.length)
    );
    array.push(...cardsToAdd);
  }

  console.log(`total: ${array.length}`);
});
