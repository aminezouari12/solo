import "./App.css";
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import People from './components/People';
import Add from "./components/add";


const NavBar = () => {
  return (
    <nav className="navbar">
      
      <ul className="list item">
        <li className="items">
        <Link to="/" className='home-link'>Home</Link>
        </li>
        <li className="items">
          <Link className="add-link" to="/add">Add Person</Link>
        </li>
      </ul>
    </nav>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<People />} />
          <Route path="/add" element={<Add />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
