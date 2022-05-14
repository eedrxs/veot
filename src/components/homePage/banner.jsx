import React from "react";

const Banner = () => {
  return (
    <div
      id="banner"
      className="row-span-1 relative bg-banner bg-cover bg-homebannerpos md:bg-homebannerpos-md"
    >
      <div className="absolute bottom-8 right-8 text-right text-white">
        <p className="text-4xl md:text-5xl font-bold">2434</p>
        <p className="text-sm md:text-base">polls created</p>
      </div>
    </div>
  );
};

export default Banner;
