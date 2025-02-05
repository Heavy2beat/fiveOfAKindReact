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
  }, [lobbyList]);

  useEffect(() => {
    connectToBackend((message: any) => {
      console.log("Message received:", message);
      if (Array.isArray(message)) {
        setNewLobbyList([...message]);
      } else if (message.type === "startGame") {
        // Handle start game message if needed
      } else if (message.type === "changePlayer") {
        // Handle change player message
        setCurrentLobby({ ...message });
      } else {
        setCurrentLobby({ ...message });
      }
    });

    return () => {
      disconnectFromBackend();
    };
  }, [setNewLobbyList, setCurrentLobby]);

  return (
    <>
      <DiceMachine
        playerOnTurn={currentPLayer?.id === lobbyForGame!.playerList[0].id}
      ></DiceMachine>
      <MultiPlayerScoreBoard></MultiPlayerScoreBoard>
    </>
  );
}
