import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginComponent from './pages/auth/login/login';
import RegistrationComponent from './pages/auth/registration/registration';
import PageNotFoundComponent from './pages/page-not-found/page-not-found';
import SetsListComponent from './pages/sets-list/sets-list';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import FlashcardsListComponent from './pages/flashcards-list/flashcards-list';


// Przykładowe dane flashcards
const sampleFlashcards = [
  { id: '1', front: 'Co to jest React?', back: 'Biblioteka ' },
  { id: '2', front: 'Co to jest useState?', back: 'Hook w React' },
];

// Przykładowa funkcja onDelete
const handleDeleteFlashcard = (id: string) => {
  console.log('Usuwanie flashcard o id:', id);
};

const handleEditFlashcard = (id: string) => {
  console.log('Edycja flashcard o id:', id);
};

const  App=()=> {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginComponent/>}  key={"/login"} />
        <Route path="/register" element={<RegistrationComponent />}  key={"/register"}/>
        <Route path="/sets" element={<SetsListComponent />} key={"/sets"}/>
        <Route path="/sets/:setId/flashcards" element={<FlashcardsListComponent flashcards={sampleFlashcards} onEdit={handleEditFlashcard} onDelete={handleDeleteFlashcard} />} key="/sets/:setId/flashcards" />
        <Route path="*" element={<PageNotFoundComponent />} key={"*"}/>

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
