import React, { useContext } from "react";
import { Route, Redirect} from "react-router-dom";
// import { AuthContext } from "./Auth";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  // const {currentUser} = useContext(AuthContext);
  const currentUser = localStorage.getItem("token")
  return (
    <Route {...rest}
        render={
          routeProps => !!currentUser ? (<RouteComponent {...routeProps} />) : (<Redirect replace to={"/login"} />)
        }
    />
  );
};


export default PrivateRoute