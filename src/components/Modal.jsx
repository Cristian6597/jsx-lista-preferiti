import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { createPortal } from "react-dom";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useContext } from "react";
import { ListContext } from "@/context/ListProvider";

const API_URL = "http://localhost:3000/cards";

const Modal = ({
  isOpen = false,
  onOpenChange,
  onNewCardAdded,
  cardToEdit,
  onUpdateCard,
  fetchCards,
}) => {
  const [internalOpen, setInternalOpen] = useState(isOpen);
  const open = isOpen || internalOpen;
  const setOpen = onOpenChange || setInternalOpen;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { selectedType, changeType } = useContext(ListContext);

  // Precompila il modal con i dati della card da modificare
  useEffect(() => {
    if (cardToEdit) {
      setName(cardToEdit.title);
      setDescription(cardToEdit.description);
      setImageUrl(cardToEdit.imageUrl);
    }
  }, [cardToEdit]);

  const handleSave = async () => {
    const finalImageUrl = imageUrl.trim()
      ? imageUrl
      : "https://pensieribelli.it/wp-content/plugins/elementor/assets/images/placeholder.png";
    const newCard = {
      title: name,
      description: description,
      imageUrl: finalImageUrl,
      favourite: false,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCard),
      });

      if (response.ok) {
        setOpen(false);
        if (onNewCardAdded) {
          onNewCardAdded(newCard);
        }

        // Chiama fetchCards per ricaricare la lista delle card
        if (fetchCards) {
          fetchCards();
        }
      } else {
        console.error("Errore nel salvataggio");
      }
    } catch (error) {
      console.error("Errore di rete:", error);
    }
  };

  return (
    <>
      {open &&
        createPortal(
          <div
            className="fixed w-screen h-screen top-0 left-0 bg-black/70 items-center justify-center flex z-50"
            onClick={() => setOpen(false)}
          >
            <Card
              className="w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <CardHeader>
                <CardTitle>Aggiungi un nuovo sito</CardTitle>
                <CardDescription>
                  Organizza i tuoi preferiti come meglio desideri!..
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Nome</Label>
                      <Input
                        id="name"
                        placeholder="www.example.com"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="imageUrl">Immagine URL</Label>
                      <Input
                        id="imageUrl"
                        type="text"
                        placeholder="Inserisci URL immagine"
                        className="border rounded-md p-2"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="preferito">Descrizione</Label>
                      <div className="relative">
                        <textarea
                          id="preferito"
                          className="h-32 pt-2 pl-2 w-full border rounded-md resize-none"
                          placeholder="Inserisci testo"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                    <div className="cartella-destinazione font-bold">
                      <h1>Cartella: {selectedType} </h1>
                    </div>
                    <div className="cartelle flex flex-row gap-2 justify-evenly">
                      <div onClick={() => changeType('Hobby')} className="rossa border-4 border-yellow-400 border-dashed bg-yellow-300 p-2 rounded-lg w-full h-auto text-center cursor-pointer">
                        <p>Hobby</p>
                    </div>
                        <div onClick={() => changeType('Lavoro')} className="rossa border-4 border-red-400 border-dashed bg-red-300 p-2 rounded-lg w-full h-auto text-center cursor-pointer">
                        <p>Lavoro</p>
                        </div>
                        <div onClick={() => changeType('Utile')} className="blu border-4 border-blue-400 border-dashed bg-blue-300 p-2 rounded-lg w-full h-auto  text-center cursor-pointer">
                        <p>Utile</p>
                        </div>
                      </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="justify-end gap-4">
                <Button variant="secondary" onClick={() => setOpen(false)}>
                  Chiudi
                </Button>
                <Button onClick={handleSave}>Salva</Button>
              </CardFooter>
            </Card>
          </div>,
          document.body
        )}
    </>
  );
};

export default Modal;
