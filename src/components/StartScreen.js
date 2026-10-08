function StartScreen({ numQuestions, dispatch, highScore }) {
  return (
    <div className="start">
      <h2>Welcome to the React quiz</h2>
      <h3>{numQuestions} questions to test your react master</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
      <h4>High Score--{highScore}</h4>
    </div>
  );
}

export default StartScreen;
