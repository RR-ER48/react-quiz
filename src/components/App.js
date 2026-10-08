import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import NextPreview from "./NextPreview";
import PrevQuestionNumber from "./PrevQuestionNumber";

const SECS_PER_QUESTIONS = 30;

function reducer(state, action) {
  const question = state.questions.at(state.index);
  if (action.type === "setQuestions")
    return { ...state, questions: action.payload, status: "ready" };
  if (action.type === "dataFailed") return { ...state, status: "errors" };
  if (action.type === "start")
    return {
      ...state,
      status: "active",
      secondsRemaining: state.questions.length * SECS_PER_QUESTIONS,
    };
  if (action.type === "newAnswer")
    return {
      ...state,
      answer: action.payload,
      points:
        action.payload === question.correctOption
          ? state.points + question.points
          : state.points,
      prevAnswers: [...state.prevAnswers, action.payload],
    };

  if (action.type === "nextQuestion")
    return { ...state, index: state.index + 1, answer: null };

  if (action.type === "finish")
    return {
      ...state,
      status: "finish",
      highScore:
        state.highScore < state.points ? state.points : state.highScore,
    };
  if (action.type === "restart")
    return {
      ...state,
      status: "ready",
      index: 0,
      answer: null,
      points: 0,
      secondsRemaining: null,
    };

  if (action.type === "tick")
    return {
      ...state,
      secondsRemaining: state.secondsRemaining - 1,
      status: state.secondsRemaining === 0 ? "finish" : state.status,
    };

  if (action.type === "prevAns")
    return {
      ...state,
      status: "prevAnswer",
      index: 0,
    };
  if (action.type === "nextPrev")
    return {
      ...state,
      index: state.index + 1,
    };
  if (action.type === "previous") return { ...state, index: state.index - 1 };
  if (action.type === "closePrev") return { ...state, status: "finish" };
  if (action.type === "back") return { ...state, status: "finish" };
}
const initialState = {
  questions: [],
  // ready,loading, error,active,finished,
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
  prevAnswers: [],
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    index,
    answer,
    points,
    highScore,
    secondsRemaining,
    prevAnswers,
  } = state;
  const numQuestions = questions.length;
  const maxTotalPoints = questions.reduce((cur, prev) => cur + prev.points, 0);
  useEffect(function () {
    async function fetchQuestion() {
      try {
        const res = await fetch(`http://localhost:8000/questions`);
        const data = await res.json();
        // console.log(data);
        dispatch({ type: "setQuestions", payload: data });
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    }
    fetchQuestion();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "errors" && <Error />}
        {status === "ready" && (
          <StartScreen
            numQuestions={numQuestions}
            dispatch={dispatch}
            highScore={highScore}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              maxTotalPoints={maxTotalPoints}
              points={points}
            />
            <Questions
              questions={questions[index]}
              answer={answer}
              dispatch={dispatch}
              status={status}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finish" && (
          <FinishScreen
            points={points}
            maxTotalPoints={maxTotalPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
        {status === "prevAnswer" && (
          <>
            <PrevQuestionNumber
              index={index}
              numQuestions={numQuestions}
              dispatch={dispatch}
            />
            <Questions
              questions={questions[index]}
              index={index}
              prevAnswers={prevAnswers}
              status={status}
            />
            <NextPreview
              dispatch={dispatch}
              index={index}
              numQuestions={numQuestions}
            />
          </>
        )}
      </Main>
    </div>
  );
}
