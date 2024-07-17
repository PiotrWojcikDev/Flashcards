import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginComponent from './pages/auth/login/login';
import RegistrationComponent from './pages/auth/registration/registration';
import SetsListComponent from './pages/sets-list/sets-list';
import Footer from './components/footer/footer';


const  App=()=> {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginComponent/>}  key={"/login"} />
        <Route path="/register" element={<RegistrationComponent />}  key={"/register"}/>
        {/* <Route path="/sets" element={<SetsListComponent />} key={"/sets"}/> */}
        {/* <Route path="/sets/:setId/flashcards" element={<FlashcardsListComponent flashcards={sampleFlashcards} onEdit={handleEditFlashcard} onDelete={handleDeleteFlashcard} />} key="/sets/:setId/flashcards" /> */}
        {/* <Route path="*" element={<PageNotFoundComponent />} key={"*"}/> */}

      {  /*
        <Route path="/sets/:setId/learn" element={<LearnComponent />} key={"/sets/:setId/learn"}/>
        <Route path="/" element={<HomeComponent />} key={"/"} />
        */
      }
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
