import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom';
import LoginComponent from './pages/auth/login/login';
import RegistrationComponent from './pages/auth/registration/registration';
import SetsListComponent from './pages/sets-list/sets-list';
import Footer from './components/footer/footer';
import PageNotFoundComponent from './pages/page-not-found/page-not-found';
import HomeComponent from './pages/home/home';
import FlashcardsListComponent from './pages/flashcards-list/flashcards-list';
import LearnComponent from './pages/learn/learn';
import ProtectedRoute from './components/protected-route/protected-route';

const ProtectedRouteWrapper: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { setId } = useParams<{ setId: string }>();
  
  if (!setId) 
    return <Navigate to="/login" />;
  
  return <ProtectedRoute element={element} />;
};

const  App=()=> {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginComponent/>}  key={"/login"} />
        <Route path="/register" element={<RegistrationComponent />}  key={"/register"}/>
        <Route path="/sets" element={<SetsListComponent />} key={"/sets"}/>
        <Route 
          path="/sets/:setId/flashcards" 
          element={<ProtectedRouteWrapper element={<FlashcardsListComponent />} />} 
        />
        <Route 
          path="/sets/:setId/learn" 
          element={<ProtectedRouteWrapper element={<LearnComponent />} />} 
        />
        <Route path="*" element={<PageNotFoundComponent />} key={"*"}/>
        <Route path="/" element={<HomeComponent />} key={"/"} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
