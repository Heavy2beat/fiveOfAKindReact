import { create } from "zustand";
import { Score } from "../api/highscoreAPI";

interface HighscoreState {
  weeklyWinners: Score[];
  allTimeChampion: Score | null;
  latestWeeklyWinner: Score | null;
  isUserChampion: boolean; // Entspricht deiner "isChampion" Logik

  setWeeklyWinners: (winners: Score[], userTokens: string[]) => void;
}

export const useHighscoreStore = create<HighscoreState>((set) => ({
  weeklyWinners: [],
  allTimeChampion: null,
  latestWeeklyWinner: null,
  isUserChampion: false,

  setWeeklyWinners: (winners, userTokens) => {
    if (!winners || winners.length === 0) return;

    // 1. Alltime Champion (Höchste Punktzahl)
    const allTime = [...winners].sort((a, b) => (b.points || 0) - (a.points || 0))[0];

    // 2. Latest Weekly Winner (Neuester Eintrag - dein hofLeader)
    const latest = [...winners].sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    })[0];

    // 3. Check: Ist der Nutzer dieser Champion?
    const isMe = latest?.token ? userTokens.includes(latest.token) : false;

    set({
      weeklyWinners: winners,
      allTimeChampion: allTime,
      latestWeeklyWinner: latest,
      isUserChampion: isMe
    });
  },
}));