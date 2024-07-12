import React from 'react';
import { useNavigate } from 'react-router-dom';
import './single-set.css'; // Import styles

interface Set {
    setId: string;
    setName: string;
    createdAt: string; // Data w formacie ISO string
    updatedAt: string; // Data w formacie ISO string
    flashcardCount: number;
}

interface Props {
    setObj: Set;
    onDelete: () => void; // Callback do obsługi usunięcia
}

const formatDate = (dateString?: string) => {
    if (!dateString) {
        return '-'; // Zwracaj '-' lub inne odpowiednie oznaczenie, jeśli data nie istnieje
    }
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return '-'; // Zabezpieczenie przed nieprawidłowymi datami
    }
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Miesiące są od 0 do 11, więc dodaj 1
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // Zwróć sformatowany ciąg "godzina:minuta dzień.miesiąc.rok"
    return `${hours}:${minutes} ${day}.${month}.${year}`;
};


const SingleSetComponent: React.FC<Props> = ({ setObj, onDelete }) => {
    const navigate = useNavigate();

    const navigateToSetDetails = () => {
        navigate(`/sets/${setObj.setId}/flashcards`);
    };

    const editSet = () => {
        navigate(`/edit-set/${setObj.setId}`);
    };

    const deleteSet = () => {
        // Logika usunięcia, wywołanie onDelete
        console.log("Delete set" + JSON.stringify(setObj));
        onDelete();
    };

    return (
        <div className="set-container">
            <div className="set-header">
                <h2>{setObj.setName}</h2>
            </div>
            <div className="set-details">
                <p>Data utworzenia: {formatDate(setObj.createdAt)}</p>
                <p>Data modyfikacji: {setObj.updatedAt ? formatDate(setObj.updatedAt) : '-'}</p>
                <p>Liczba fiszek: {setObj.flashcardCount}</p>
            </div>
            <div className="set-actions">
                <button onClick={navigateToSetDetails}>Zobacz</button>
                <button onClick={editSet}>Edytuj</button>
                <button onClick={deleteSet}>Usuń</button>
            </div>
        </div>
    );
    
};

export default SingleSetComponent;
