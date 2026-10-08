import Option from "./Option";
function Questions({
  questions,
  answer,
  dispatch,
  index,
  prevAnswers,
  status,
}) {
  return (
    <div>
      <h4>{questions.question}</h4>
      <Option
        questions={questions}
        answer={answer}
        dispatch={dispatch}
        index={index}
        prevAnswers={prevAnswers}
        status={status}
      />
    </div>
  );
}

export default Questions;
