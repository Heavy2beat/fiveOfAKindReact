import { create } from "zustand";

export type Player = {
  id: string;
  name: string;
  scoreBoard: Map<string, number>;
};

export type LobbyType = {
  id: string;
  playerList: Player[];
};

interface MultiplayerStore {
  lobbyList: LobbyType[];

  setNewLobbyList: (listToSet: LobbyType[]) => void;

  currentPLayer: Player;
  setCurrentPlayer: (playerToSet: Player) => void;

  currentLobby: LobbyType | undefined;

  setCurrentLobby: (newLobby: LobbyType| undefined) => void;
}

export const useMultiplayerStore = create<MultiplayerStore>()((set) => ({
  lobbyList: [],
  setNewLobbyList: (newLobbyList: LobbyType[]) =>
    set(() => ({ lobbyList: newLobbyList })),
  currentPLayer: { id: "", name: "", scoreBoard: new Map<string, number>() },
  setCurrentPlayer: (playerToSet: Player) =>
    set(() => ({ currentPLayer: playerToSet })),
  currentLobby: undefined,
  setCurrentLobby: (newLobby: LobbyType | undefined) =>
    set(() => ({ currentLobby: newLobby })),
}));
