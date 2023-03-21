import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import AddBookForm from "./pages/AddBookForm";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import Update from "./pages/Update";

function App() {
  return (
  
<Router>
      <Routes>
        <Route exact path = "/" element={<LoginPage/>}></Route>
        <Route exact path="/addBookForm" element={<AddBookForm/>}/>
        <Route exact path="addBookForm/update/:id" element={<Update/>}/>
        <Route exact path="/SignUp/" element={<SignUp/>}/>
      </Routes>
</Router>
    
      
 
  );
}

export default App;
