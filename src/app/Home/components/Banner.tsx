import React from "react";

const Banner = () => {
  return (
        <section
          className=" relative bg-cover bg-center"
          style={{ backgroundImage: "url('/Website Background/bannerbackground.jpg')" }}
        >
          {/* Transparent Dark Overlay */}
          <div className="absolute inset-0 bg-black opacity-70"></div>

          <div className="relative z-10 container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
            {/* Left Side Image */}
            <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
              <img
                src="/Website Background/Picture44444.png"
                alt="Anime Character"
                className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
              />
            </div>

            {/* Right Side Content */}
            <div className="relative flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
              <h1 className="text-5xl font-bold leading-none sm:text-6xl text-white">
                Anime-Hoodies
                <span className="text-white font-bold"> Upto 50% off </span>
              </h1>
              <p className="mt-6 mb-8 text-lg font-bold sm:mb-12 text-white">
                Drip Check! Anime Hoodies Now at 50% Off
                <br className="hidden md:inline font-bold" /> Stay Bold, Stay Cozy!
              </p>
              <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="px-8 py-3 text-lg font-semibold border rounded bg-purple-600 text-white shadow-lg hover:bg-purple-500 hover:text-white"
                >
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </section>
  );
};

export default Banner;
