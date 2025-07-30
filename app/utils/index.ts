import type { ShallowRef } from "vue";
import {
    getDownloadURL,
    ref as storageRef,
    uploadBytes,
} from "firebase/storage";

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

export function formatSeasonId(id: string, includeDate: boolean = true) {
    // e.g. "high-stakes-2425" -> "High Stakes 24-25"
    const parts = id.split("-");
    let s = `${(capitalize(parts[0]))} ${capitalize(parts[1])}`;
    if (includeDate) s += ` ${parts[2].slice(0, 2)}-${parts[2].slice(2)}`;
    return s;
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

export function formatDate(date: Date, includeTime: boolean = false) {
    try {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        };
        if (includeTime) {
            options.hour = "2-digit";
            options.minute = "2-digit";
        }
        return new Intl.DateTimeFormat("en-US", options).format(date);
    } catch (err) {
        console.error("Error formatting date:", err);
        return "";
    }
}

/**
 * Uploads an image to Firebase Storage and returns the download URL.
 * @param image The image input element to upload (useTemplateRef on a file input)
 * @param path the full path to the image excluding the file extension, e.g. `blogs/${blog.id}/cover`
 */
export async function uploadImage(
    image: Readonly<ShallowRef<HTMLInputElement | null>>,
    path: string,
) {
    const file = image.value?.files?.[0];
    if (file) {
        const reference = storageRef(
            storage.value!,
            path + "." + file.name.split(".").pop(),
        );
        await uploadBytes(reference, file);
        return await getDownloadURL(reference);
    }
    return "";
}

/**
 * Reads an object URL from an image input element.
 * @param image The image input element to read the object URL from (useTemplateRef on a file input)
 * @returns URL.createObjectURL
 */
export function readObjectURLFromImage(
    image: Readonly<ShallowRef<HTMLInputElement | null>>,
) {
    const files = image.value?.files;
    if (files && files.length > 0) {
        return URL.createObjectURL(files[0]);
    }
    return "";
}
