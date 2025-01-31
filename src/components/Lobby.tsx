import { useState } from "react";
import Footer from "./Footer";

export default function Lobby() {
  const [playersInLobby, setPlayersInLobby] = useState(["Peter", "Marianne"]);
  const [inputName, setInputName] = useState("");
 
const[currentPLayerName, setCurrentPlayerName] = useState("")


const joinLobby =()=>{
    if (inputName !=="" && playersInLobby.length <=3){
const temp = playersInLobby;
temp.push(inputName);
setCurrentPlayerName(inputName);
    }
}

const leaveLobby =()=>{
const temp = playersInLobby;
for (let player in temp){
    if(player==currentPLayerName){
        player ="";
    }
}
const newPlayerList = [];
temp.forEach((player)=>{if (player!=="") newPlayerList.push(player)})
setCurrentPlayerName("");
setPlayersInLobby(temp)
    }


  
  return (
    <>
      <div className="h-44 w-56 rounded-xl bg-blue-300">
        <div className="flex justify-around p-2 bg-blue-500 rounded-t">
            <div>
                
            </div>
            <input type="text" className="w-2/3 rounded" value={inputName} onChange={(e)=>setInputName(e.target.value)}/>
         {currentPLayerName ==="" ? 
         <button onClick={joinLobby} className="w-18 bg-green-500 p-2 cursor-pointer rounded">Join</button>
          : <button onClick={leaveLobby} className="w-18 bg-red-400 p-2 cursor-pointer  rounded">Leave</button> }
        </div>

        <div >
          {playersInLobby.map((player,index) => (
            <h5 className={index %2 ==0? "bg-blue-300 text-center": "bg-blue-400 text-center"}>{player}</h5>
          ))}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
