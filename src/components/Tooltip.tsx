
import { useGameStore } from "../store/GameStore"


export default function Tooltip({message,children}) {

  const {isHelpModeOn} = useGameStore();

  if (isHelpModeOn){


    return (
    <div className="group relative flex">
        {children}
        <span className="absolute text-wrap top-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs z-20 text-white group-hover:scale-100">{message}</span>
    </div>
    )
  }else {
    return (
      <div>
        {children}
      </div>
    ) 
  }

}
