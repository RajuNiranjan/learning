import { AboutSection } from "@/Components/About";
import { FetchingDataSection } from "@/Components/Func";
import { HeroSection } from "@/Components/Hero";
import { WorkSection } from "@/Components/Work";
import React from "react";

const HomeScreen = () => {
  return (
    <div className="h-screen w-full">
      <HeroSection />
      <AboutSection />
      <WorkSection />
      <FetchingDataSection />
    </div>
  );
};

export default HomeScreen;
