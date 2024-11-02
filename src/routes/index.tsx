import { createFileRoute } from "@tanstack/react-router";
import defaultDictionary from "../../defaultDictionary.json";
import { dictionarySchema } from "@/types";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const dictionary = dictionarySchema.parse(defaultDictionary);

  return (
    <div className="prose max-w-lg mx-auto py-32">
      <h1 className="font-mono font-bold text-xl">Flash Cards.</h1>
    
    
    </div>
  );
}
