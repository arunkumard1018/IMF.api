
const colorWord = (word: string, colorCode: string) => {
    const coloredWord = `\x1b[38;5;${colorCode}m${word}\x1b[0m`; // Use 256-color codes
    return coloredWord;
};

const generateMissionSuccessProbability = (): string => {
    const probability = Math.floor(Math.random() * 101); // Generates a number between 0 and 100
    return `${probability}%`;
};


export { colorWord, generateMissionSuccessProbability }