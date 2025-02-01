import { useState } from "react";
import Footer from "./Footer";
import { LobbyType, useMultiplayerStore } from "../store/MultiplayerStore";



interface LobbyProps{
   currentLobby:LobbyType,
   onLeaveClick: ()=>void,
   onJoinClick: (lobbyToJoin:LobbyType)=>void,
}

export default function Lobby(props:LobbyProps) {

  const [inputName, setInputName] = useState("");
  const {currentPLayer, currentLobby} =useMultiplayerStore();
 



  
  return (
    <>
      <div className="h-44 w-56 rounded-xl bg-blue-300">
        <div className="flex justify-around p-2 bg-blue-500 rounded-t">
            <div>
                
            </div>
            <input type="text" className="w-2/3 rounded" value={inputName} onChange={(e)=>setInputName(e.target.value)}/>
         {currentLobby === props.currentLobby ? <button onClick={()=>props.onLeaveClick()} className="w-18 bg-red-400 p-2 cursor-pointer  rounded">Leave</button>
         
          : <button onClick={()=>props.onJoinClick(props.currentLobby)}  className="w-18 bg-green-500 p-2 cursor-pointer rounded">Join</button> }
        </div>

        <div >
          {props.currentLobby.playerList.map((player) => (
            <h5 className={player===currentPLayer? "bg-green-400  text-center" :"bg-blue-400 text-center" } >{player.name}</h5>
          ))}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
