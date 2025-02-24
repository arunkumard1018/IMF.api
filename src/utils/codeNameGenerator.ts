import crypto from "crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const adjectives = [
    "Stealthy", "Fierce", "Shadow", "Swift", "Mighty", "Fearless", "Silent",
    "Cunning", "Brave", "Savage", "Iron", "Dark", "Phantom", "Ghostly", "Venomous"
];

const animals = [
    "Panther", "Wolf", "Tiger", "Raven", "Eagle", "Viper", "Jaguar",
    "Falcon", "Dragon", "Lynx", "Kraken", "Phoenix", "Scorpion", "Shark", "Cheetah"
];

const suffixes = ["X", "Alpha", "Omega", "Prime", "Zero", "One", "Elite", "Ultra"];

const hashToNumber = (input: string, max: number): number => {
    const hash = crypto.createHash("md5").update(input).digest("hex"); // Generate MD5 hash
    return parseInt(hash.substring(0, 8), 16) % max; // Convert to a number within range
};

const generateCodename = (userID: string): string => {
    const adjIndex = hashToNumber(userID, adjectives.length);
    const animalIndex = hashToNumber(userID + "animal", animals.length);
    const suffixIndex = hashToNumber(userID + "suffix", suffixes.length);

    let codename = `The ${adjectives[adjIndex]} ${animals[animalIndex]}`;

    // Use a suffix if the same codename exists for a different user (low collision chance)
    if ((adjIndex + animalIndex) % 2 === 0) {
        codename += ` ${suffixes[suffixIndex]}`;
    }

    return codename;
};

const generateUniqueCodename = async (userID: string): Promise<string> => {
    let codename = generateCodename(userID);
    let isUnique = false;

    while (!isUnique) {
        const existingGadget = await prisma.gadget.findUnique({ where: { codename } });
        if (!existingGadget) {
            isUnique = true;
        } else {
            codename = generateCodename(userID + Date.now().toString());
        }
    }

    return codename;
};

const generateConfirmationCode = (): string => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export { generateUniqueCodename, generateConfirmationCode };