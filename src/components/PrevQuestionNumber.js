function PrevQuestionNumber({ index, numQuestions }) {
  return (
    <div className="progress">
      Questions--{index + 1}/{numQuestions}
    </div>
  );
}

export default PrevQuestionNumber;
