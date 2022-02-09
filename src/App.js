import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from './pages/Home'

//Untuk router loginPage
import LoginPage from './pages/LoginPage'
// === Ini untuk percobaan connect form ke API === 
  import RegisterTest from './pages/RegisterTest'
// ===============================================
/**
 * Untuk halaman Register dan Login-nya silahkan dibuat baru lagi saja.
 * Format file nya harap mengikuti yang sudah ada ya :D
 */

import Navbars from './pages/partials/Navbar'

import { AuthProvider } from "./auth/Auth";
import PrivateRoute from "./auth/PrivateRoute";

function App() {
  return (

    <div>
      <Navbars />
      <AuthProvider>
        <Router>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />

          {/* === Keperluan test API === */}
            <Route  path="/navbar-test" component={Navbars} />
            <Route  path="/register-test" component={RegisterTest} />
          {/* ========================== */}
          <Route  path="/login" component={LoginPage} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
   
  );
}

export default App;
