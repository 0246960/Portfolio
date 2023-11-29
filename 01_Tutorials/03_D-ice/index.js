var randNum = Math.floor(Math.random() * 6) + 1;

var randDice = "dice" + randNum + ".png";

var randImg = "images/" + randDice;

var img1 = document.querySelectorAll("img")[0];

img1.setAttribute("src", randImg);


var randNum2 = Math.floor(Math.random() * 6) + 1;

var randImg2 = "images/dice" + randNum2 + ".png";

document.querySelectorAll("img")[1].setAttribute("src", randImg2);


//If player 1 wins
if (randNum > randNum2) {
  document.querySelector("h1").innerHTML = "🚩 Player 1 Wins!";
}
else if (randNum2 > randNum) {
  document.querySelector("h1").innerHTML = "🚩 Player 2 Wins! ";
}
else {
  document.querySelector("h1").innerHTML = "Draw!";
}