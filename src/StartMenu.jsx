import PropTypes from "prop-types";

export function StartMenu({
  onSetCategory,
  onSetStartMenuOpen,
  onSetQuestionBoxOpen,
  category,
  onSetDifficulty,
  difficulty,
}) {
  function changeCategory(selection) {
    onSetCategory(selection);
  }

  StartMenu.propTypes = {
    onSetCategory: PropTypes.func.isRequired,
    startMenuOpen: PropTypes.bool.isRequired,
    onSetStartMenuOpen: PropTypes.func.isRequired,
    questionBoxOpen: PropTypes.bool.isRequired,
    onSetQuestionBoxOpen: PropTypes.func.isRequired,
    category: PropTypes.string.isRequired,
    onSetDifficulty: PropTypes.func.isRequired,
    difficulty: PropTypes.string.isRequired,
  };

  function startQuiz() {
    if (category === "ERROR" && difficulty === "ERROR") {
      alert("Please select a category and a difficulty");
    } else if (category === "ERROR") {
      alert("Please select a category");
    } else if (difficulty === "ERROR") {
      alert("Please select a difficulty");
    } else {
      onSetStartMenuOpen((prev) => !prev);
      onSetQuestionBoxOpen((prev) => !prev);
    }
  }

  return (
    <div className="start-menu">
      <h1>Quiz-App</h1>
      <div className="start-btn" onClick={startQuiz}>
        START
      </div>
      <select
        onChange={(event) => changeCategory(event.target.value)}
        className="category-select"
      >
        <option value="ERROR">Select a category</option>
        <option value="">Random</option>
        <option value="science">Science</option>
        <option value="history">History</option>
        <option value="sport_and_leisure">Sports and leisure</option>
        <option value="music">Music</option>
        <option value="geography">Geography</option>
        <option value="society_and_culture">Society and culture</option>
        <option value="art_and_literature">Art and literature</option>
        <option value="film_and_tv">Film and television</option>
        <option value="food_and_drink">Food and drink</option>
      </select>
      <select
        onChange={(event) => onSetDifficulty(event.target.value)}
        className="difficulty-select"
      >
        <option value="ERROR">Select a difficulty</option>
        <option value="">Random</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
}
