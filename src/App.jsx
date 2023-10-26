import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/Global.scss";
import Home from "./pages/HOME/Home";
import Nav from "./components/NAV/Nav";
import Footer from "./components/FOOTER/Footer";
import Prodact from "./pages/PRODACT/Prodact";

const App = () => {
  return (
    <div className="App">
      <Router >
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Prodact />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
