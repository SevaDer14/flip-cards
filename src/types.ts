import { z } from "zod";

export const dictionaryRecordSchema = z.object({
  id: z.string(),
  word: z.string(),
  translations: z.record(z.string(), z.string()),
  tags: z.array(z.string()),
  views: z.number(),
  correctCount: z.number(),
  wrongCount: z.number(),
  lastViewed: z.nullable(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
});

type DictionaryRecord = z.infer<typeof dictionaryRecordSchema>;

export const dictionarySchema = z.array(dictionaryRecordSchema);

type Dictionary = z.infer<typeof dictionarySchema>;

const flashCardSchema = z.object({
  word: z.string(),
  translation: z.string(),
  dictionaryRecordId: z.string(),
});

type FlashCard = z.infer<typeof dictionaryRecordSchema>;
