import { useQuery } from "react-query";
import {
  getWeeklyWinners,
  getWinnerLink,
  sendWinnerLink,
} from "../api/highscoreAPI";
import { useLanguageStore } from "../store/LanguageStore";
import { useEffect, useState } from "react";
import Tooltip from "./Tooltip";
import "../styles/custom.css";
import { useGameStore } from "../store/GameStore";

export default function HallOfFame() {
  const query = useQuery({
    queryKey: ["hallOfFame"],
    queryFn: getWeeklyWinners,
  });

  const { lang } = useLanguageStore();
  const { currentTokenList } = useGameStore();
  const [restIsVisible, setRestIsVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(
    "/fiveOfAKindReact/one.gif",
  );

  const [avatarMenuVisible, setAvatarMenuVisible] = useState(false);
  const avatarLinkList = [
    "/fiveOfAKindReact/one.gif",
    "/fiveOfAKindReact/two.gif",
    "/fiveOfAKindReact/three.gif",
    "/fiveOfAKindReact/four.gif",
  ];

  const hofSorted = query.data?.sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateB - dateA;
  });
  const hofLeader = hofSorted ? hofSorted[0] : null;

  const found = currentTokenList.find(
    (element: { token: string; date: Date }) =>
      element.token === hofLeader?.token,
  );
  const currentToken = found !== undefined ? found : { token: "", date: "" };

  useEffect(() => {
    getWinnerLink().then((link) => {
      setImageUrl(link);
    });
  }, [imageUrl]);

  const handleOnAvatarClick = (imageLinkToSet: string) => {
    setImageUrl(imageLinkToSet);
    sendWinnerLink(imageLinkToSet);
    setAvatarMenuVisible(false);
  };

  return (
    <div>
      <div className="flex h-[calc(100vh-48px)] min-w-fit flex-col justify-start overflow-y-scroll text-center">
        <div className="flex justify-around bg-yellow-300 text-xl">
          <img src="/fiveOfAKindReact/fame.svg" alt="" />

          <h2 className="bg-yellow-300 text-xl">Wochen Champion</h2>
          <img src="/fiveOfAKindReact/fame.svg" alt="" />
        </div>

        <ol className="bg-slate-300 p-2">
          <li
            key="header"
            className="h-fit w-full bg-yellow-300 p-2 text-center"
          >
            {hofLeader ? (
              <div className="flex justify-around text-lg font-bold">
                {" "}
                <p className="scrollbar-thin line-clamp-1 overflow-y-auto text-start">
                  {hofLeader.name}
                </p>{" "}
                <p>
                  {" "}
                  {hofLeader.points} {lang.points}{" "}
                </p>
              </div>
            ) : null}
          </li>
          {avatarMenuVisible ? (
            <li className="h-30 grid grid-cols-3 justify-between bg-yellow-300 p-2">
              <div className="col-span-3 grid grid-cols-4 gap-4 p-4">
                {avatarLinkList.map((link) => (
                  <img
                    onClick={() => handleOnAvatarClick(link)}
                    className="cursor-pointer rounded-xl"
                    src={link}
                    alt=""
                  />
                ))}
              </div>
              <div className="col-span-3 flex justify-center"></div>
            </li>
          ) : (
            <li
              key="boardLeader"
              className="h-30 grid grid-cols-3 justify-between bg-yellow-300 p-2"
            >
              <div className="col-start-1 flex items-center justify-center">
                <img
                  src="/fiveOfAKindReact/fame1.svg"
                  className="h-12 pr-8"
                  alt=""
                ></img>
              </div>
              <div className="col-start-2">
                {imageUrl ? (
                  <Tooltip
                    sendTip={true}
                    message={
                      currentToken != undefined &&
                      currentToken.token == hofLeader?.token
                        ? `${lang.heyChampion}`
                        : `${lang.thisAvatarpresentedBy} ${hofLeader?.name}`
                    }
                    children={
                      <img
                        onClick={
                          currentToken != undefined &&
                          currentToken.token == hofLeader?.token
                            ? () => setAvatarMenuVisible(true)
                            : () => {}
                        }
                        className="m-auto max-h-24 cursor-pointer rounded"
                        src={imageUrl}
                      />
                    }
                  ></Tooltip>
                ) : (
                  <p>kein Bild</p>
                )}
              </div>
            </li>
          )}
          <li
            key="rest"
            className="flex justify-between p-2 duration-300 ease-in-out hover:bg-slate-400"
            onClick={() => setRestIsVisible(!restIsVisible)}
          >
            {lang.showAllChampions}{" "}
            {restIsVisible ? (
              <img src="/fiveOfAKindReact/chevron-compact-up.svg" alt="" />
            ) : (
              <img src="/fiveOfAKindReact/chevron-compact-down.svg" alt="" />
            )}
          </li>
          {restIsVisible
            ? query.data
                ?.filter((score, _index) => score)
                .map((score, index) => (
                  <li
                    key={score.name + score.points}
                    className={
                      index % 2 == 0
                        ? "grid grid-cols-3 justify-between bg-yellow-200 p-2"
                        : "grid grid-cols-3 justify-between bg-yellow-100 p-2"
                    }
                  >
                    {" "}
                    <div className="col-span-3 flex justify-between">
                      <p className="scrollbar-thin line-clamp-1 overflow-y-auto text-start">
                        {" "}
                        {score.name}{" "}
                      </p>
                      <div className="flex justify-end font-bold">
                        <div className="flex justify-items-end">
                          {score.points} {lang.points}
                        </div>
                      </div>
                    </div>{" "}
                  </li>
                ))
            : null}
        </ol>
      </div>
    </div>
  );
}
