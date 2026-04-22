import { create } from "zustand";
import { Score } from "../api/highscoreAPI";

interface HighscoreState {
  // Weekly Winners / Hall of Fame
  weeklyWinners: Score[];
  allTimeChampion: Score | null;
  latestWeeklyWinner: Score | null;
  isUserChampion: boolean;
  
  
  // Laufende Woche online Liste
  currentHighscores: Score[];
  currentOnlineLeader: Score | null;

  //Lokale Liste
  localHighscores: Score[];
  

  // Actions online Liste
  setWeeklyWinners: (winners: Score[], userTokens: string[]) => void;
  setHighscores: (scores: Score[]) => void;
  // Lokale Action ---
  setLocalHighscores: (scores: Score[]) => void;
}

export const useHighscoreStore = create<HighscoreState>((set) => ({
  weeklyWinners: [],
  allTimeChampion: null,
  latestWeeklyWinner: null,
  isUserChampion: false,
  currentHighscores: [],
  localHighscores: [],
  currentOnlineLeader: null,
  

  // Setzt die Hall of Fame (Wochensieger der Vergangenheit)
  setWeeklyWinners: (winners, userTokens) => {
    if (!winners || winners.length === 0) return;

    // 1. Alltime Champion (Höchste Punktzahl jemals in der HoF)
    const allTime = [...winners].sort((a, b) => (b.points || 0) - (a.points || 0))[0];

    // 2. Latest Weekly Winner (Der zeitlich letzte Eintrag)
    const latest = [...winners].sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    })[0];

    // 3. Check: Ist der Nutzer dieser neueste Champion?
    const isMe = latest?.token ? userTokens.includes(latest.token) : false;

    set({
      weeklyWinners: winners,
      allTimeChampion: allTime,
      latestWeeklyWinner: latest,
      isUserChampion: isMe
    });
  },

  // Setzt die Scores der aktuell laufenden Woche
setHighscores: (scores) => {
    // Liste nach Punkten sortieren
    const sorted = [...scores].sort((a, b) => (b.points || 0) - (a.points || 0));
    
    set({ 
      currentHighscores: sorted,
      // Der Leader ist einfach der Erste in der sortierten Liste
      currentOnlineLeader: sorted.length > 0 ? sorted[0] : null
    });
  },
  // Setzt die lokalen Scores
  setLocalHighscores: (scores) => set({ localHighscores: scores }),
}));