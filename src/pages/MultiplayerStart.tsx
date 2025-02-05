import React, { useEffect, useState } from "react";
import Lobby from "../components/Lobby";
import { useMultiplayerStore } from "../store/MultiplayerStore";
import { useNavigate } from "react-router-dom";

import {
  LobbyType,
  connectToBackend,
  disconnectFromBackend,
  createLobby,
  joinLobby,
  leaveLobby,
  startGame,
  sendLobbyUpdate,
  fetchLobbies,
  Player,
  sendPlayerReadyUpdate,
} from "../api/multiplayerAPI";
import { createIDString, sendToast } from "../utils/utils";

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

    connectToBackend((message: any) => {
      console.log("Message received:", message);
      if (Array.isArray(message)) {
        console.log("setNewLobbyList because message is Array");
        setNewLobbyList([...message]);
      } else if (message.type === "startGame") {
        navigate("/multiplayerGame");
      } else {
        setCurrentLobby({ ...message });
      }
    });

    return () => {
      disconnectFromBackend();
    };
  }, [setNewLobbyList, setCurrentLobby, navigate]);

  const handleCreateLobby = () => {
    if (!currentPLayer) {
      sendToast("Please create a player first", 1000);
      return;
    }

    const newLobby: LobbyType = {
      id: createIDString(),
      playerList: [currentPLayer],
      playerOnTurn: 0, // Initialisiere playerOnTurn mit 0
    };
    setCurrentLobby(newLobby);
    createLobby(newLobby);
  };

  const handleJoinLobby = (lobbyIdToJoin: string) => {
    if (currentPLayer) {
      const index = lobbyList.findIndex((lobby) => lobby.id === lobbyIdToJoin);
      if (index !== -1) {
        joinLobby(currentPLayer, lobbyList[index]);
        setCurrentLobby({ ...lobbyList[index] });
      } else {
        console.error(`Lobby with id ${lobbyIdToJoin} not found`);
      }
    } else {
      sendToast("Please create a player first", 1000);
    }
  };

  const handleStartGame = (lobbyToStartId: string) => {
    setCurrentLobby(lobbyList.find((lobby) => lobby.id === lobbyToStartId));
    startGame(lobbyToStartId);
  };

  const handleIsReady = (LobbyIdToUpdate: string, toSet: boolean) => {
    if (currentPLayer) {
      sendPlayerReadyUpdate(LobbyIdToUpdate, currentPLayer.id, toSet);
      const tempPlayer: Player = {
        id: currentPLayer.id,
        name: currentPLayer.name,
        scoreBoard: currentPLayer.scoreBoard,
        isReady: toSet,
      };

      const index = lobbyList.findIndex(
        (lobby) => lobby.id === LobbyIdToUpdate,
      );

      if (index !== -1) {
        const updatedLobby = { ...lobbyList[index] };
        updatedLobby.playerList = updatedLobby.playerList.map((player) =>
          player.id === currentPLayer.id ? tempPlayer : player,
        );
        console.log("current player ready before set " + currentPLayer.isReady);
        setCurrentPlayer(tempPlayer);
        console.log("current player ready after set " + currentPLayer.isReady);
      } else {
        console.error(`Lobby with id ${LobbyIdToUpdate} not found`);
      }
    }
  };

  const handleLeaveLobby = (lobbyToLeave: LobbyType) => {
    if (currentLobby && currentPLayer) {
      leaveLobby(currentPLayer.id, lobbyToLeave);
      sendLobbyUpdate(lobbyToLeave);
      setCurrentLobby(undefined);
    }
  };

  const handleCreatePlayer = () => {
    const player: Player = {
      id: createIDString(),
      name: nameInput,
      scoreBoard: new Map<string, number>(),
      isReady: false,
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
            <h3 className="col-start-2 m-auto">
              Player: {currentPLayer.name} id: {currentPLayer.id} ready:{" "}
              {currentPLayer.isReady ? "ready" : "notReady"}
            </h3>

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
            <Lobby
              handleStartGame={handleStartGame}
              key={lobby.id}
              onReadyClick={handleIsReady}
              onJoinClick={handleJoinLobby}
              onLeaveClick={handleLeaveLobby}
              lobbyId={lobby.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Multiplayer;
