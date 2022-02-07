import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home'
//Untuk router loginPage
import LoginPage from './pages/loginPage'


// === Ini untuk percobaan connect form ke API === 
  import RegisterTest from './pages/RegisterTest'
// ===============================================
/**
 * Untuk halaman Register dan Login-nya silahkan dibuat baru lagi saja.
 * Format file nya harap mengikuti yang sudah ada ya :D
 */

import Navbars from './pages/partials/Navbar'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />

        {/* === Keperluan test API === */}
          <Route exact path="/navbar-test" element={<Navbars />}></Route>
          <Route exact path="/register-test" element={<RegisterTest />} />
        {/* ========================== */}
        <Route exact path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
