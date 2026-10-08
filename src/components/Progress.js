function Progress({ index, numQuestions, maxTotalPoints, points }) {
  return (
    <header className="progress ">
      <progress max={numQuestions} value={index} />
      <p>
        Questions <strong>{index + 1}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{maxTotalPoints}
      </p>
    </header>
  );
}

export default Progress;
