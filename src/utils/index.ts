const colorWord = (word: string, colorCode: string) => {
    const coloredWord = `\x1b[38;5;${colorCode}m${word}\x1b[0m`; // Use 256-color codes
    return coloredWord;
};
export { colorWord }