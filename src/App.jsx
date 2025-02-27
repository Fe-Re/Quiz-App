import { useEffect, useState } from "react";
import { QuestionBox } from "./QuestionBox";
import PropTypes from "prop-types";

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
      <CategoriesSelector onSetCategory={setCategory} />
    </>
  );
}

function CategoriesSelector({ onSetCategory }) {
  function changeCategory(selection) {
    onSetCategory(selection);
  }

  CategoriesSelector.propTypes = {
    onSetCategory: PropTypes.func.isRequired,
  };

  return (
    <select onChange={(event) => changeCategory(event.target.value)}>
      <option value="">Select a category</option>
      <option value="science">Science</option>
      <option value="history">History</option>
      <option value="sport_and_leisure">Sports and leisure</option>
      <option value="music">Music</option>
      <option value="geography">Geography</option>
    </select>
  );
}
