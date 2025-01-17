import { toast } from "react-toastify";

export const getRandomNumber =  () =>{
    return  Math.floor(Math.random() * 6 + 1);
}

export function sendToast  (message:string, timeInMs:number) {
    toast(message, {
        position: "top-center",
        autoClose: timeInMs,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
  } 
