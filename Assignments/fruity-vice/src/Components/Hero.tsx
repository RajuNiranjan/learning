import Image from "next/image";
import React from "react";

export const HeroSection = () => {
  return (
    <section className="w-full h-screen bg-white flex">
      <div className="w-[50%] h-full flex justify-center items-center  px-[3rem] pb-[1.75rem]">
        <div className="w-[794.4px]  flex flex-col   px-[3rem]">
          <h1 className="text-[3.5rem] leading-[1.2] font-[300] tracking-[-0.05em] my-[2rem] text-black">
            Fruityvice
          </h1>
          <p className="text-[1.35rem]  mb-[2rem] font-[300] text-black">
            A powerful webservice which provides data for all kinds of fruit!
            You can use Fruityvice to find out interesting information about
            fruit and educate yourself. The webservice is completely free to use
            and contribute to.
          </p>
          <a
            href="#1"
            className="h-[3.5rem] w-[13.5rem]  bg-transparent rounded-full border border-gray-300 flex justify-center items-center text-sm tracking-widest hover:border-sky-300 hover:text-sky-300 transition-all duration-300 font-[300]"
          >
            GET STARTED
          </a>
        </div>
      </div>
      <div className="w-[50%] h-full bg-[#00000040]">
        <Image
          src="https://fruityvice.com/images/cherry.png"
          alt="hero"
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};
