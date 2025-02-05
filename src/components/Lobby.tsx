import { useMultiplayerStore } from "../store/MultiplayerStore";
import { LobbyType, Player } from "../api/multiplayerAPI";
import { useEffect, useState } from "react";

interface LobbyProps {
  lobbyId: string;
  onReadyClick: (lobbyId: string, toSet: boolean) => void;
  onLeaveClick: (lobbyToLeave: LobbyType) => void;
  onJoinClick: (lobbyIdToJoin: string) => void;
  handleStartGame: (lobbyId: string) => void;
}

export default function Lobby(props: LobbyProps) {
  const { currentPLayer, currentLobby, lobbyList } = useMultiplayerStore();

  const [thisLobby, setThisLobby] = useState<LobbyType | undefined>(
    lobbyList.find((lobby) => lobby.id === props.lobbyId),
  );

  useEffect(() => {
    const tempLobby = lobbyList.find((lobby) => lobby.id === props.lobbyId);
    setThisLobby(tempLobby);
  }, [lobbyList, props.lobbyId]);

  const createLobbyHead = () => {
    if (!thisLobby) return null;

    let areAllReady = false;
    let readyPlayers = 0;
    for (const player of thisLobby.playerList) {
      if (player.isReady) {
        readyPlayers += 1;
        if (readyPlayers === thisLobby.playerList.length) {
          areAllReady = true;
        }
      }
    }

    if (thisLobby.playerList.length > 1 && areAllReady) {
      return (
        <button
          onClick={() => props.handleStartGame(props.lobbyId)}
          className="w-18 cursor-pointer rounded bg-green-500 p-2"
        >
          Start
        </button>
      );
    } else if (
      props.lobbyId === currentLobby?.id &&
      thisLobby.playerList.length > 1
    ) {
      return (
        <button
          onClick={() =>
            props.onReadyClick(props.lobbyId, !currentPLayer!.isReady)
          }
          className="w-18 cursor-pointer rounded bg-green-500 p-2"
        >
          {currentPLayer?.isReady ? "Unready" : "Ready"}
        </button>
      );
    } else if (
      props.lobbyId === currentLobby?.id &&
      thisLobby.playerList.length === 1
    ) {
      return (
        <button className="w-18 cursor-pointer rounded bg-green-500 p-2">
          Waiting
        </button>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="h-44 w-56 rounded-xl bg-blue-300">
      <div className="flex justify-between rounded-t bg-blue-500 p-2">
        <div>{createLobbyHead()}</div>
        {currentLobby?.id === props.lobbyId ? (
          <button
            onClick={() => props.onLeaveClick(thisLobby!)}
            className="w-18 cursor-pointer rounded bg-red-400 p-2"
          >
            Leave
          </button>
        ) : (
          <button
            onClick={() => props.onJoinClick(props.lobbyId)}
            className="w-18 cursor-pointer rounded bg-green-500 p-2"
          >
            Join
          </button>
        )}
      </div>

      <div>
        <div className="grid grid-cols-2 bg-blue-400 text-sm">
          <span className="text-center">Name</span>
          <span className="px-1 text-end">Ready</span>
        </div>
        {thisLobby?.playerList.map((playerInLobby: Player) => (
          <div key={playerInLobby.id} className="grid grid-cols-2">
            <h5
              className={
                currentPLayer?.id === playerInLobby.id
                  ? "bg-blue-400 text-center font-bold"
                  : "bg-blue-400 text-center"
              }
            >
              {playerInLobby.name} 
            </h5>
            {playerInLobby.isReady ? (
              <span className="bg-blue-400 px-1 text-end">✅</span>
            ) : (
              <span className="bg-blue-400 px-1 text-end">❌</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
