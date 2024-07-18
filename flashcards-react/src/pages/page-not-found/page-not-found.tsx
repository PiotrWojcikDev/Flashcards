import React from 'react';
import { Link } from 'react-router-dom';
import styles from './page-not-found.module.css'; 
import Navbar from '../../components/navbar/navbar';

const PageNotFoundComponent = () => {
  return (
    <>
      <Navbar/>
      <div className={styles.pageNotFoundContainer}>
        <h1>404</h1>
        <p>Strona, której szukasz, nie została znaleziona.</p>
        <Link to="/" className={styles.mainPageLink}>Powrót do strony głównej</Link>
      </div>
    </>
  );
};

export default PageNotFoundComponent;
