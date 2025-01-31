import { create } from "zustand";


interface Player {
    playerName :string;
    scoreBoard: Map<string,number>;
}

interface Lobby{
    playerList: Player[];
}


interface MultiplayerStore {

    lobbyList: Lobby[]

    setNewLobbyList :(listToSet: Lobby[])=>void;
}

    export const useMultiplayerStore = create<MultiplayerStore>()((set)=>({
       lobbyList: [],
       setNewLobbyList: (newLobbyList:Lobby[])=>set(()=>({lobbyList: newLobbyList})) 
    }));



    
    