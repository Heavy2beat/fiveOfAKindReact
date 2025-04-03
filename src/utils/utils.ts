import { toast } from "react-toastify";
export const getRandomNumber = (): Promise<number> => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      new URL("./randomNumberWorker.js", import.meta.url),
    );
    worker.onmessage = function (e) {
      if (e.data.error) {
        reject(new Error(e.data.error));
      } else {
        resolve(e.data as number);
      }
      worker.terminate();
    };
    worker.onerror = function (e) {
      reject(
        new Error(`Worker error: ${e.message} (${e.filename}:${e.lineno})`),
      );
      worker.terminate();
    };
    worker.postMessage({});
  });
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
