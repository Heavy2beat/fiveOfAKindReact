import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient: Client | null = null;

export function connectToBackend(onMessageReceived: (message: any) => void) {
  const socket = new SockJS('http://localhost:8080/game-websocket');
  stompClient = new Client({
    webSocketFactory: () => socket as any
  });

  stompClient.onConnect = (frame) => {
    console.log('Connected: ' + frame);
    stompClient?.subscribe('/topic/lobbies', (message) => {
      onMessageReceived(JSON.parse(message.body));
    });
    stompClient?.subscribe('/topic/startGame', (message) => {
      onMessageReceived({ type: 'startGame', lobbyId: message.body });
    });
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
    stompClient.publish({
      destination: "/app/updateLobby",
      body: JSON.stringify(lobby)
    });
  }
}

export function createLobby(lobby: LobbyType) {
  if (stompClient) {
    stompClient.publish({
      destination: "/app/createLobby",
      body: JSON.stringify(lobby)
    });
  }
}

export function joinLobby(player: Player, lobbyToJoin: LobbyType) {
  console.log('joinLobby', player, lobbyToJoin);
  console.log('stompClient', stompClient);
  if (stompClient) {
    stompClient.publish({
      destination: "/app/joinLobby",
      body: JSON.stringify({ player, lobbyId: lobbyToJoin.id })
    });
  }
}

export function startGame(lobbyId: string) {
  if (stompClient) {
    stompClient.publish({
      destination: "/app/startGame",
      body: JSON.stringify({ lobbyId })
    });
  }
}

export function changePlayer(lobbyId :string, playerId:string) {
    stompClient!.publish({
        destination: "/app/changePlayer",
        body: JSON.stringify({ 'lobbyId': lobbyId, 'playerId': playerId })
    });
}

export function playRound(player: Player, lobby: LobbyType) {
  // Spiellogik für die Runde des Spielers
  const roll = Math.floor(Math.random() * 6) + 1; // Beispiel: Würfeln
  player.scoreBoard.set('currentRound', roll);

  // Aktualisiere die Lobby und sende sie an das Backend
  sendLobbyUpdate(lobby);
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
}