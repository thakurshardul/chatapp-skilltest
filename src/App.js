import { Home, SignIn, SignUp, Profile, NotFound } from "./pages/index";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./assets/stylesheet/style.scss";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";

function App() {
  // current user details through useContext
  const { currentUser } = useContext(AuthContext);

  // protected route for not logged users
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to={"/login"} />;
    }
    return children;
  };


  return (
    <div className="App">
      <BrowserRouter basename="/Coding_Ninjas_React_Skill_Test-3_ChatApp_ChatVerse">
        <ToastContainer/>
        <Routes>
          {/* Define the main route with a component or element */}
          <Route path="/" element={<Navigate to="/home" />} />

          {/* Define your other nested routes here */}
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="login" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

