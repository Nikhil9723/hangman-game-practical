const STORAGE_KEY = 'hangman';
 
export interface GameState {
    words: string,
    clue: string,
    guessLetter: string[],
    lives: number,
}
 
export function saveGame(state: GameState) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
 
export function loadGame(): GameState | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
}
 
export function clearGame() {
    localStorage.removeItem(STORAGE_KEY);
}