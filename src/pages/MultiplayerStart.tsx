import React, { useEffect, useState } from "react";
import Lobby from "../components/Lobby";
import { useMultiplayerStore } from "../store/MultiplayerStore";
import { useNavigate } from "react-router-dom";
import { useLanguageStore } from "../store/LanguageStore";
import {
  LobbyType,
  connectToBackend,
  disconnectFromBackend,
  createLobby,
  Player,
  joinLobby,
  playRound,
  leaveLobby,
  fetchLobbies,
  startGame,
} from "../api/multiplayerAPI";
import { createIDString, sendToast } from "../utils/utils";
import { div } from "motion/react-client";

const Multiplayer: React.FC = () => {
  const {
    lobbyList,
    setNewLobbyList,
    setCurrentPlayer,
    currentPLayer,
    currentLobby,
    setCurrentLobby,
  } = useMultiplayerStore();

  const [createPlayerVisible, setCreatePlayerVisible] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const navigate = useNavigate();
  const { lang } = useLanguageStore();

  useEffect(() => {
    const loadLobbies = async () => {
      try {
        const lobbies = await fetchLobbies();
        setNewLobbyList(lobbies);
      } catch (error) {
        console.error("Failed to fetch lobbies:", error);
      }
    };

    loadLobbies();

    connectToBackend((message) => {
      if (Array.isArray(message)) {
        setNewLobbyList(message);
      } else if (message.type === "startGame") {
        navigate("/multiplayerGame");
      } else {
        setCurrentLobby(message);
      }
    });

    return () => {
      disconnectFromBackend();
    };
  }, [setNewLobbyList, currentLobby, setCurrentLobby]);

  const handleCreateLobby = () => {
    const newLobby: LobbyType = {
      id: createIDString(),
      playerList: [currentPLayer!],
    };
    setCurrentLobby(newLobby);
    createLobby(newLobby);
  };

  const handleJoinLobby = (lobbyToJoin: LobbyType) => {
    if (currentPLayer) {
      joinLobby(currentPLayer, lobbyToJoin);
      setCurrentLobby(lobbyToJoin);
    } else {
      sendToast("Please create a player first", 1000);
    }
  };
  const handleStartGame = () => {
    if (currentLobby) {
      startGame(currentLobby.id);
    }
  };

  const handleLeaveLobby = (lobbyToLeave: LobbyType) => {
    if (currentLobby) {
      leaveLobby(currentPLayer!.id, lobbyToLeave); // Beispiel: Spieler 1 verlässt die Lobby
      setCurrentLobby(undefined);
    }
  };

  const handleCreatePlayer = () => {
    const player: Player = {
      id: createIDString(),
      name: nameInput,
      scoreBoard: new Map<string, number>(),
    };
    setCurrentPlayer(player);
  };

  return (
    <div className="">
      <div className="m-2 grid grid-cols-3 bg-blue-200 p-2 text-center text-3xl lg:m-auto lg:w-2/3">
        <h3 className="col-start-2">Multiplayer</h3>

        <button
          onClick={() => navigate("/")}
          className="col-start-3 w-fit cursor-pointer place-self-end rounded bg-blue-400 p-2 shadow-2xl md:place-self-center"
        >
          <img src="/fiveOfAKindReact/arrow-back.svg" alt="" />
        </button>
      </div>
      <div className="m-2 flex justify-center bg-slate-300">
        {currentPLayer ? (
          <div className="m-2 grid grid-cols-3 bg-blue-200 p-2 text-center text-xl lg:m-auto lg:w-2/3">
            <h3 className="col-start-2 m-auto">Player: {currentPLayer.name}</h3>

            <button
              onClick={() => {
                setCurrentPlayer(undefined);
                if (currentLobby) handleLeaveLobby(currentLobby);
              }}
              className="col-start-3 w-fit cursor-pointer place-self-end rounded bg-blue-400 p-2 shadow-2xl md:place-self-center"
            >
              change
            </button>
          </div>
        ) : (
          <button
            onClick={() => setCreatePlayerVisible(!createPlayerVisible)}
            className="m-2 w-44 cursor-pointer rounded bg-blue-400 p-1 shadow-2xl"
          >
            New Player
          </button>
        )}
      </div>
      {createPlayerVisible ? (
        <div className="flex justify-center">
          <input
            onChange={(e) => setNameInput(e.target.value)}
            className="m-2 rounded text-center"
            type="text"
            placeholder="Name"
          />
          <button
            onClick={() => {
              handleCreatePlayer();
              setCreatePlayerVisible(false);
            }}
            className="m-2 w-44 cursor-pointer rounded bg-blue-400 p-1 shadow-2xl"
          >
            Create
          </button>
        </div>
      ) : (
        <div> </div>
      )}

      <div className="m-2 grid justify-center gap-2 bg-blue-300">
        <h1 className="m-2 text-center text-2xl">Lobbies</h1>
        {currentPLayer ? (
          <button
            onClick={() => handleCreateLobby()}
            className="col-start-3 w-fit cursor-pointer place-self-end rounded bg-blue-400 p-2 shadow-2xl"
          >
            Create Lobby
          </button>
        ) : (
          <button
            onClick={() => sendToast("Please create a player first", 1000)}
            className="col-start-3 w-fit cursor-pointer place-self-end rounded bg-blue-400 p-2 shadow-2xl"
          >
            Create Lobby
          </button>
        )}
        <div className="col-span-3 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          {lobbyList.map((lobby) => (
            <>
              <p key={lobby.id}>{lobby.id}</p>
              <Lobby
                key={lobby.id}
                onStartClick={handleStartGame}
                onJoinClick={handleJoinLobby}
                onLeaveClick={handleLeaveLobby}
                lobby={lobby}
              />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Multiplayer;
