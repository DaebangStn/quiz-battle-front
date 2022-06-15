import "./App.css";
import StickyFooter from "./components/StickyFooter";
import Dashboard from "./dashboard/Dashboard";
import SignIn from "./user/SignIn";
import SignUp from "./user/SignUp";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Private } from "./components/Private";
import SignOut from "./user/SignOut";
import DetailProfile from "./user/DetailProfile";
import CreateQuiz from "./quizzes/CreateQuiz";
import QuizRoom from "./quizzes/QuizRoom";
import AvailableGames from "./quizzes/AvailableGames";
import UpdateQuiz from "./quizzes/UpdateQuiz";
import PasswordConfirm from "./user/PasswordConfirm";
import PasswordReset from "./user/PasswordReset";
import { ToastContainer } from "react-toastify";
import * as React from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Private Component={Dashboard} />} />
        <Route
          path="/profile"
          element={<Private Component={DetailProfile} />}
        />
        <Route
          path="/quiz/create"
          element={<Private Component={CreateQuiz} />}
        />
        <Route
          path="/quiz/available"
          element={<Private Component={AvailableGames} />}
        />
        <Route
          path="/quiz/update/:slug"
          element={<Private Component={UpdateQuiz} />}
        />
        <Route path="/quiz/:slug" element={<Private Component={QuizRoom} />} />
        <Route path="/password/reset/confirm" element={<PasswordConfirm />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/password/reset" element={<PasswordReset />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <ToastContainer />
      <StickyFooter />
    </BrowserRouter>
  );
}

export default App;
