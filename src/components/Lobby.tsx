import { useMultiplayerStore } from "../store/MultiplayerStore";
import { LobbyType } from "../api/multiplayerAPI";

interface LobbyProps {
  lobby: LobbyType;
  onStartClick: (lobbyToStart: LobbyType) => void;
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
          onClick={() => props.onStartClick(props.lobby)}
          className="w-18 cursor-pointer rounded bg-green-500 p-2"
        >
          Start
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
            <h5
              key={player.id}
              className={
                player === currentPLayer
                  ? "bg-green-400 text-center"
                  : "bg-blue-400 text-center"
              }
            >
              {player.name}
            </h5>
          ))}
        </div>
      </div>
    </>
  );
}
