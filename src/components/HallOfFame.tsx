import { useQuery } from "react-query";
import {
  getWeeklyWinners,
  getWinnerLink,
  sendPicture,
  sendWinnerLink,
} from "../api/highscoreAPI";
import { useLanguageStore } from "../store/LanguageStore";
import { ChangeEvent, useEffect, useState } from "react";
import Tooltip from "./Tooltip";

export default function HallOfFame() {
  const query = useQuery({
    queryKey: ["hallOfFame"],
    queryFn: getWeeklyWinners,
  });

  const { lang } = useLanguageStore();
  const [restIsVisible, setRestIsVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [avatarMenuVisible, setAvatarMenuVisible] = useState(false);

  const currentToken = localStorage.getItem("token");

  const hofSorted = query.data?.sort((a, b) => b.points - a.points);
  const hofLeader = hofSorted ? hofSorted[0] : null;

  useEffect(() => {
    getWinnerLink().then((link) => {
      setImageUrl(link);
    });
  }, [imageFile]);

  const updateImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      sendPicture(file).then(() => {
        setImageFile(file);
      });
    }
  };

  const handleOnAvatarClick = (imageLinkToSet: string) => {
    setImageUrl(imageLinkToSet);
    sendWinnerLink(imageLinkToSet);
    setAvatarMenuVisible(false);
  };

  return (
    <div>
      <div className="flex max-h-full min-w-fit flex-col justify-start overflow-y-scroll text-center">
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
                <p>{hofLeader.name}</p>{" "}
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
                <img
                  onClick={() =>
                    handleOnAvatarClick("/fiveOfAKindReact/one.gif")
                  }
                  className="cursor-pointer rounded-xl"
                  src="/fiveOfAKindReact/one.gif"
                  alt=""
                />
                <img
                  onClick={() =>
                    handleOnAvatarClick("/fiveOfAKindReact/two.gif")
                  }
                  className="cursor-pointer rounded-xl"
                  src="/fiveOfAKindReact/two.gif"
                  alt=""
                />
                <img
                  onClick={() =>
                    handleOnAvatarClick("/fiveOfAKindReact/three.gif")
                  }
                  className="cursor-pointer rounded-xl"
                  src="/fiveOfAKindReact/three.gif"
                  alt=""
                />
                <img
                  onClick={() =>
                    handleOnAvatarClick("/fiveOfAKindReact/four.gif")
                  }
                  className="cursor-pointer rounded-xl"
                  src="/fiveOfAKindReact/four.gif"
                  alt=""
                />
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
                      currentToken == hofLeader?.token
                        ? "Hey Champion, klicke hier und suche dir deinen Avatar aus!"
                        : `Diesen Avatar präsentiert dir dein Champion ${hofLeader?.name}`
                    }
                    children={
                      <img
                        onClick={
                          currentToken != undefined &&
                          currentToken == hofLeader?.token
                            ? () => setAvatarMenuVisible(true)
                            : () => {}
                        }
                        className="m-auto max-h-24 rounded"
                        src={imageUrl}
                      ></img>
                    }
                  ></Tooltip>
                ) : (
                  <p>kein Bild</p>
                )}
              </div>
              {currentToken != undefined && currentToken == hofLeader?.token ? (
                <div className="col-start-3 flex items-center justify-end">
                  <input
                    onChange={updateImage}
                    className="hidden"
                    id="upload-input"
                    type="file"
                    name="file"
                    accept=".jpg,.gif,.svg,.png"
                  />
                  <label className="" htmlFor="upload-input">
                    <img
                      className="mr-8 self-center rounded px-1 hover:bg-yellow-400"
                      src="/fiveOfAKindReact/upload.svg"
                      alt="Upload Icon"
                    ></img>
                  </label>
                </div>
              ) : null}
            </li>
          )}
          <li
            key="rest"
            className="flex justify-between p-2 duration-300 ease-in-out hover:bg-slate-400"
            onClick={() => setRestIsVisible(!restIsVisible)}
          >
            alle Wochen Champions anzeigen{" "}
            {restIsVisible ? (
              <img src="/fiveOfAKindReact/chevron-compact-up.svg" alt="" />
            ) : (
              <img src="/fiveOfAKindReact/chevron-compact-down.svg" alt="" />
            )}
          </li>
          {restIsVisible
            ? query.data
                ?.filter((score, index) => index < 10 && score)
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
                      <p className="text-start"> {score.name} </p>
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
