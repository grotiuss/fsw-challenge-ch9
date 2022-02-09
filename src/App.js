import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

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
            <Route  path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />

          {/* === Keperluan test API === */}
            <Route  path="/navbar-test" component={Navbars} />
            <Route  path="/register-test" component={RegisterTest} />
          {/* ========================== */}
          
          </Switch>
        </Router>
      </AuthProvider>
    </div>
   
  );
}

export default App;
