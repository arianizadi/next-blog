export function Hero() {
  return (
    <main>
      <div className="flex flex-col justify-center items-center pt-10 text-center">
        <img className='top-[30%] brightness-75 left-[60%] absolute h-[100px] md:h-[250px]' id='astro' src="/astro.webp" alt='astronaut model'></img>
        <img className='top-[20%] brightness-75 left-[15%] absolute h-[150px] md:h-[300px]' id='sat' src="/sat.webp" alt='astronaut model'></img>
        <h1 className="font-bold text-6xl">Arian Izadi</h1>
        <h2 className="pt-3 font-bold text-2xl">Software Engineering & Cyber Security</h2>
      </div>
    </main >

  );
}