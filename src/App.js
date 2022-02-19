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

import { AuthProvider } from './auth/Auth'
import PrivateRoute from './auth/PrivateRoute'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null,
      username: null,
      asAdmin: false
    }
  }

  componentDidMount() {
    if(this.props.token)
      this.getUserSession()
  }

  getUserSession = () => {
    const opts = {
      method: "POST",
      headers: {
        "Authorization": this.props.token,
        "Content-Type": "application/json"
      }
    }
    fetch("https://myfirst-api-101.herokuapp.com/login/jwt-test", opts)
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          id: result.id,
          username: result.username,
          asAdmin: result.asAdmin
        })
      })
  }

  render() {
    const currentUser = this.state
    return (
      <body>
        <AuthProvider>
          <Navbars user={currentUser} />
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
      </body>
    )
  }
}

// function App(props) {
//   console.log('token: ' + props.token)
//   return (
//     <body>
//       <AuthProvider>
//         <Navbars />
//         <Router>
//           <Switch>

//             <PrivateRoute exact path="/play/rps" component={PlayGame} />
//             <PrivateRoute exact path="/profile" component={ProfilePage} />



//             <Route exact path="/" component={Home} />
//             <Route exact path="/login" component={LoginPage} />
//             <Route exact path="/forgot-password" component={ForgotPass} />
//             <Route exact path="/register" component={RegisterPage} />
//             <Route exact path="/profile-list" component={ProfileList} />
//             <Route exact path="/landing" component={LandingPage} />

//             {/* === Keperluan test API === */}
//             <Route path="/navbar-test" component={Navbars} />
//             <Route path="/register-test" component={RegisterTest} />
//             <Route path="/fetch-test" component={FetchDataTest} />

//             {/* ========================== */}

//           </Switch>
//         </Router>
//       </AuthProvider>
//     </body>
//   )
// }

export default App
