import { sendToast } from "../utils/utils";

export type Score = {
  name: string;
  points: number;
  isSend: boolean;
  imageUrl?: string;
  token?: string;
  date?: Date;
};

export type Player = {
  id: string;
  name: string;
};
const baseUrl =
  "https://highscore-ff-d7b5cwenbcewctaw.germanywestcentral-01.azurewebsites.net";
const highscoreURL = baseUrl + "/highscores";

const weeklyURL = baseUrl + "/weekly_winners";

const winnerImageLinkUrl = baseUrl + "/download";
const sendWinnerImageLinkUrl = baseUrl + "/downloadlink";

export async function getAllHighscores(): Promise<Score[]> {
  try {
    const response = await fetch(highscoreURL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: Score[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
export async function getWeeklyWinners(): Promise<Score[]> {
  try {
    const response = await fetch(weeklyURL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: Score[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function sendScore(score: Score): Promise<void> {
  try {
    const response = await fetch(highscoreURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(score),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Score sent successfully:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function getWinnerLink() {
  try {
    const response = await fetch(winnerImageLinkUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function sendWinnerLink(linkToSend: string) {
  const toSend = {
    linkToSet: linkToSend,
  };
  try {
    await fetch(sendWinnerImageLinkUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toSend),
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function sendPicture(fileInput: File) {
  const renamedFile = new File([fileInput], "winner.jpg");
  const formdata = new FormData();
  formdata.append("file", renamedFile, "winner.jpg");

  await fetch(
    "https://highscore-ff-d7b5cwenbcewctaw.germanywestcentral-01.azurewebsites.net/upload",
    {
      method: "POST",
      body: formdata,
      redirect: "follow",
    },
  )
    .then((response) => response.text())
    .then((result) => {
      sendToast(result, 3000);
    })
    .catch((error) => console.error(error));
}
