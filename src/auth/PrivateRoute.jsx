import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// // import AuthContext from "../contexts/AuthContext";
// import { AuthContext } from '../contexts/AuthContext';


// const PrivateRoute = ({ element }) => {
//     const { isLoggedIn } = useContext(AuthContext)

//     if (!isLoggedIn) {
//         return <Navigate to="/login" replace />;
//     }

//     return element;
// };

// export default PrivateRouteimport { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({ element }) => {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default PrivateRoute;
