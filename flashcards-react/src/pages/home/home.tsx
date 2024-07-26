import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './home.module.css'; 
import Navbar from '../../components/navbar/navbar';
import {getLoggedInUserId} from '../../services/auth-service';

const HomeComponent = () => {

  const navigate = useNavigate(); 

  const goToSets = () => {
    navigate('/sets'); 
  };

  return (
    <>
        <Navbar/>
        <div className={styles.homeContainer}>
            <h1><i>Witaj w aplikacji FlashLearn!</i></h1>
            <p>
                Witamy w naszej aplikacji do nauki języków obcych (i nie tylko) za pomocą fiszek!
                Aplikacja ta została stworzona, aby pomóc Ci w skutecznym przyswajaniu 
                nowego słownictwa, pojęć oraz rozwijaniu umiejętności zapamiętywania. Dzięki niej możesz 
                dodawać nowe fiszki, edytować istniejące, a także usuwać te, które nie są Ci już 
                potrzebne. 
                Zapraszamy do korzystania z naszej aplikacji i życzymy owocnej nauki języków obcych!
            </p>
            {
              getLoggedInUserId() && <button onClick={goToSets}>Do zbiorów!</button>
            }
        </div>

    </>
  );
};

export default HomeComponent;

