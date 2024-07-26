import React, { useState, useEffect } from 'react';
import styles from './sets-list.module.css'; 
import SingleSetComponent from '../../components/single-set/single-set';
import Navbar from '../../components/navbar/navbar';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { getAllSetsByUserId } from '../../services/set-service';
import AddSetModal from '../../components/modals/set/add-set-modal/add-set-modal';


interface Set {
    setId: string;
    setName: string;
    createdAt: string;
    updatedAt: string;
    flashcardCount: number;
}

const SetsListComponent = () => {
    const [sets, setSets] = useState<Set[]>([]);
    const [filterText, setFilterText] = useState<string>('');
    const [showAddSetModal, setShowAddSetModal] = useState<boolean>(false);
    

    useEffect(() => {
        fetchSets();
    }, []);

    const fetchSets = async () => {
        try {
            const userId = localStorage.getItem('userId'); 

            if (!userId) {
                console.log('User is not logged in');
                return;
            }

            let fetchedSets = await getAllSetsByUserId(userId);
            fetchedSets = fetchedSets.sort(
                (a: { setName: string; }, b: { setName: string; }) => a.setName.localeCompare(b.setName)
            );
            setSets(fetchedSets);
        } catch (error: any) {
            console.log(error)
        } 
    };

    const filteredSets = sets.filter(set => set.setName.toLowerCase().includes(filterText.toLowerCase()));

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterText(e.target.value);
    };

    const openAddSetModal = () => {
        setShowAddSetModal(true);
    };

    const closeAddSetModal = () => {
        setShowAddSetModal(false);
    };

    const refreshSetsList = () => {
        fetchSets();
    };

    return (
        <>
            <Navbar/>
            <div className={styles.setsListContainer}>
                <h2>Dostępne zbiory fiszek</h2>
                <div className={styles.filterContainer}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder="Filtruj zbiory" value={filterText} onChange={handleFilterChange} />
                </div>
                <div className={styles.setsList}>
                    <button className={styles.addButton} onClick={openAddSetModal}>
                        Dodaj zbiór&nbsp;
                        <i className="fa-solid fa-plus fa-sm"></i>
                        </button>
                    {filteredSets.map(set => (
                        <SingleSetComponent key={set.setId} setObj={set} refreshSetsList={refreshSetsList}/>
                    ))}
                </div>
            </div>
            {showAddSetModal && <AddSetModal closeAddSetModal={closeAddSetModal} refreshSetsList={refreshSetsList} />}
        </>
        
    );
};

export default SetsListComponent;
