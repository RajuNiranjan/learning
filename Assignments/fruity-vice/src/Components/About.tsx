import Image from "next/image";
import React from "react";

export const AboutSection = () => {
  return (
    <section id="1" className="w-full h-[55vh] bg-white flex">
      <div className="w-[30%] h-full bg-[#00000040]">
        <Image
          src="https://fruityvice.com/images/watermelon.png"
          alt="hero"
          width={500}
          height={500}
          className=" object-cover"
        />
      </div>
      <div className="w-[70%] h-full flex justify-center items-center pt-[3.75rem] px-[3rem] pb-[1.75rem] ml-[3rem] ">
        <div className="h-[400px]  flex flex-col">
          <h1 className="text-[2.5rem] leading-[1.2] font-[300] tracking-[-0.05em] my-[2rem] text-black ">
            What functions does it provide?
          </h1>
          <p className="text-[1.2rem] w-[90%]  mb-[2rem] font-[300] text-black">
            With Fruityvice you can receive interesting data from any fruit of
            your choosing. On top of that you can add fruits by yourself as
            well! Added fruits will first have to be approved by an admin to
            avoid any errors in the data. The shown data is based on 100 grams
            of the listed fruit. The owner does not guarantee the available data
            is 100% flawless, however he will do his best to fix any wrong data.
          </p>
          <a
            href="#2"
            className="w-[10rem] h-[3rem] bg-transparent rounded-full border border-gray-300 flex justify-center items-center text-sm tracking-widest hover:border-sky-300 hover:text-sky-300 transition-all duration-300 font-[300]"
          >
            LEARN MORE
          </a>
        </div>
      </div>
    </section>
  );
};
