export const capitalize = (str: string) => {
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

export function formatSeasonId(id: string) {
    // e.g. "high-stakes-2425" -> "High Stakes 24-25"
    const parts = id.split("-");
    return `${(capitalize(parts[0]))} ${capitalize(parts[1])} ${
        parts[2].slice(0, 2)
    }-${parts[2].slice(2)}`;
}

export function randomLetter(exclude: string[] = []): string {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const filtered = alphabet.split("").filter((letter) =>
        !exclude.includes(letter) && !exclude.includes(letter.toUpperCase())
    );

    if (filtered.length === 0) {
        throw new Error("No letters left to choose from.");
    }

    const index = Math.floor(Math.random() * filtered.length);
    return filtered[index];
}

export function resolveTeamLogoPath(seasonId: string, letter: string) {
    // e.g. "high-stakes-2425" + "A" -> "/teams/high-stakes-2425_A.png"
    return `/teams/${seasonId}_${letter}.png`;
}
