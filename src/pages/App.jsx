import { useState, useEffect } from "react";
import CardList from "../components/CardList";
import { Link, Outlet } from "react-router";
import { Button } from "@/components/ui/button";
import Modal from "../components/Modal";
import { Plus } from "lucide-react";
import { ListProvider } from "@/context/ListProvider";

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
    <>
    <ListProvider>
    <div className="container-main mx-auto flex flex-col items-center bg-gradient-to-b from-emerald-100 h-full">
      <div className="container-top mx-auto w-full flex flex-col items-center">
          <div className="flex-1 flex w-full bg-emerald-100 border-4 border-emerald-100 border-dashedp-2 rounded-b-lg justify-center">
            <Link to={`/`}>
              <h1 className="text-3xl flex justify-center pt-2 text-black font-bold h-14 w-64">
                Preferiti
              </h1>
            </Link>
          </div>
        <div className="w-full flex mt-4 justify-end mr-10">
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
        fetchCards={fetchCards}
      />
    </div>
    </ListProvider>
    </>
  );
}

export default App;
