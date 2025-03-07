import { toast } from "react-toastify";

export const getRandomNumber = () => {
  return Math.floor(Math.random() * 6 + 1);
};

export function sendToast(message: string, timeInMs: number) {
  toast(message, {
    position: "top-center",
    autoClose: timeInMs,
    hideProgressBar: timeInMs > 1000 ? false : true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    toastId: "1",
  });
}
