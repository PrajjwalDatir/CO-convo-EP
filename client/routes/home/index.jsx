import React from "react";
import HomeActionButtons from "./HomeActionButtons";
import Logo from "#/icons/Logo.svg";
import dottedImage from "#/assets/images/300.png";

const dottedBackground = {
  backgroundImage: `url(${dottedImage})`,
};

function Home() {
  return (
    <div className="relative mb-24">
      <div className="absolute z-0 w-32 mt-64 h-64" style={dottedBackground} />
      <div
        className="absolute z-0 w-8 mt-16 h-screen right-0"
        style={dottedBackground}
      />
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-wrap justify-center lg:pt-24">
          <div className="lg:w-1/2 mt-16 flex flex-col items-center lg:items-start">
            <h1 className="font-extrabold text-5xl leading-tight font-display text-center lg:text-left">
              CO {" "}
              <span className="text-blue-700">convo</span>
              {" "} EP
            </h1>
            <p className="text-black-700 text-xl mt-2 text-center lg:text-left">
              ChatApp for Colleges.
            </p>
            <nav className="mt-6 whitespace-no-wrap">
              <HomeActionButtons />
            </nav>
          </div>
          <div className="lg:w-1/2 mt-12">
            <img
              alt="CO convo EP logo"
              src={Logo}
              className="px-8 md:px-24 lg:px-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
