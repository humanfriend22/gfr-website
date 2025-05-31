export const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatCamelCase = (str: string) => {
    // Space, comma, or dash
    const words = str.split(/[ ,\-]+/);
    return words[0].toLowerCase() + words.slice(1).join("");
};

export async function isRealWord(word: string) {
    try {
        const response = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
        );
        if (!response.ok) throw new Error("Not a valid word");
        const data = await response.json();
        return Array.isArray(data);
    } catch (e) {
        return false;
    }
}
