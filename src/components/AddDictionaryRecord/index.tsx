import { db } from "@/lib/db";
import { useEffect, useState } from "react";
import defaultDictionary from "../../../defaultDictionary.json";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type Data = {
  word: string;
  translation: string;
  tag: string;
};

const DEFAULT = {
  word: "",
  translation: "",
  tag: "",
};

export function AddDictionaryRecord() {
  const [error, setError] = useState<string>();
  const [record, setRecord] = useState<Data>(DEFAULT);

  async function addRecord(newRecord: Data) {
    try {
      if (!newRecord.word || !newRecord.tag || !newRecord.translation) {
        throw new Error("Felids cannot be empty");
      }

      const existingWord = await db.words
        .where("word")
        .equals(newRecord.word)
        .toArray();

      if (!!existingWord && existingWord.length > 0) {
        throw new Error("Such word is already in db");
      }

      const now = new Date().toISOString();

      await db.words.add({
        word: newRecord.word,
        tags: [newRecord.tag],
        translations: {
          se: newRecord.translation,
        },
        createdAt: now,
        updatedAt: now,
        lastViewed: null,
        correctCount: 0,
        viewCount: 0,
        wrongCount: 0,
      });

      setError(undefined);
      setRecord(DEFAULT);
    } catch (error: any) {
      if (!error || !error.message) setError("Unknown error occurred");
      setError(error.message);
    }
  }

  useEffect(() => {
    async function seedDb() {
      if (!db) return;

      const firstRecord = await db.words.orderBy("word").limit(1).toArray();

      if (!firstRecord || firstRecord.length !== 0) return;

      for (const record of defaultDictionary) {
        await addRecord({
          word: record.word,
          translation: record.translations.se,
          tag: record.tags[0],
        });
      }
    }

    seedDb();
  }, []);

  return (
    <div className="relative">
      <div className="flex gap-2 pb-6">
        <Input
          type="text"
          placeholder="New word"
          value={record?.word}
          onChange={(e) => setRecord({ ...record, word: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Translation"
          value={record.translation}
          onChange={(e) =>
            setRecord({ ...record, translation: e.target.value })
          }
        />
        <Input
          type="text"
          placeholder="Tag"
          value={record.tag}
          onChange={(e) => setRecord({ ...record, tag: e.target.value })}
        />
        <Button variant="outline" onClick={() => addRecord(record)}>
          Add word
        </Button>
      </div>
      {error && <p className="text-red-600 text-sm absolute bottom-0">{error}</p>}
    </div>
  );
}
