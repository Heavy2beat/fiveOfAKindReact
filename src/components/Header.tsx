
export default function Header() {

    return (
      <>
        <div className="flex h-10 items-center justify-center bg-blue-400 md:hidden">
          <h1>5 OF A KIND</h1>
        </div>
        <img
          className="m-auto hidden w-full rounded-xl p-2 md:flex md:max-h-80 md:w-1/2 md:max-w-fit"
          src="banner.jpg"
          alt=""
        />
      </>
    )
}