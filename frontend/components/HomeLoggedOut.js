export default function HomeLoggedOut() {
  return (
    <div className="h-[85vh] flex flex-col justify-center items-center font-ailerons">
      <h1 className="text-8xl">Welcome to E-ZDRAVLJE</h1>
      <h3 className="text-2xl">A universal health records platform</h3>
      <div className="border-double border-4 border-black rounded-md mt-[20vh] text-2xl animate-bounce">
        Log in to continue...
      </div>
    </div>
  )
}
