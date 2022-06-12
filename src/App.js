import './App.css';
import StickyFooter from './components/StickyFooter';
import Dashboard from "./dashboard/Dashboard";
import SignIn from "./user/SignIn";
import SignUp from "./user/SignUp";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {Private} from "./components/Private";
import SignOut from "./user/SignOut";
import DetailProfile from "./user/DetailProfile"
import CreateQuiz from "./quizzes/CreateQuiz";
import QuizRoom from "./quizzes/QuizRoom";

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/dashboard" element={<Private Component={Dashboard}/>}/>
              <Route path="/profile" element={<Private Component={DetailProfile}/>}/>
              <Route path="/quiz/create" element={<Private Component={CreateQuiz}/>}/>
              <Route path="/quiz/:slug" element={<Private Component={QuizRoom}/>}/>
              <Route path="/signin" element={<SignIn/>}/>
              <Route path="/signup" element={<SignUp/>}/>
              <Route path="/signout" element={<SignOut/>}/>
              <Route path="*" element={<Navigate to="/dashboard" replace/>}/>
          </Routes>
          <StickyFooter />
      </BrowserRouter>
  );
}

export default App;