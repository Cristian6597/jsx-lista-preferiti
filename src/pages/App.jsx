import { useState, useEffect } from "react";
import CardList from "../components/CardList";
import { Link, Outlet } from "react-router";
import { Button } from "@/components/ui/button";
import Modal from "../components/Modal";
import { Plus } from "lucide-react";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [cardToEdit, setCardToEdit] = useState(null);

  const handleNewCard = (newCard) => {
    setCards((prevCards) => [...prevCards, newCard]); // Aggiunge la nuova card alla lista
  };

  const handleOpenModal = () => {
    setCardToEdit(null);  // Assicura che la card da modificare sia nulla quando apri il modal per una nuova card
    setModalOpen(true);
  };

  const fetchCards = () => {
    fetch("http://localhost:3000/cards")
      .then((res) => res.json())
      .then((cards) => setCards(cards))
      .catch((error) => console.error("Error fetching cards:", error));
  };

  useEffect(() => {
    fetchCards(); // Carica le card all'avvio
  }, []);

  const removeCards = (id) => {
    fetch(`http://localhost:3000/cards/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          fetchCards(); // Ricarica le card dopo la rimozione
        } else {
          console.error("Errore durante la rimozione:", res);
        }
      })
      .catch((error) => console.error("Errore durante la rimozione:", error));
  };

  const updateCards = (updatedCard) => {
    setCards((prevCards) =>
      prevCards.map((card) => (card.id === updatedCard.id ? updatedCard : card)) // Modifica la card esistente
    );
  };

  const openModal = (card) => {
    setCardToEdit(card); // Pre-compila il modal con la card da modificare
    setModalOpen(true);
  };

  return (
    <div className="container mx-auto flex flex-col items-center">
      <div className="w-full flex justify-between items-center my-8">
        <div className="flex-1 flex justify-center">
          <Link to={`/`}>
            <Button className="text-3xl bg-white text-black hover:bg-white font-bold">
              Le Mie Card
            </Button>
          </Link>
        </div>
        <div className="flex-1 flex justify-end">
          <Button className="text-xl font-bold" onClick={handleOpenModal}>
            <Plus /> Nuovo preferito
          </Button>
        </div>
      </div>
      <CardList
        cards={cards}
        handleNewCard={handleNewCard}
        removeCards={removeCards}
        openModal={openModal}
        updateCards={updateCards}
      />

      <Outlet />
      <Modal
        isOpen={modalOpen}
        onOpenChange={setModalOpen}
        cardToEdit={cardToEdit} // Passa la card da modificare
        onNewCardAdded={handleNewCard} // Aggiungi la nuova card
        onUpdateCard={updateCards} // Modifica la card esistente
      />
    </div>
  );
}

export default App;
