import { ReactNode } from 'react';
import { useGameStore } from "../store/GameStore";

interface TooltipProps {
  message: string;
  children: ReactNode;
}

export default function Tooltip({ message, children }: TooltipProps) {
  const { isHelpModeOn } = useGameStore();

  if (isHelpModeOn) {
    return (
      <div className="group relative flex">
        {children}
        <span className="absolute text-wrap bottom-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs z-20 text-white group-hover:scale-100">
          {message}
        </span>
      </div>
    );
  } else {
    return <div>{children}</div>;
  }
}