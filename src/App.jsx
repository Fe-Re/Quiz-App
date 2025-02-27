import { useEffect, useState } from "react";
import { QuestionBox } from "./QuestionBox";
import { StartMenu } from "./StartMenu";

export default function App() {
  const [questionAnswer, setQuestionAnswer] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetch(
      `https://the-trivia-api.com/v2/questions${
        category === "" ? "" : `?categories=${category}`
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setQuestionAnswer(data);
      })
      .catch((error) => console.error("Fehler beim Laden der Daten:", error));
  }, [category]);

  return (
    <>
      <QuestionBox questionAnswer={questionAnswer} />
      <StartMenu onSetCategory={setCategory} />
    </>
  );
}
