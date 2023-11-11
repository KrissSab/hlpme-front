import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Telegram from "./components/Telegram";

import Local from "./components/Homepage";
import Global from "./components/Homepage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/tg" element={<Telegram />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
