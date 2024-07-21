import React from 'react';
import { Route, Routes } from "react-router-dom";
import CharactersPage from "./pages/characters";
import CharacterProfile from "./pages/character_profile";

import Navbar from "./components/Navbar";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<CharactersPage />} />
        <Route path="/profile/:id" element={<CharacterProfile />} />
      </Routes>
    </>
  );
};

export default App;
