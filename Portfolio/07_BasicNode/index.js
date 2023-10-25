// 1. Hello World
console.log("Hello, World!");

// 2. Require tool
const sw = require("star-wars-quotes");
console.log(sw());

// 3. Multiple calls
const superheroes = require("superheroes");
const supervillains = require("supervillains");

const hero = superheroes.random();
const villain = supervillains.random();

console.log(`Epic battle: ${hero} vs ${villain}`);

// 4. Read file
const fs = require("fs");

fs.readFile("data/input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error al leer el archivo:", err);
    return;
  }
  console.log("The secret message is:\n" + data);
});