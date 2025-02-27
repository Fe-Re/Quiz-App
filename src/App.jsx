import { useEffect, useState } from "react";
import { QuestionBox } from "./QuestionBox";
import { StartMenu } from "./StartMenu";

export default function App() {
  const [questionAnswer, setQuestionAnswer] = useState([]);
  const [category, setCategory] = useState("ERROR");
  const [difficulty, setDifficulty] = useState("ERROR");
  const [questionBoxOpen, setQuestionBoxOpen] = useState(false);
  const [startMenuOpen, setStartMenuOpen] = useState(true);

  useEffect(() => {
    const categoryQuery = category === "" ? "" : `?categories=${category}`;
    const difficultyQuery =
      difficulty === ""
        ? ""
        : `${category === "" ? "?" : "&"}difficulties=${difficulty}`;

    fetch(
      `https://the-trivia-api.com/v2/questions${categoryQuery}${difficultyQuery}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setQuestionAnswer(data);
      })
      .catch((error) => console.error("Fehler beim Laden der Daten:", error));
  }, [category, difficulty]);

  return (
    <>
      {questionBoxOpen ? (
        <QuestionBox
          onSetStartMenuOpen={setStartMenuOpen}
          onSetQuestionBoxOpen={setQuestionBoxOpen}
          questionAnswer={questionAnswer}
          onSetCategory={setCategory}
          onSetDifficulty={setDifficulty}
        />
      ) : (
        ""
      )}
      {startMenuOpen ? (
        <StartMenu
          onSetCategory={setCategory}
          onSetStartMenuOpen={setStartMenuOpen}
          onSetQuestionBoxOpen={setQuestionBoxOpen}
          category={category}
          onSetDifficulty={setDifficulty}
          difficulty={difficulty}
        />
      ) : (
        ""
      )}
    </>
  );
}
