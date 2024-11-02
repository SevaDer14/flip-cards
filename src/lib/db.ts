import Dexie, { type EntityTable } from "dexie";
import { DictionaryRecord } from "./types";

const db = new Dexie("DictionaryDatabase") as Dexie & {
  words: EntityTable<DictionaryRecord, "id">;
};

db.version(1).stores({
  words:
    "++id, word, *tags, translations, translations.se, createdAt, updatedAt, lastViewed, correctCount, viewCount, wrongCount",
});

export { db };
