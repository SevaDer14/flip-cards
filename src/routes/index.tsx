import { createFileRoute } from "@tanstack/react-router";
import { DictionaryRecord } from "@/lib/types";
import { DataTable } from "@/components/DictionaryTable";
import { columns } from "@/components/DictionaryTable/columns";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AddDictionaryRecord } from "@/components/AddDictionaryRecord";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { FlipCards } from "@/components/FlipCards";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const [state, setState] = useState<"learning" | "editing">("editing");
  const [selectedWords, setSelectedWords] = useState<DictionaryRecord[]>([]);
  const dictionary = useLiveQuery<DictionaryRecord[]>(() => db.words.toArray());

  return (
    <div className="max-w-xl mx-auto py-16 flex flex-col gap-2">
      <div className="flex justify-between items-end mb-12">
        <h1 className="font-mono font-bold text-2xl text-slate-900">
          Flash Cards
        </h1>
        {state === "editing" ? (
          <Button onClick={() => setState("learning")}>Start learning</Button>
        ) : (
          <Button onClick={() => setState("editing")}>
            Back to dictionary
          </Button>
        )}
      </div>

      {state === "editing" && (
        <>
          <AddDictionaryRecord />

          <DataTable
            onSelect={setSelectedWords}
            columns={columns}
            data={dictionary || []}
          />
        </>
      )}

      {state === "learning" && (
        <>
          <FlipCards
            words={selectedWords.length > 0 ? selectedWords : dictionary || []}
          />
        </>
      )}

      <Button
        variant="outline"
        className="mt-8 w-max"
        onClick={() => db.words.clear()}
      >
        Clear dictionary
      </Button>
    </div>
  );
}
