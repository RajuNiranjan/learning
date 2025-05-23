import React from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "./ui-global/Footer";
import { Header } from "./ui-global/Header";

export const App = () => {
  return (
    <>
      <Header />
      <main className="min-h-[80vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
