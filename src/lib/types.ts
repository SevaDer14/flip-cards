import { z } from "zod";

export const dictionaryRecordSchema = z.object({
  id: z.string(),
  word: z.string(),
  translations: z.record(z.string(), z.string()),
  tags: z.array(z.string()),
  viewCount: z.number(),
  correctCount: z.number(),
  wrongCount: z.number(),
  lastViewed: z.nullable(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type DictionaryRecord = z.infer<typeof dictionaryRecordSchema>;

export const dictionarySchema = z.array(dictionaryRecordSchema);

export type Dictionary = z.infer<typeof dictionarySchema>;

export const flashCardSchema = z.object({
  word: z.string(),
  translation: z.string(),
  dictionaryRecordId: z.string(),
});

export type FlashCard = z.infer<typeof dictionaryRecordSchema>;
