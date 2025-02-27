import { useEffect, useState } from "react";
import { QuestionBox } from "./QuestionBox";

export default function App() {
  const [questionAnswer, setQuestionAnswer] = useState([]);

  useEffect(() => {
    fetch("https://the-trivia-api.com/v2/questions")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setQuestionAnswer(data);
      })
      .catch((error) => console.error("Fehler beim Laden der Daten:", error));
  }, []);

  return (
    <>
      <QuestionBox questionAnswer={questionAnswer} />
    </>
  );
}
