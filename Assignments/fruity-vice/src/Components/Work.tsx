import Image from "next/image";
import React from "react";

export const WorkSection = () => {
  return (
    <section
      id="2"
      className="w-full h-[60vh] bg-white flex border-b border-gray-200"
    >
      <div className="w-[70%] h-full flex justify-center items-center pt-[3.75rem] px-[3rem] pb-[1.75rem] ml-[3rem] ">
        <div className="h-[400px]  flex flex-col">
          <h1 className="text-[2.5rem] leading-[1.2] font-[300] tracking-[-0.05em] my-[2rem] text-black ">
            How does it work?
          </h1>
          <p className="text-[1.025rem] tracking-wide w-[80%]  mb-[2rem] font-[300] text-black">
            Currently the webservice consists of two functions: receiving data
            for a specific fruit or all fruit, and a function to add your own
            data. An example of what the response body would look like can be
            seen on the right. To receive the shown data, you have to make a
            <b>HTTP GET</b> call on the resource <b>/api/fruit/{"{ID}"}</b> or
            <b>
              /api/fruit/
              {"  {name}"}
            </b>
            of this website&apos;s IP. To add data, make a <b>HTTP PUT</b> call
            on the resource <b>/api/fruit</b> with the data of a fruit in JSON
            format in the request body. An ID does not have to be provided. A
            full documentation for the REST API can be found <br />
            <a
              href="#3"
              className="hover:text-sky-400 underline hover:underline-offset-0"
            >
              here.
            </a>
          </p>
          <a
            href="#3"
            className="w-max h-[3rem] px-[2rem] bg-transparent rounded-full border border-gray-300 flex justify-center items-center text-sm tracking-widest hover:border-sky-300 hover:text-sky-300 transition-all duration-300 font-[300]"
          >
            TRY IT!
          </a>
        </div>
      </div>
      <div className="w-[30%] h-full bg-[#FFFFFF]">
        <Image
          src="https://fruityvice.com/images/apiexample.png"
          alt="hero"
          width={500}
          height={500}
          className="h-full w-full object-contain"
        />
      </div>
    </section>
  );
};
