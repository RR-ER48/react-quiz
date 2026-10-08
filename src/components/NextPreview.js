function NextPreview({ dispatch, index, numQuestions }) {
  if (index < numQuestions - 1)
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextPrev" })}
        >
          Next Preview Question
        </button>
        {index > 0 && (
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "previous" })}
          >
            Previous Questions
          </button>
        )}
      </div>
    );

  if (index === numQuestions - 1)
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "closePrev" })}
        >
          Close
        </button>
      </div>
    );
}

export default NextPreview;
