import React, { useEffect, useState } from "react";
import { useMultiplayerStore } from "../../store/MultiplayerStore";
import PlayerScoreBoardMP from "./PlayerScoreBoardMP";
import { motion } from "framer-motion";

const MultiPlayerScoreBoard: React.FC = () => {
  const { currentLobby, lobbyList, setCurrentLobby } = useMultiplayerStore();
  const [playerBoards, setPlayerBoards] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (currentLobby) {
      const tempLobby = lobbyList.find((lobby) => lobby.id === currentLobby.id);
      if (tempLobby && tempLobby !== currentLobby) {
        setCurrentLobby(tempLobby);
      }
    }
  }, [currentLobby, lobbyList, setCurrentLobby]);

  useEffect(() => {
    if (currentLobby) {
      const orderedPlayerList = [
        ...currentLobby.playerList.slice(currentLobby.playerOnTurn),
        ...currentLobby.playerList.slice(0, currentLobby.playerOnTurn),
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
  }, [currentLobby]);

  return (
    <div id="test" className="flex-row justify-center md:flex md:w-full">
      {playerBoards}
    </div>
  );
};

export default MultiPlayerScoreBoard;
