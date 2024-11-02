import { DictionaryRecord } from "@/lib/types";
import { useMemo, useRef, useState } from "react";
import ReactCardFlip from "react-card-flip";
import { Button } from "../ui/button";
import { db } from "@/lib/db";

function shuffle(array: any[]) {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

type FlipCardProps = {
  words: DictionaryRecord[];
};

export function FlipCards(props: FlipCardProps) {
  const [langFlip, setLangFlip] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [index, setIndex] = useState(0);
  const [iteration, setIteration] = useState(0);
  const knownWordsIds = useRef<string[]>([]);

  const words = useMemo(() => {
    const wordsToLearn = props.words.filter((word) =>
      !knownWordsIds.current.includes(word.id)
    );
    console.log(knownWordsIds);
    shuffle(wordsToLearn);

    return wordsToLearn;
  }, [iteration]);

  function flipCard() {
    setIsFlipped((v) => !v);
  }

  function nextCard() {
    if (isFlipped) {
      flipCard();
      setTimeout(nextIndex, 180);
    } else {
      nextIndex();
    }
  }

  function nextIndex() {
    if (index + 1 >= words.length) {
      setIteration((i) => i + 1);
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }

  function flipLanguages() {
    setLangFlip((v) => !v);
  }

  function newTimeStamps() {
    const now = new Date().toISOString();
    return {
      updatedAt: now,
      lastViewed: now,
    };
  }

  async function handleCorrect() {
    const word = await db.words.get(words[index].id);

    if (!word) return;

    await db.words.put({
      ...word,
      ...newTimeStamps(),
      viewCount: word.viewCount + 1,
      correctCount: word.correctCount + 1,
    });

    knownWordsIds.current.push(word.id);
    nextCard();
  }

  async function handleUnfamiliar() {
    const word = await db.words.get(words[index].id);

    if (!word) return;

    await db.words.put({
      ...word,
      ...newTimeStamps(),
      viewCount: word.viewCount + 1,
      wrongCount: word.wrongCount + 1,
    });

    nextCard();
  }

  return (
    <>
      <Button
        variant="outline"
        className="ml-auto mb-2 w-max"
        onClick={flipLanguages}
      >
        {langFlip ? "Se -> Eng" : "Eng -> Se"}
      </Button>

      {words.length > 0 ? (
        <>
          <ReactCardFlip
            isFlipped={langFlip ? !isFlipped : isFlipped}
            flipDirection="vertical"
          >
            <button
              onClick={flipCard}
              className="py-16 w-full font-medium text-2xl border border-slate-300 rounded bg-slate-100"
            >
              {words[index].word}
            </button>

            <button
              onClick={flipCard}
              className="py-16 w-full font-medium text-2xl border border-slate-300 rounded bg-slate-100"
            >
              {words[index].translations.se}
            </button>
          </ReactCardFlip>

          <div className="flex gap-4 justify-around mt-8">
            <Button
              variant="destructive"
              className="flex-grow"
              onClick={handleUnfamiliar}
            >
              Unfamiliar
            </Button>
            <Button
              variant="default"
              className="flex-grow"
              onClick={handleCorrect}
            >
              I know it!
            </Button>
          </div>
        </>
      ) : (
        <p className="mt-4 py-6 px-28 mx-auto text-slate-700 border-l border-r">
          Seems like you know all the words! Come back to repeat them later
        </p>
      )}
    </>
  );
}
