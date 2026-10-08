function PrevQuestionNumber({ index, numQuestions, dispatch }) {
  return (
    <div className="progress">
      Questions--{index + 1}/{numQuestions}
      <button className="btn" onClick={() => dispatch({ type: "back" })}>
        Back
      </button>
    </div>
  );
}

export default PrevQuestionNumber;
