import { useState } from "react";
import Lobby from "../components/Lobby";
import { LobbyType, Player, useMultiplayerStore } from "../store/MultiplayerStore"
import { sendToast } from "../utils/utils";


export default function Multiplayer() {

    const {lobbyList,setNewLobbyList,setCurrentPlayer,currentPLayer,currentLobby,setCurrentLobby} = useMultiplayerStore();

    const [createLobbyVisible,setCreateLobbyVisible] = useState(false);
    const [nameInput,setNameInput] = useState ("");


    const checkInput =()=>{
        if (nameInput==""){
            sendToast("Input cant be empty",800);
            return false;
        }
        for (const lobby of lobbyList){
            for (const player of lobby ){
                if(player.name ==nameInput){
                    sendToast("Name already used",800);
                    return false;
                }
            }
        }
        return true;
    }

    const leaveLobby = () =>{
        const index = lobbyList.findIndex((lobby)=>lobby===currentLobby);
        const tempLobby = lobbyList[index];
        const tempPlayerlist = tempLobby.playerList.filter((player)=>player!==currentPLayer)
        tempLobby.playerList =tempPlayerlist;
        const templobbyList = lobbyList.filter((lobby)=>lobby!==currentLobby);
        if (tempPlayerlist.length===0){
             setNewLobbyList([...templobbyList])

         }else {
            setNewLobbyList([...templobbyList,tempLobby])
         }
        
        
        setCurrentLobby(undefined);

    }

    const joinLobby = (lobbyToJoin:LobbyType) =>{
        setCurrentLobby(lobbyToJoin);
    }


    const createNewLobby = ()=>{
   if (checkInput()){
        const newPlayer :Player =  {
            id: nameInput,
            name: nameInput,
            scoreBoard: new Map<string,number>, 
        }
        setCurrentPlayer(newPlayer);
        const playerList= [newPlayer];
        const newLobby : LobbyType = {
            id:nameInput,
            playerList: playerList
        }
        setCurrentLobby(newLobby);
        setNewLobbyList([...lobbyList,newLobby]);
    }else {
        return;
    }

    }



    return (
        <>
        <div className="p-4 bg-slate-300">
            <h1 className="text-2xl text-center p-2">Multiplayer</h1>
            <div className="flex justify-center"><button onClick={()=>setCreateLobbyVisible(!createLobbyVisible)} className="m-2 w-44 cursor-pointer rounded bg-blue-400 p-1 shadow-2xl">New Lobby</button></div>
           {createLobbyVisible ? <div className="flex justify-center"> 
            <input onChange={(e)=>setNameInput(e.target.value)} className="m-2 rounded text-center" type="text" placeholder="Name" />
            <button onClick={()=>createNewLobby()} className="m-2 w-44 cursor-pointer rounded bg-blue-400 p-1 shadow-2xl">Create</button>
           </div>: <div> </div>}
           
            <div className="flex justify-center gap-2">
               {lobbyList.map((lobby)=>(<Lobby onJoinClick={joinLobby} onLeaveClick={leaveLobby} currentLobby={lobby}></Lobby>))}
                
            </div>

        </div>
        
        </>
    )
}
