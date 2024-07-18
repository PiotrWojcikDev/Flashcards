import React from 'react';
import { Link } from 'react-router-dom';
import styles from './home.module.css'; 
import Navbar from '../../components/navbar/navbar';

const HomeComponent = () => {
  return (
    <>
        <Navbar/>
        <div className={styles.homeContent}>
            <h1><i>Witaj w aplikacji FlashLearn!</i></h1>
            <p>
                Witamy w naszej aplikacji do nauki języków obcych (i nie tylko) za pomocą fiszek!
                Aplikacja ta została stworzona, aby pomóc Ci w skutecznym przyswajaniu 
                nowego słownictwa, pojęć oraz rozwijaniu umiejętności zapamiętywania. Dzięki niej możesz 
                dodawać nowe fiszki, edytować istniejące, a także usuwać te, które nie są Ci już 
                potrzebne. 
                Zapraszamy do korzystania z naszej aplikacji i życzymy owocnej nauki języków obcych!
            </p>
            <button >Do zbiorów!</button>
        </div>

    </>
  );
};

export default HomeComponent;

