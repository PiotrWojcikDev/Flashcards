import React from 'react';
import { Link } from 'react-router-dom';
import './page-not-found.css'; // Import your styles

const PageNotFoundComponent = () => {
  return (
    <div className="page-not-found-container">
      <h1>404</h1>
      <p>Strona, której szukasz, nie została znaleziona.</p>
      <Link to="/">Powrót do strony głównej</Link>
    </div>
  );
};

export default PageNotFoundComponent;
