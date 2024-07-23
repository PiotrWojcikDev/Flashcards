import React, { useEffect, useState } from 'react';
import { useParams,  useNavigate } from 'react-router-dom'; 
import styles from './flashcards-list.module.css'; 
import Navbar from '../../components/navbar/navbar';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SingleFlashcardComponent from '../../components/single-flashcard/single-flashcard';
import { getAllFlashcardsBySetId, getSetById } from '../../services/set-service'; 
import AddFlashcardModal from '../../components/modals/flashcard/add-flashcard-modal/add-flashcard-modal';


interface Flashcard {
  flashcardId: string;
  front: string;
  back: string;
}

interface Set {
  setId: string;
  setName: string;
  flashcardCount: number;
}

const FlashcardsListComponent = () => {
  const { setId } = useParams();
  const navigate = useNavigate(); 
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [setDetails, setSetDetails] = useState<Set | null>(null);
  const [filterText, setFilterText] = useState<string>('');
  const [showAddFlashcardModal, setShowAddFlashcardModal] = useState<boolean>(false); 

  useEffect(() => {
    if (setId) {  
      fetchFlashcards(setId); 
      fetchSetDetails(setId);
    }
  }, [setId]);

  const fetchFlashcards = async (id: string) => {
    try {
      let fetchedFlashcards = await getAllFlashcardsBySetId(id); 
      fetchedFlashcards = fetchedFlashcards.sort(
        (a: { front: string; }, b: { front: string; }) => a.front.localeCompare(b.front)
      );
      setFlashcards(fetchedFlashcards); 
    } catch (error) {
      console.error("Error fetching flashcards:", error); 
    }
  };

  const fetchSetDetails = async (id: string) => {
    try {
      const fetchedSet = await getSetById(id);
      setSetDetails(fetchedSet);
    } catch (error) {
      console.error("Error fetching set details:", error); 
    }
  };


  const filteredFlashcards = flashcards.filter(flashcard =>
      flashcard.front.toLowerCase().includes(filterText.toLowerCase())
  );

  const navigateToLearn = () => {
    if (setId) {
      navigate(`/sets/${setId}/learn`); 
    }
  };


  const openAddFlashcardModal = () => { 
    setShowAddFlashcardModal(true);
  };

  const closeAddFlashcardModal = () => { 
    setShowAddFlashcardModal(false);
  };

  const refreshFlashcardsList = () => {
    fetchFlashcards(setId!);
};

  return (
    <>
      <Navbar/>
      <div className={styles.flashcardsListContainer}>
        <h2>Fiszki w zbiorze <i>{setDetails?.setName}</i> ({flashcards.length})</h2>

        <div className={styles.filterContainer}>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Filtruj fiszki" />
        </div>

        <div className={styles.flashcardsList}>
          <div className={styles.actions}>
            <button className={styles.learnButton} onClick={navigateToLearn} disabled={flashcards.length===0}>
              Tryb nauki&nbsp;
              <i className="fa-solid fa-graduation-cap"></i>
            </button>
            <button className={styles.addButton} onClick={openAddFlashcardModal}>
              Dodaj fiszki&nbsp;
              <i className="fa-solid fa-plus fa-sm"></i>
            </button>
          </div>
          {filteredFlashcards.map(flashcard => (
              <SingleFlashcardComponent
                  key={flashcard.flashcardId}
                  flashcardObj={flashcard}
                  refreshFlashcardsList={refreshFlashcardsList}
              />
          ))}
        </div>
      </div>
      {showAddFlashcardModal && 
        <AddFlashcardModal 
          closeAddFlashcardModal={closeAddFlashcardModal} 
          refreshFlashcardList={refreshFlashcardsList} 
        />
      }
    </>
  );
};

export default FlashcardsListComponent;
