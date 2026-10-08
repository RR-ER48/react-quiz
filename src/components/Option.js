function Option({ questions, answer, dispatch, index, prevAnswers, status }) {
  const hasAnswer = answer !== null;
  // console.log(hasAnswer);
  if (status === "active")
    return (
      <div className="options">
        {questions.options.map((option, i) => (
          <button
            className={`btn btn-option ${i === answer ? "answer" : ""} ${hasAnswer ? (i === questions.correctOption ? "correct" : "wrong") : ""}`}
            key={option}
            onClick={() => dispatch({ type: "newAnswer", payload: i })}
            disabled={hasAnswer}
          >
            {option}
          </button>
        ))}
      </div>
    );

  if (status === "prevAnswer")
    return (
      <div className="options">
        {questions.options.map((option, i) => (
          <button
            className={`btn btn-option ${i === prevAnswers[index] ? "answer" : ""} ${i === questions.correctOption ? "correct" : "wrong"}`}
            key={option}
            onClick={() => dispatch({ type: "newAnswer", payload: i })}
            disabled={hasAnswer}
          >
            {option}
          </button>
        ))}
      </div>
    );
}

export default Option;
