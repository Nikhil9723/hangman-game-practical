export interface gameState {
    words: string,
    clue: string,
    guessLetter: string[],
    lives: number,
}

export interface Words {
    word: string,
    clue: string,
}