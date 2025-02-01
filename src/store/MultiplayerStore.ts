import { create } from "zustand";
import { LobbyType, Player } from "../api/multiplayerAPI";




interface MultiplayerStore {
  lobbyList: LobbyType[];

  setNewLobbyList: (listToSet: LobbyType[]) => void;

  currentPLayer: Player | undefined;
  setCurrentPlayer: (playerToSet: Player | undefined) => void;

  currentLobby: LobbyType | undefined;

  setCurrentLobby: (newLobby: LobbyType| undefined) => void;
}

export const useMultiplayerStore = create<MultiplayerStore>()((set) => ({
  lobbyList: [],
  setNewLobbyList: (newLobbyList: LobbyType[]) =>
    set(() => ({ lobbyList: newLobbyList })),
  currentPLayer: undefined,
  setCurrentPlayer: (playerToSet: Player | undefined ) =>
    set(() => ({ currentPLayer: playerToSet })),
  currentLobby: undefined,
  setCurrentLobby: (newLobby: LobbyType | undefined) =>
    set(() => ({ currentLobby: newLobby })),
}));
