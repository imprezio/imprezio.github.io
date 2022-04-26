import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      console.log("TEST");
    };
    fetchData();
  });
  return <div className="App"></div>;
};

export default App;
