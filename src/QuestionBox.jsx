import PropTypes from "prop-types";
import { useState, useMemo } from "react";

export function QuestionBox({
  questionAnswer,
  onSetStartMenuOpen,
  onSetQuestionBoxOpen,
  onSetCategory,
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [IncorrectAnswer, setIncorrectAnswer] = useState(false);
  const [showResult, setShowResult] = useState(false);

  QuestionBox.propTypes = {
    questionAnswer: PropTypes.array.isRequired,
    onSetStartMenuOpen: PropTypes.func.isRequired,
    onSetQuestionBoxOpen: PropTypes.func.isRequired,
    onSetCategory: PropTypes.func.isRequired,
    difficulty: PropTypes.string.isRequired,
  };

  const currentQuestion = questionAnswer[currentQuestionIndex];

  const shuffledAnswers = useMemo(() => {
    if (!currentQuestion) return [];
    const answersArray = [
      currentQuestion.correctAnswer,
      ...currentQuestion.incorrectAnswers,
    ];

    for (let i = answersArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answersArray[i], answersArray[j]] = [answersArray[j], answersArray[i]];
    }
    return answersArray;
  }, [currentQuestion]);

  function handleAnswerClick(selectedAnswer) {
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setCurrentQuestionIndex(
        (prevIndex) => (prevIndex + 1) % (questionAnswer.length || 1)
      );
      setIncorrectAnswer(false);
      setShowResult(true);
    } else {
      setIncorrectAnswer(true);
      setShowResult(true);
    }
  }

  function endQuiz() {
    onSetStartMenuOpen((prev) => !prev);
    onSetQuestionBoxOpen((prev) => !prev);
    onSetCategory(() => "ERROR");
  }

  return (
    <>
      <div className="question-box">
        <h2 className="category">
          {currentQuestion
            ? currentQuestion.category.toUpperCase().replace(/_/g, " ")
            : "Lade Kategorie..."}
        </h2>
        <h3>
          {currentQuestion
            ? currentQuestion.difficulty.charAt(0).toUpperCase() +
              currentQuestion.difficulty.slice(1)
            : "Lade Schwierigkeitsgrad..."}
        </h3>
        <p>
          Question {currentQuestionIndex + 1} of {questionAnswer.length}
        </p>
        <div className="question">
          {currentQuestion ? currentQuestion.question.text : "Lade Frage..."}
        </div>
        <div className="answers">
          {shuffledAnswers.map((answerOption, index) => (
            <div
              className="answer"
              key={index}
              onClick={() => handleAnswerClick(answerOption)}
              style={{
                border: "1px solid black",
                padding: "8px",
                margin: "4px",
                cursor: "pointer",
              }}
            >
              {answerOption}
            </div>
          ))}
        </div>
        {showResult ? (
          <p style={IncorrectAnswer ? { color: "red" } : { color: "Green" }}>
            Your Answer was {IncorrectAnswer ? "Incorrect..." : "Correct!"}{" "}
          </p>
        ) : (
          ""
        )}
        <div className="end-btn" onClick={endQuiz}>
          End
        </div>
      </div>
    </>
  );
}
