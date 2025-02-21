import { ReactNode } from "react";
import { useGameStore } from "../store/GameStore";

interface TooltipProps {
  message: string;
  children: ReactNode;

  sendTip?: boolean;
}

export default function Tooltip({ message, children, sendTip }: TooltipProps) {
  const { isHelpModeOn } = useGameStore();

  if (isHelpModeOn || sendTip) {
    return (
      <div className="group relative flex">
        {children}
        <span className="absolute bottom-10 z-20 scale-0 text-wrap rounded bg-gray-800 p-2 text-xs text-white transition-all group-hover:scale-100">
          {message}
        </span>
      </div>
    );
  } else {
    return <div>{children}</div>;
  }
}
