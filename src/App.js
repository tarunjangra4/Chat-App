import logo from "./logo.svg";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currUser } = useContext(AuthContext);
  console.log(currUser);

  const ProtectedRout = ({ children }) => {
    if (!currUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          {/* <Route path="" element={currUser ? <Home /> : <Login />} /> */}
          <Route
            path=""
            element={
              <ProtectedRout>
                <Home />
              </ProtectedRout>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
