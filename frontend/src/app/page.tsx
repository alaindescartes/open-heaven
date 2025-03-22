import Artists from "./_components/Artists";
import HeroSection from "./_components/HeroSection";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section with Parallax */}
      <div className="relative w-full h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-fixed bg-cover bg-center"
          style={{ backgroundImage: "url('/concert.jpg')" }}
        ></div>
        <div className="relative z-10">
          <HeroSection />
        </div>
      </div>

      {/* Second Section */}
      <div className="relative w-full h-screen flex items-center justify-center bg-white px-6 lg:px-20 mt-10 md:mt-0 mb-14">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl">
          {/* Text Section */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h3 className="text-4xl font-extrabold text-yellow-500 mb-4">
              2025 IS THE YEAR! OUR YEAR OF POSSIBILITIES AND MORE! 🎉
            </h3>
            <h1 className="text-5xl font-bold text-black mb-6">
              COME JOIN US AND LET'S END THIS YEAR WITH A BIG BANG!
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              New to Open Heavens? Get a sneak peek of what's in store for Open
              Heavens 2024, re-live the unforgettable experience of 2024, as we
              step into 2025 you don't want to miss!
            </p>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:cursor-pointer">
              GRAB A FREE TICKET
            </button>
          </div>

          {/* Video Placeholder */}
          <div className="lg:w-1/2 flex justify-center mt-8 lg:mt-0">
            <div className="relative w-[90%] lg:w-[80%] h-60 lg:h-96 rounded-lg overflow-hidden bg-gray-300 flex items-center justify-center shadow-xl">
              <span className="text-gray-700 text-xl">Video Placeholder</span>
            </div>
          </div>
        </div>
      </div>
      {/* artists section */}
      <Artists />
    </div>
  );
}
