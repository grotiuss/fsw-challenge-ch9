import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
//Untuk router ProfilePage
import ProfilePage from './pages/ProfilePage';
import ProfileList from './pages/ProfileList'

import LandingPage from './pages/LandingPage'

import ForgotPass from './pages/ForgotPass'

//Playing Game
import PlayGame from './pages/PlayGame'
// === Ini untuk percobaan connect form ke API ===
import RegisterTest from './pages/RegisterTest'
import FetchDataTest from './pages/FetchDataTest'
// ===============================================

/**
 * Untuk halaman Register dan Login-nya silahkan dibuat baru lagi saja.
 * Format file nya harap mengikuti yang sudah ada ya :D
 */

import Navbars from './pages/partials/Navbar'
import LoadingAnimation from './pages/Components/LoadingAnimation_1'

import { AuthProvider } from './auth/Auth'
import PrivateRoute from './auth/PrivateRoute'

// const userToken = localStorage.getItem("token")

class LoadingLayer extends React.Component {
  render() {
    return(
      <div  className='dark-layer'>
        <LoadingAnimation />
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userSession: {
        id: null,
        username: null,
        asAdmin: false,
      },
      userToken: localStorage.token,
      isLoading: true
    }
  }

  componentDidMount() {
    const userToken = this.state.userToken
    this.getUserSession(userToken)
  }

  getUserSession = async(userToken = null) => {
    if(userToken) {
      const opts = {
        method: "POST",
        headers: {
          "Authorization": userToken,
          "Content-Type": "application/json"
        }
      }
      fetch("https://myfirst-api-101.herokuapp.com/login/jwt-test", opts)
        .then((response) => response.json())
        .then((result) => {
          this.setState({
            userSession : {
              id: result.id,
              username: result.username,
              asAdmin: result.asAdmin
            },
            isLoading: false
          })
        })
    } else {
      this.setState({
        isLoading: false
      })
    }
  }

  get Loader () {
    return (
      <>
        <LoadingLayer />
      </>
    )
  }

  get Content () {
    const currentUser = this.state.userSession
    console.log('username (app): ' + this.state.userSession.username)
    console.log('token (app): ' + this.state.userToken)
    return (
      <>
        <AuthProvider>
          <Navbars userSession={currentUser} />
          <Router>
            <Switch>

              <PrivateRoute exact path="/play/rps" component={PlayGame} />
              <PrivateRoute exact path="/profile" component={ProfilePage} />

              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/forgot-password" component={ForgotPass} />
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/profile-list" component={ProfileList} />
              <Route exact path="/landing" component={LandingPage} />

              {/* === Keperluan test API === */}
                <Route path="/navbar-test" component={Navbars} />
                <Route path="/register-test" component={RegisterTest} />
                <Route path="/fetch-test" component={FetchDataTest} />
              {/* ========================== */}

            </Switch>
          </Router>
        </AuthProvider>
      </>
    )
  }

  render() {
    return(
      <body>
        {this.state.isLoading ? this.Loader : this.Content}
      </body>
    )
  }
}

export default App
