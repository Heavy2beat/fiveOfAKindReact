import { useMutation, useQuery, useQueryClient } from "react-query";
import { getAllHighscores, Score, sendScore } from "../api/highscoreAPI";
import "../styles/custom.css";

import { useNavigate } from "react-router-dom";
import { useLanguageStore } from "../store/LanguageStore";
import { useGameStore } from "../store/GameStore";
import { useState } from "react";

import HallOfFame from "../components/HallOfFame";
import Footer from "../components/Footer";

export default function Highscores() {
  const queryClient = useQueryClient();
  const { lang } = useLanguageStore();
  const navigate = useNavigate();
  const { highscoreList, sethighScoreList } = useGameStore();
  const query = useQuery({
    queryKey: ["highscores"],
    queryFn: getAllHighscores,
  });

  const mutation = useMutation({
    mutationFn: sendScore,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["highscores"] });
    },
  });

  const [isSend, setIsSend] = useState(false);
  const [restIsVisible, setRestIsVisible] = useState(false);

  const sendToOnlineHighScore = (
    player: string,
    score: number,
    index: number,
  ) => {
    if (highscoreList[index].isSend === true) {
      setIsSend(true);

      return;
    }

    if (!isSend) {
      const token = crypto.randomUUID();
      const scoreToSend: Score = {
        name: player,
        points: score,
        isSend: true,
        token: token,
      };
      handleTokenList(token);

      mutation.mutate(scoreToSend);

      const updatedHighScoreList = highscoreList.map((score, idx) =>
        idx === index ? { ...score, isSend: true } : score,
      );

      sethighScoreList(updatedHighScoreList);
      localStorage.setItem(
        "highscoreList",
        JSON.stringify(updatedHighScoreList),
      );

      setIsSend(true);
    }
  };

  const resetLocalHighscore = () => {
    localStorage.removeItem("highscoreList");
    sethighScoreList([]);
  };

  const handleTokenList = (token: string) => {
    const tokenToAdd = {
      token: token,
      date: Date.now(),
    };
    const tokenListFromStorage = localStorage.getItem("tokenList");
    let tokenListParsed = [];
    if (tokenListFromStorage) {
      tokenListParsed = JSON.parse(tokenListFromStorage);
    }
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    tokenListParsed = tokenListParsed.filter(
      (token: { token: string; date: number }) => token.date >= sevenDaysAgo,
    );
    tokenListParsed.push(tokenToAdd);
    localStorage.setItem("tokenList", JSON.stringify(tokenListParsed));
  };

  return (
    <>
      <div>
        <div className="m-2 grid grid-cols-3 bg-blue-200 p-2 text-center text-3xl lg:m-auto lg:w-4/5">
          <h3 className="col-start-2">{lang.highscores}</h3>

          <button
            onClick={() => navigate("/")}
            className="col-start-3 w-fit cursor-pointer place-self-end rounded bg-blue-400 p-2 shadow-2xl hover:bg-blue-500 md:place-self-center"
          >
            <img src="/fiveOfAKindReact/arrow-back.svg" alt="" />
          </button>
        </div>

        <div className="m-auto mb-2 w-5/6 bg-slate-300 p-2 text-center text-sm md:w-4/5">
          {highscoreList.length !== 0 ? (
            <p>
              {lang.highscoreText1}
              <span className="bg-green-400">{lang.save} online</span>{" "}
              {lang.highscoreText2}
              <span className="font-light">{lang.oneTime}</span>
            </p>
          ) : null}
        </div>
      </div>

      <div className={`m-2 grid gap-2 md:m-auto md:w-4/5 md:grid-cols-3`}>
        <div className="flex max-h-full min-w-fit flex-col justify-start overflow-y-scroll text-center">
          <div className="grid grid-cols-3 bg-green-300 text-xl">
            <h2 className="col-start-2">{lang.locale}</h2>
            <button
              onClick={() => resetLocalHighscore()}
              className="col-start-3 w-fit place-self-end rounded bg-red-400 px-4 text-start hover:bg-red-500"
            >
              <img src="/fiveOfAKindReact/trash.svg" alt="" />
            </button>
          </div>{" "}
          <ol className="list-decimal bg-slate-300 p-2">
            {highscoreList.map((score, index) => (
              <li
                key={score.name + score.points}
                className={
                  index % 2 == 0
                    ? "grid grid-cols-4 justify-between bg-blue-300 p-1"
                    : "grid grid-cols-4 justify-between bg-blue-400 p-1"
                }
              >
                <p className="text-start font-bold">{index + 1}.</p>{" "}
                <p className="text-start"> {score.name} </p>
                <p className="font-bold">
                  {" "}
                  {score.points} {lang.points}{" "}
                </p>
                <p>
                  {" "}
                  {index === 0 ? (
                    !isSend && highscoreList[index].isSend !== true ? (
                      <button
                        className="w-fit bg-green-400 p-2 text-xs hover:bg-green-500"
                        onClick={() => {
                          sendToOnlineHighScore(
                            score.name,
                            score.points,
                            index,
                          );
                        }}
                      >
                        {lang.save} online
                      </button>
                    ) : (
                      <span className="p-2 text-xs">{lang.saved}</span>
                    )
                  ) : null}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex max-h-full min-w-fit flex-col justify-start overflow-y-scroll text-center">
          <h2 className="bg-green-300 text-xl">{lang.weeklyHighscore}</h2>
          <ol className="list-decimal bg-slate-300 p-2">
            {query.data
              ?.filter((score, index) => index < 10 && score)
              .map((score, index) => (
                <li
                  key={score.name + score.points}
                  className={
                    index % 2 == 0
                      ? "grid grid-cols-3 justify-between bg-blue-300 p-2"
                      : "grid grid-cols-3 justify-between bg-blue-400 p-2"
                  }
                >
                  {" "}
                  <div className="flex justify-between">
                    <p className="text-start font-bold">{index + 1}. </p>
                    {index === 0 ? (
                      <img
                        src="/fiveOfAKindReact/crown.svg"
                        className="pr-2"
                        alt=""
                      />
                    ) : null}{" "}
                  </div>
                  <p className="scrollbar-thin line-clamp-2 overflow-y-auto text-start">
                    {" "}
                    {score.name}{" "}
                  </p>
                  <p className="font-bold">
                    {" "}
                    {score.points} {lang.points}
                  </p>{" "}
                </li>
              ))}
            <li
              className="flex justify-between p-2 duration-300 ease-in-out hover:bg-slate-400"
              onClick={() => setRestIsVisible(!restIsVisible)}
            >
              {lang.theOthers}{" "}
              {restIsVisible ? (
                <img src="/fiveOfAKindReact/chevron-compact-up.svg" alt="" />
              ) : (
                <img src="/fiveOfAKindReact/chevron-compact-down.svg" alt="" />
              )}
            </li>
            {restIsVisible
              ? query.data
                  ?.filter((score, index) => index >= 10 && score)
                  .map((score, index) => (
                    <li
                      key={score.name + score.points}
                      className={
                        index % 2 == 0
                          ? "grid grid-cols-3 justify-between bg-blue-300 p-2"
                          : "grid grid-cols-3 justify-between bg-blue-400 p-2"
                      }
                    >
                      <p className="text-start font-bold">{index + 11}. </p>{" "}
                      <div className="flex justify-between">
                        <p className="scrollbar-thin line-clamp-1 overflow-y-auto text-start">
                          {" "}
                          {score.name}{" "}
                        </p>
                      </div>
                      <p className="font-bold">
                        {" "}
                        {score.points} {lang.points}
                      </p>{" "}
                    </li>
                  ))
              : null}
          </ol>
        </div>
        <div>
          <HallOfFame></HallOfFame>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
}
