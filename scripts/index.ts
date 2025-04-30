import gameWords from "./gameRandomWords";
import btnConstants from "./constant";
import { GameState, saveGame, loadGame, clearGame } from "./storageHandller";
import { Words } from "./module";

class HangMan {
    gameState: GameState;
    constructor(gameData:GameState) {
        this.gameState = gameData;
        this.initialGame();
    }

    initialGame() {
        console.log("initial game board");
        const mainGameTree = document.querySelector(".main__hangman") as HTMLDivElement
        console.log(mainGameTree);
        
        const suggestionBox = document.querySelector(".hangman__suggestion-box");
        console.log(suggestionBox);
        const blanks = document.querySelector(".hangman__blanks")
        console.log(blanks);
        console.log(gameWords);
        const StartBtn = document.querySelector("#start-btn");
        console.log(StartBtn);
        this.startGame();
    if(mainGameTree) {
        mainGameTree.addEventListener("click", (e) => {
            let currentTarget = e.target;
            if(currentTarget instanceof HTMLButtonElement) {
               let target = currentTarget.value;
                switch(target) {
                    case btnConstants.StartBtn:
                        console.log("start the game");
                        
                        break;
                    default: 
                        break;
                }
            }
        })
    }
    }

    startGame() {   
        this.displayWords(this.gameState);
        let words = this.gameState.words;
        this.handellGuess(this.gameState);
        saveGame(this.gameState);
    }

    

    displayWords(gameState: GameState) {
        console.log(gameState, "display word again");
        const suggestionBox = document.querySelector(".hangman__suggestion-box") as HTMLDivElement;
        console.log(suggestionBox);
        const blanks = document.querySelector(".hangman__blanks")
        console.log(blanks);

        if(suggestionBox) {
            suggestionBox.textContent = this.gameState.clue;
        }

        if(blanks) {
            blanks.textContent = ""
            if(gameState.lives >= 0) {
                let display = this.gameState.words.split("").map((letter) => gameState.guessLetter.includes(letter) ? letter:"_").join(" ");
                blanks.textContent = display;
                console.log(display, "display win ");
                this.checkWin();
            }
            else { 
                this.restart();
                alert("sorry your all lives is over");
                // this.initialGame()   
            }
        }
    }

    checkWin() {
        if(this.gameState.words.split("").every(letter => this.gameState.guessLetter.includes(letter))) {
            this.restart();
            alert("you won the game");
        }
    }

    restart() {
        clearGame();
        let word = getRandomWords();
        this.gameState = {
            words: word.word,
            clue: word.clue,
            guessLetter: [],
            lives: 6,
        }
        saveGame(this.gameState);
        this.initialGame();
    }

    handellGuess(gameState: GameState) {
        const letterInput = document.querySelector(".hangman__keyboard") as HTMLDivElement;
        console.log(letterInput);
        
        if(letterInput) {
            letterInput.addEventListener("click", (e) => {
                let letter = e.target
                if(letter instanceof HTMLButtonElement) {
                    let letterGuess = letter.value;
                    if(!(this.gameState.guessLetter.includes(letterGuess.toLowerCase()))) {
                        this.gameState.guessLetter.push(letterGuess.toLowerCase());
                        console.log(gameState.guessLetter, "hello");
                    }
                    if(!(this.gameState.words.includes(letterGuess.toLowerCase()))) {
                        console.log(gameState.lives);
                        this.gameState.lives --;
                    }
                }
                this.displayWords(gameState);
                saveGame(gameState);
            })
        }
        

    }
}


const saveData = loadGame();
console.log(saveData, "Hii");

function getRandomWords() {
    return gameWords[Math.floor(Math.random()*gameWords.length)];
}

let data = getRandomWords();
const gameState = {
    words: data.word,
    clue: data.clue,
    guessLetter: [],
    lives: 6,
}
if(saveData) {
    new HangMan(saveData)
}
else {
   new HangMan(gameState);
}
