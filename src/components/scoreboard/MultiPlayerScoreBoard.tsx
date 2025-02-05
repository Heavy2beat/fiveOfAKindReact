import React, { useEffect, useState } from "react";
import { useMultiplayerStore } from "../../store/MultiplayerStore";
import PlayerScoreBoardMP from "./PlayerScoreBoardMP";
import { motion } from "framer-motion";
import { LobbyType } from "../../api/multiplayerAPI";

const MultiPlayerScoreBoard: React.FC = () => {
  const { currentLobby, lobbyList } = useMultiplayerStore();
  const [lobbyForGame, setLobbyForGame] = useState<LobbyType | undefined>(
    currentLobby!,
  );
  const [playerBoards, setPlayerBoards] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (lobbyList !== undefined) {
      setLobbyForGame(
        lobbyList.find((lobby: LobbyType) => lobby.id === currentLobby!.id),
      );
    }
  }, [lobbyList, currentLobby]);

  useEffect(() => {
    if (lobbyForGame) {
      const orderedPlayerList = [
        ...lobbyForGame.playerList.slice(lobbyForGame.playerOnTurn),
        ...lobbyForGame.playerList.slice(0, lobbyForGame.playerOnTurn),
      ];

      const boards = orderedPlayerList.map((player, index) => (
        <motion.div
          key={player.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: index === 0 ? 1 : 0.5 }}
        >
          <PlayerScoreBoardMP player={player} />
        </motion.div>
      ));
      setPlayerBoards(boards);
    }
  }, [lobbyForGame]);

  return (
    <div id="test" className="flex-row justify-center md:flex md:w-full">
      {playerBoards}
    </div>
  );
};

export default MultiPlayerScoreBoard;
