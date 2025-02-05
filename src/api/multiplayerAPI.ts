import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient: Client | null = null;

export function connectToBackend(onMessageReceived: (message: any) => void) {
  const socket = new SockJS('http://localhost:8080/game-websocket');
  stompClient = new Client({
    webSocketFactory: () => socket as WebSocket,
    reconnectDelay: 5000, // Automatischer Wiederverbindungsversuch nach 5 Sekunden
  });

  stompClient.onConnect = (frame) => {
    console.log('Connected: ' + frame);
    stompClient?.subscribe('/topic/lobbies', (message: IMessage) => {
      const parsedMessage = JSON.parse(message.body);
      const transformedMessage = parsedMessage.map((lobby: any) => ({
        ...lobby,
        playerList: lobby.playerList.map((player: any) => ({
          ...player,
          isReady: player.ready,
          scoreBoard: new Map(Object.entries(player.scoreBoard)),
        })),
      }));
      onMessageReceived(transformedMessage);
    });
    stompClient?.subscribe('/topic/startGame', (message: IMessage) => {
      onMessageReceived({ type: 'startGame', lobbyId: message.body });
    });
  };

  stompClient.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
  };

  stompClient.onWebSocketClose = (event) => {
    console.error('WebSocket closed: ', event);
  };

  stompClient.onWebSocketError = (event) => {
    console.error('WebSocket error: ', event);
  };

  stompClient.activate();
}

export function disconnectFromBackend() {
  if (stompClient) {
    stompClient.deactivate();
    stompClient = null;
  }
}

export function sendLobbyUpdate(lobby: LobbyType) {
  if (stompClient) {
    console.log("Sending lobby update:", lobby);
    stompClient.publish({
      destination: "/app/updateLobby",
      body: JSON.stringify(lobby),
    });
  }
}

export function sendPlayerReadyUpdate(lobbyId: string, playerId: string, isReady: boolean) {
  if (stompClient) {
    const update = {
      lobbyId,
      playerId,
      isReady,
    };
    stompClient.publish({
      destination: "/app/updatePlayerReady",
      body: JSON.stringify(update),
    });
  }
}

export function createLobby(lobby: LobbyType) {
  if (stompClient) {
    stompClient.publish({
      destination: "/app/createLobby",
      body: JSON.stringify(lobby),
    });
  }
}

export function joinLobby(player: Player, lobbyToJoin: LobbyType) {
  console.log('joinLobby', player, lobbyToJoin);
  console.log('stompClient', stompClient);
  if (stompClient) {
    stompClient.publish({
      destination: "/app/joinLobby",
      body: JSON.stringify({ player, lobbyId: lobbyToJoin.id }),
    });
  }
}

export function startGame(lobbyId: string) {
  if (stompClient) {
    stompClient.publish({
      destination: "/app/startGame",
      body: JSON.stringify({ lobbyId }),
    });
  }
}

export function changePlayer(lobbyId: string) {
  if (stompClient) {
    stompClient.publish({
      destination: "/app/changePlayer",
      body: JSON.stringify({ lobbyId }),
    });
  }
}

export function leaveLobby(playerId: string, lobby: LobbyType) {
  lobby.playerList = lobby.playerList.filter(player => player.id !== playerId);
  sendLobbyUpdate(lobby);
}

export async function fetchLobbies(): Promise<LobbyType[]> {
  const response = await fetch('http://localhost:8080/api/lobbies');
  if (!response.ok) {
    throw new Error('Failed to fetch lobbies');
  }
  return response.json();
}

export interface Player {
  id: string;
  name: string;
  scoreBoard: Map<string, number>;
  isReady: boolean;
}

export interface LobbyType {
  id: string;
  playerList: Player[];
  playerOnTurn: number;
}