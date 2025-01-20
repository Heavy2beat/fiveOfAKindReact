export default function Header() {
  return (
    <>
      <div className="flex h-10 items-center justify-center bg-blue-400 md:hidden">
        <h1>5 OF A KIND</h1>
      </div>
      <img
        className="m-auto hidden w-1/2 rounded-xl object-cover p-2 md:flex md:h-48"
        src="longbanner.png"
        alt=""
      />
    </>
  );
}
