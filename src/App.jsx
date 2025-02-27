import { useEffect, useState, useMemo } from "react";

export default function App() {
  return (
    <>
      <QuestionBox />
    </>
  );
}

function QuestionBox() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [IncorrectAnswer, setIncorrectAnswer] = useState(false);
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
    } else {
      setIncorrectAnswer(true);
    }
  }

  return (
    <>
      <div className="questionBox">
        <h2 className="category">
          {currentQuestion
            ? currentQuestion.category.toUpperCase().replace(/_/g, " ")
            : "Lade Kategorie..."}
        </h2>
        <div className="question">
          {currentQuestion ? currentQuestion.question.text : "Lade Frage..."}
        </div>
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
      {IncorrectAnswer && <p>Incorrect answer</p>}
    </>
  );
}
