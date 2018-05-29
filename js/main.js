
// cards
const cardsArr = [
    {'name':'america', 'img':'images/avengers/captain-america.jpg' },
    {'name':'ironman', 'img':'images/avengers/iron-man.jpg' },
    {'name':'thor', 'img':'images/avengers/thor.jpg' },
    {'name':'bucky', 'img':'images/avengers/bucky.jpg' },
    {'name':'blackpanther', 'img':'images/avengers/blackpanther.jpg' },
    {'name':'widow', 'img':'images/avengers/widow.jpg' },
    {'name':'drstrenge', 'img':'images/avengers/drstrenge.jpg' },
    {'name':'falcon', 'img':'images/avengers/falcon.jpg' },
    {'name':'gamora', 'img':'images/avengers/gamora.jpg' },
    {'name':'hulk', 'img':'images/avengers/hulk.jpg' },
    {'name':'ironmachine', 'img':'images/avengers/ironmachine.jpg' },
    {'name':'rocket', 'img':'images/avengers/rocket.jpg' },
    {'name':'spiderman', 'img':'images/avengers/spiderman.jpg' },
    {'name':'starlord', 'img':'images/avengers/starlord.jpg' },
    {'name':'vision', 'img':'images/avengers/vision.jpg' },
];

const game = document.getElementById("game");
//crate section with clss.grid
const grid = document.createElement("section");
grid.setAttribute("class", "grid");
game.appendChild(grid);

//duplicate cards
let gameGrid = cardsArr.concat(cardsArr);
// randomize cards
function startGame(){
    gameGrid.sort(() => 0.5 - Math.random());

    gameGrid.forEach(item => {
        const card = document.createElement("div");
        //add class to all div
        card.classList.add("card");
        //add data-name attr to div
        card.dataset.name = item.name;
        //create fron of card
        const front = document.createElement("div");
        front.classList.add("front");
        // create back
        const back = document.createElement("div");
        back.classList.add("back");
        //add backround image
        back.style.backgroundImage = `url(${item.img})`;

        grid.appendChild(card);
        card.appendChild(front);
        card.appendChild(back);
    });
};
startGame();

let count = 0;
let firstGuess = "";
let secondGuess = "";
let previousTarget = null;
let delay = 1200;
let matchedCard = document.getElementsByClassName("match");
let modal = document.getElementById("popup1");
console.log(modal);

// ADD CLASS WHEN MATCH
const match = () => {
    
    const selected = document.querySelectorAll(".selected");
    selected.forEach(card => {
        card.classList.add("match");   
    }   
);

    console.log(matchedCard.length);  
    
    function congratulations(){
    if (matchedCard.length == 30){
        // show congratulations modal
        modal.classList.add("show");
            };
        };
    congratulations();
    
}

const resetGuesses = () => {
    firstGuess = "";
    secondGuess = "";
    count = 0;
    previousTarget = null;

    var selected = document.querySelectorAll(".selected");
    selected.forEach(card => {
        card.classList.remove("selected");
    });
};
//add class after click
grid.addEventListener("click", event =>{
    const clicked = event.target;
    if (
        clicked.nodeName === "SECTION" || 
        clicked === previousTarget || clicked.parentNode.classList.contains("selected") ||
        clicked.parentNode.classList.contains("match")
    ){
        return;
    };
    
    if (count < 2){
    count++;
    if(count === 1){
        firstGuess = clicked.parentNode.dataset.name;
        console.log(firstGuess);
        clicked.parentNode.classList.add("selected");
    } else {
        secondGuess = clicked.parentNode.dataset.name;
        console.log(secondGuess);
        clicked.parentNode.classList.add("selected");
    }
    if (firstGuess && secondGuess ){
        if (firstGuess === secondGuess){
            setTimeout( match, delay);
        }
            setTimeout(resetGuesses, delay);
        
        }
        previousTarget = clicked;
    }
    
}
);

// PLAY AGAIN
function playAgain(){
    $('.grid').empty();
    modal.classList.remove("show");
    
    startGame();
}
