import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Pokedex from "./pages/Pokedex";
import Contact from "./pages/Contact";


function App() {
  const location = useLocation();
  return (
    <div className="App">
      <Header />
      <Routes location={location} >
        <Route path="/" element={<Home />} />
        <Route path="/pages/pokedex" element={<Pokedex />} />
        <Route path="/pages/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
