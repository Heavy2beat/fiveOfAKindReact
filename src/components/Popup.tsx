interface popupProps {
  setIsVisible: (toset: boolean) => void;
}

export function Popup(props: popupProps) {
  return (
    <div className="absolute m-auto flex h-screen w-screen justify-center">
      <div className="absolute flex h-1/3 w-5/6 flex-col items-center justify-center rounded-2xl bg-slate-500 p-4 shadow-lg">
        <div className="">
          <div className="flex-auto justify-center p-3 text-center">
            <h2 className="py-4 text-xl font-bold text-gray-200">
              Wähle einen Avatar
            </h2>
            <div className="grid grid-cols-4 gap-2">
              <img
                className="cursor-pointer rounded-xl"
                src="/fiveOfAKindReact/one.gif"
                alt=""
              />
              <img
                className="cursor-pointer rounded-xl"
                src="/fiveOfAKindReact/two.gif"
                alt=""
              />
              <img
                className="cursor-pointer rounded-xl"
                src="/fiveOfAKindReact/three.gif"
                alt=""
              />
              <img
                className="cursor-pointer rounded-xl"
                src="/fiveOfAKindReact/four.gif"
                alt=""
              />
            </div>
          </div>
          <div className="mt-2 space-x-1 p-2 text-center md:block">
            <button
              onClick={() => props.setIsVisible(false)}
              className="mb-2 rounded-full border-2 border-gray-600 bg-gray-700 px-5 py-2 text-sm font-medium tracking-wider text-gray-300 shadow-sm transition duration-300 ease-in hover:border-gray-700 hover:bg-gray-800 hover:shadow-lg md:mb-0"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
