import { useMultiplayerStore } from "../../store/MultiplayerStore";

import PlayerScoreBoardMP from "./PlayerScoreBoardMP";

export default function MultiPlayerScoreBoard() {
  const { currentLobby } = useMultiplayerStore();

  return (
    <>
      <div id="test" className="flex-row justify-center md:flex md:w-full">
        {currentLobby !== undefined
          ? currentLobby.playerList.map((player) => (
              <PlayerScoreBoardMP
                player={player}
                key={player.id}
              ></PlayerScoreBoardMP>
            ))
          : null}
      </div>
    </>
  );
}
