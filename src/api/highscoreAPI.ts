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
const baseUrl = "http://highscore.fabdev.de";
const highscoreURL = baseUrl + "/highscores";

const weeklyURL = baseUrl + "/weeklywinners";

const getWinnerImageUrl = baseUrl + "/winnerLink";
const setWinnerImageUrl = baseUrl + "/winnerLink";

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
    const response = await fetch(getWinnerImageUrl);
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
    await fetch(setWinnerImageUrl, {
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
