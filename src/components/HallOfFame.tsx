import { useQuery } from "react-query";
import {
  getWeeklyWinners,
  getWinnerLink,
  sendPicture,
} from "../api/highscoreAPI";
import { useLanguageStore } from "../store/LanguageStore";
import { ChangeEvent, useEffect, useState } from "react";

export default function HallOfFame() {
  const { lang } = useLanguageStore();
  const [imageUrl, setImageUrl] = useState(null);
  const [restIsVisible, setRestIsVisible] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const currentToken = "123f"; // localStorage.getItem("token");

  const query = useQuery({
    queryKey: ["hallOfFame"],
    queryFn: getWeeklyWinners,
  });

  const hofSorted = query.data?.sort((a, b) => b.points - a.points);
  const hofLeader = hofSorted ? hofSorted[0] : null;

  useEffect(() => {
    getWinnerLink().then((link) => {
      setImageUrl(link);
    });
  }, [imageUrl, imageFile]);

  const updateImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      sendPicture(file).then(() => {
        setImageFile(file);
      });
    }
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
          <li
            key="boardLeader"
            className="grid h-fit max-h-28 grid-cols-3 justify-between bg-yellow-300 p-2"
          >
            <div></div>
            <div className="col-start-1 flex items-center justify-center">
              <img
                src="/fiveOfAKindReact/fame1.svg"
                className="h-12 pr-8"
                alt=""
              ></img>
            </div>
            <div className="col-start-2">
              {imageUrl ? (
                <img className="m-auto max-h-24 rounded" src={imageUrl}></img>
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
                    <div className="flex justify-between"></div>
                    <p className="text-start"> {score.name} </p>
                    <div className="flex justify-end font-bold">
                      <div className="flex justify-items-end">
                        {score.points} {lang.points}
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
