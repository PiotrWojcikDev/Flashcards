import React, { useState, useEffect } from 'react';
import './sets-list.css'; 
import SingleSetComponent from '../../components/single-set/single-set';
import { Link } from 'react-router-dom';

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

    useEffect(() => {
        fetchSets();
    }, []);

    const fetchSets = async () => {
        // Załaduj rzeczywiste dane zamiast tych
        const mockSets: Set[] = [
            { setId: '1', setName: 'Ekonomia Podstawowa', createdAt: '2024-05-27T16:57:00Z', updatedAt: '2024-06-21T14:43:00Z', flashcardCount: 3 },
            { setId: '2', setName: 'Filologia angielska', createdAt: '2024-06-18T16:14:00Z', updatedAt: '', flashcardCount: 0 },
        ];
        setSets(mockSets);
    };

    const filteredSets = sets.filter(set => set.setName.toLowerCase().includes(filterText.toLowerCase()));

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterText(e.target.value);
    };

    return (
        <div className="main">
            <h2>Dostępne zbiory fiszek</h2>
            <div className="filter-container">
                <input type="text" placeholder="Filtruj zbiory" value={filterText} onChange={handleFilterChange} />
            </div>
            <button className="add-button"><Link to="/add-set">Dodaj zbiór +</Link></button>
            {filteredSets.map(set => (
                <SingleSetComponent key={set.setId} setObj={set} onDelete={() => console.log('Delete set', set.setId)} />
            ))}
        </div>
    );
};

export default SetsListComponent;
