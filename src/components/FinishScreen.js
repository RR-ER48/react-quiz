function FinishScreen({ points, maxTotalPoints, highScore, dispatch }) {
  const totalPercentage = (points / maxTotalPoints) * 100;
  let emoji;
  if (totalPercentage === 100) emoji = "🥇🎖️🎖️🏆";
  if (totalPercentage >= 80 && totalPercentage < 100) emoji = "🎉";
  if (totalPercentage >= 50 && totalPercentage < 80) emoji = "🙁";
  if (totalPercentage >= 0 && totalPercentage < 50) emoji = "🤔😔";
  if (totalPercentage === 0) emoji = "🤦🤦‍♂️";
  return (
    <>
      <p className="result ">
        <span>{emoji}</span> You Scored <strong>{points}</strong> out of{" "}
        {maxTotalPoints}-- ({Math.ceil(totalPercentage)}) %
      </p>
      <p className="highscore ">Your Highest Score - {highScore}</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "prevAns" })}
      >
        Preview Answers
      </button>
    </>
  );
}
export default FinishScreen;
