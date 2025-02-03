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
    setCards((prevCards) => [...prevCards, newCard]);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const fetchCards = () => {
    fetch("http://localhost:3000/cards")
      .then((res) => res.json())
      .then((cards) => setCards(cards))
      .catch((error) => console.error("Error fetching cards:", error));
  };

  useEffect(() => {
    fetchCards(); 
  }, []);

  const removeCards = (id) => {
    fetch(`http://localhost:3000/cards/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          fetchCards(); 
        } else {
          console.error("Errore durante la rimozione:", res);
        }
      })
      .catch((error) => console.error("Errore durante la rimozione:", error));
  };

  const updateCards = (updatedCard) => {
    setCards((prevCards) =>
      prevCards.map((card) => (card.id === updatedCard.id ? updatedCard : card))
    );
  };

  const openModal = (card) => {
    setCardToEdit(card);
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
        cardToEdit={cardToEdit}
        onUpdateCard={updateCards}
      />
    </div>
  );
}

export default App;
