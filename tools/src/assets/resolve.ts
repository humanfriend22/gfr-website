import { auth, firestore, storage } from "../firebase";
import path from "path";
import fs from "fs/promises";
import yesno from "yesno";

const bucket = storage.bucket(
    "gs://gael-force-robotics-hf.firebasestorage.app",
);

// Copy all team logos from the bucket teams folder into the public/teams folder
const [files] = await bucket.getFiles({
    includeFoldersAsPrefixes: true,
    prefix: "teams",
    autoPaginate: true,
});

const teamsFolder = path.resolve("../app/public/teams");
const backupFolder = path.join("./teams_backup");

const isolateFilename = (name: string) => name.split("/").findLast(() => true)!;

for (const file of files) {
    console.log(
        `Found file: ${file.name} (${
            path.join(
                teamsFolder,
                isolateFilename(file.name),
            )
        })`,
    );
}

const ok = await yesno({
    question:
        `\nAre you sure you want to download ${files.length} files to this public folder: ${teamsFolder}?`,
});

if (!ok) process.exit(0);

// Prepare folder
if (await fs.exists(backupFolder)) {
    throw new Error(
        `Backup folder already exists: ${backupFolder}. Please remove it before proceeding.`,
    );
}
if (await fs.exists(teamsFolder)) {
    await fs.rename(teamsFolder, backupFolder);
}
await fs.mkdir(teamsFolder);

// Download files parallelly
console.log("");
await Promise.all(
    files.map((file) => {
        return new Promise((resolve) => {
            const destination = path.join(
                teamsFolder,
                isolateFilename(file.name),
            );
            console.log(`Downloading ${file.name} to ${destination}`);
            file.download({ destination }).then(() => {
                resolve(null);
            });
        });
    }),
);
