import React, { useState, useEffect } from "react";
// import { Route, Switch } from "react-router-dom";
import HomePage from "./components/homePage.jsx";

const App = () => {
  return (
    <main className="grid grid-rows-3 h-screen w-screen">
      <div className="row-span-1 bg-red-500"></div>
      <div className="row-span-2 grid grid-cols-7 bg-blue-500">
        <div className="col-span-5 bg-green-500"></div>
        <div className="col-span-2 bg-orange-500"></div>
      </div>
    </main>
  );
};

export default App;
