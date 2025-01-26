import { useMutation, useQuery, useQueryClient } from "react-query";
import Footer from "../components/Footer";
import { getAllHighscores, sendScore } from "../api/highscoreAPI";

import { useNavigate } from "react-router-dom";
import { useLanguageStore } from "../store/LanguageStore";
import { useGameStore } from "../store/GameStore";
import { useState } from "react";

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

  const sendToOnlineHighScore = (player: string, score: number) => {
    if (isSend === false) {
      mutation.mutate({
        name: player,
        points: score,
      });
      setIsSend(true);
    }
  };

  const resetLocalHighscore = () => {
    localStorage.removeItem("highscoreList");
    sethighScoreList([]);
  };

  return (
    <>
      <div>
        <div className="m-2 grid grid-cols-3 bg-blue-200 p-2 text-center text-3xl lg:m-auto lg:w-2/3">
          <h3 className="col-start-2">{lang.highscores}</h3>

          <button
            onClick={() => navigate("/")}
            className="col-start-3 w-fit cursor-pointer place-self-end rounded bg-blue-400 p-2 shadow-2xl md:place-self-center"
          >
            <img src="/fiveOfAKindReact/arrow-back.svg" alt="" />
          </button>
        </div>

        <div className="m-auto mb-2 w-5/6 bg-slate-300 p-2 text-center text-sm md:w-2/3">
          {highscoreList.length !== 0 ? (
            <p>
              {lang.highscoreText1}
              <span className="bg-green-400">{lang.save} online</span>{" "}
              {lang.highscoreText2}
              <span className="font-thin">{lang.oneTime}</span>
            </p>
          ) : null}
        </div>
      </div>
      <div className="m-2 grid gap-2 md:m-auto md:w-2/3 md:grid-cols-2">
        <div className="flex flex-col justify-center text-center">
          <div className="grid grid-cols-3 bg-green-300 text-xl">
            <h2 className="col-start-2">{lang.locale}</h2>
            <button
              onClick={() => resetLocalHighscore()}
              className="col-start-3 w-fit place-self-end rounded bg-red-500 px-4 text-start"
            >
              X
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
                    !isSend ? (
                      <button
                        className="bg-green-400 p-2 text-xs"
                        onClick={() =>
                          sendToOnlineHighScore(score.name, score.points)
                        }
                      >
                        {lang.save} online
                      </button>
                    ) : (
                      <p className="p-2 text-xs">{lang.saved}</p>
                    )
                  ) : null}
                </p>
              </li>
            ))}
          </ol>
          {highscoreList.length === 0 ? lang.noScores : null}
        </div>

        <div className="md:w- flex flex-col justify-center text-center">
          <h2 className="bg-green-300 text-xl">
            {lang.weeklyHighscore} online
          </h2>
          <ol className="list-decimal bg-slate-300 p-2">
            {query.data?.map((score, index) => (
              <li
                key={score.name + score.points}
                className={
                  index % 2 == 0
                    ? "grid grid-cols-3 justify-between bg-blue-300 p-2"
                    : "grid grid-cols-3 justify-between bg-blue-400 p-2"
                }
              >
                <p className="text-start font-bold">{index + 1}.</p>{" "}
                <p className="text-start"> {score.name} </p>
                <p className="font-bold">
                  {" "}
                  {score.points} {lang.points}
                </p>
              </li>
            ))}
          </ol>
          {highscoreList.length === 0 ? lang.noScores : null}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
