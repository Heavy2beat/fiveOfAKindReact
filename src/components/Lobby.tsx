import { useMultiplayerStore } from "../store/MultiplayerStore";
import { LobbyType, Player } from "../api/multiplayerAPI";
import { span } from "motion/react-client";

interface LobbyProps {
  lobby: LobbyType;
  currentPlayer: Player;
  onReadyClick: (toSet: boolean) => void;
  onLeaveClick: (lobbyToLeave: LobbyType) => void;
  onJoinClick: (lobbyToJoin: LobbyType) => void;
}

export default function Lobby(props: LobbyProps) {
  const { currentPLayer, currentLobby } = useMultiplayerStore();

  const createLobbyHead = () => {
    if (
      props.lobby.id === currentLobby?.id &&
      props.lobby.playerList.length > 1
    ) {
      return (
        <button
          onClick={() => props.onReadyClick(!currentPLayer?.isReady)}
          className="w-18 cursor-pointer rounded bg-green-500 p-2"
        >
          Ready
        </button>
      );
    } else if (
      props.lobby.id === currentLobby?.id &&
      props.lobby.playerList.length === 1
    ) {
      return (
        <button className="w-18 cursor-pointer rounded bg-green-500 p-2">
          Waiting
        </button>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <div className="h-44 w-56 rounded-xl bg-blue-300">
        <div className="flex justify-between rounded-t bg-blue-500 p-2">
          <div>{createLobbyHead()}</div>
          {currentLobby?.id === props.lobby.id ? (
            <button
              onClick={() => props.onLeaveClick(props.lobby)}
              className="w-18 cursor-pointer rounded bg-red-400 p-2"
            >
              Leave
            </button>
          ) : (
            <button
              onClick={() => props.onJoinClick(props.lobby)}
              className="w-18 cursor-pointer rounded bg-green-500 p-2"
            >
              Join
            </button>
          )}
        </div>

        <div>
          {props.lobby.playerList.map((player) => (
            <div className="grid grid-cols-2">
              <h5
                key={player.id}
                className={
                  currentPLayer?.id === player.id
                    ? "bg-blue-400 text-center font-bold"
                    : "bg-blue-400 text-center"
                }
              >
                {player.name}{" "}
              </h5>{" "}
              {player.isReady ? (
                <span className="bg-blue-400 text-end">✅ </span>
              ) : (
                <span className="bg-blue-400 text-end">❌</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
