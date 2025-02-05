import { useEffect, useState } from "react";
import DiceMachine from "../components/dicemachine/Dicemachine";
import MultiPlayerScoreBoard from "../components/scoreboard/MultiPlayerScoreBoard";
import { useMultiplayerStore } from "../store/MultiplayerStore";
import {
  
  LobbyType,
 connectToBackend,
  disconnectFromBackend,
} from "../api/multiplayerAPI";


export default function MultiplayerGame() {
  const {
    currentLobby,
    currentPLayer,
    lobbyList,
   setNewLobbyList,
   setCurrentLobby,
  } = useMultiplayerStore();

  const [lobbyForGame, setLobbyForGame] = useState<LobbyType | undefined>(
    currentLobby!,
  );

  

  useEffect(() => {
    if (lobbyList !== undefined) {
      setLobbyForGame(
        lobbyList.find((lobby: LobbyType) => lobby.id === currentLobby!.id),
      );
    }
  }, [currentLobby, lobbyList]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
   connectToBackend((message: any) => {
       console.log("Message received:", message);
       if (Array.isArray(message)) {
         console.log("setNewLobbyList because message is Array");
         setNewLobbyList([...message]);
       } 
        
       else {
         setCurrentLobby({ ...message });
       }
       for (const lobby of lobbyList){
         if (lobby.id===currentLobby!.id){
           
           setCurrentLobby(lobby)
         }
     }});

    return () => {
      disconnectFromBackend();
    };
  }, [setNewLobbyList, setCurrentLobby, lobbyList, currentLobby]);






  return (
    <>
      <DiceMachine
        playerOnTurn={currentPLayer?.id === lobbyForGame!.playerList[lobbyForGame!.playerOnTurn].id}
      ></DiceMachine>
      <p className="text-center text-s"> Player on Turn {lobbyList.find((lobby)=>lobby.id===currentLobby?.id)?.playerOnTurn}</p>
      <MultiPlayerScoreBoard></MultiPlayerScoreBoard>
    </>
  );
}
