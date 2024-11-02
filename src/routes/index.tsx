import { createFileRoute } from "@tanstack/react-router";
import defaultDictionary from "../../defaultDictionary.json";
import { dictionarySchema } from "@/lib/types";
import { DataTable } from "@/components/DictionaryTable";
import { columns } from "@/components/DictionaryTable/columns";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const [selectedWords, setSelectedWords] = useState({});
  const dictionary = dictionarySchema.parse(defaultDictionary);

  return (
    <div className="max-w-xl mx-auto py-32 flex flex-col gap-8">
      <h1 className="font-mono font-bold text-xl text-slate-600">
        Flash Cards.
      </h1>

      <Button variant="outline">Learn new words</Button>
      <DataTable
        onSelect={setSelectedWords}
        columns={columns}
        data={dictionary}
      />
      {JSON.stringify(selectedWords)}
    </div>
  );
}
