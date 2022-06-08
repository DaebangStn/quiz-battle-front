import './App.css';
import StickyFooter from './components/StickyFooter';
import Dashboard from "./dashboard/Dashboard";
import SignIn from "./user/SignIn";
import SignUp from "./user/SignUp";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/signin" element={<SignIn/>}/>
              <Route path="/signup" element={<SignUp/>}/>
              <Route path="*" element={<Navigate to="/dashboard" replace/>}/>
          </Routes>
          <StickyFooter />
      </BrowserRouter>
  );
}

export default App;