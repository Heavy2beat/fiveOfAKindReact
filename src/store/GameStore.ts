import { create } from "zustand";

interface GameStore  {
    numberOfRound: number;
    setNumberOfRound: (toSet:number)=>void;

    numberOfPlayers: number;
    setNumberOfPlayers: (toSet:number)=>void;

    playerOnTurn:number;
    setPlayerOnTurn : (toSet:number)=>void;

    scoreBoardPlayer1: Map<string,number>;
    setScoreBoardPlayer1: (newBoard : Map<string,number>)=>void;
    scoreBoardPlayer2: Map<string,number>;
    setScoreBoardPlayer2: (newBoard : Map<string,number>)=>void;
    scoreBoardPlayer3: Map<string,number>;
    setScoreBoardPlayer3: (newBoard : Map<string,number>)=>void;
    scoreBoardPlayer4: Map<string,number>;
    setScoreBoardPlayer4: (newBoard : Map<string,number>)=>void;

}

export const useGameStore = create<GameStore>()((set) => ({
numberOfRound:0,
setNumberOfRound: (toSet:number) => set(()=>({ numberOfRound: toSet })),

numberOfPlayers: 1,
setNumberOfPlayers:  (toSet:number) =>{ set(()=>({ numberOfPlayers: toSet }))},


playerOnTurn:1,
setPlayerOnTurn: (toSet:number) => set(()=>({ playerOnTurn: toSet })),

scoreBoardPlayer1: new Map<string,number>(),
setScoreBoardPlayer1: (newBoard: Map<string,number>) => set(()=>({scoreBoardPlayer1: newBoard})),
scoreBoardPlayer2: new Map<string,number>(),
setScoreBoardPlayer2: (newBoard: Map<string,number>) => set(()=>({scoreBoardPlayer2: newBoard})),
scoreBoardPlayer3: new Map<string,number>(),
setScoreBoardPlayer3: (newBoard: Map<string,number>) => set(()=>({scoreBoardPlayer3: newBoard})),
scoreBoardPlayer4: new Map<string,number>(),
setScoreBoardPlayer4: (newBoard: Map<string,number>) => set(()=>({scoreBoardPlayer4: newBoard})),
scoreBoardPlayer5: new Map<string,number>(),
setScoreBoardPlayer5: (newBoard: Map<string,number>) => set(()=>({scoreBoardPlayer4: newBoard})),



}));