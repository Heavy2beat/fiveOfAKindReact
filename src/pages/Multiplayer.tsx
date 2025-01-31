import Lobby from "../components/Lobby";

export default function Multiplayer() {


    return (
        <>
        <div className="p-4 bg-slate-300">
            <h1 className="text-2xl text-center p-2">Multiplayer</h1>
            <div className="flex justify-center gap-2">
                <Lobby></Lobby>
                
            </div>

        </div>
        
        </>
    )
}
