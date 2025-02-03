import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:3000/cards";

const EditCardPage = (removeCards) => {
  const { id } = useParams(); // Recupera l'id dalla URL
  const navigate = useNavigate(); // Per navigare dopo il salvataggio
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Recupera i dati della card quando la pagina viene caricata
  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((res) => res.json())
      .then((card) => {
        setName(card.title);
        setDescription(card.description);
        setImageUrl(card.imageUrl);
      })
      .catch((error) => console.error("Error fetching card:", error));
  }, [id]);

  const handleSave = () => {
    const updatedCard = {
      title: name,
      description: description,
      imageUrl: imageUrl,
    };

    fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCard),
    })
      .then((response) => {
        if (response.ok) {
          // Se tutto va a buon fine, reindirizza alla pagina principale
          navigate("/");
        } else {
          console.error("Errore durante il salvataggio");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="container mx-auto flex flex-col items-center">
      <div className="w-full max-w-md p-4">
        <h2 className="text-2xl font-semibold mb-4">Modifica Card</h2>
        <form>
          <div className="flex flex-col space-y-3">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome della card"
              />
            </div>
            <div>
              <Label htmlFor="description">Descrizione</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrizione della card"
              />
            </div>
            <div>
              <Label htmlFor="imageUrl">URL Immagine</Label>
              <Input
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="URL dell'immagine"
              />
            </div>
            <div className="btn-form flex flex-row justify-between">
              <Link to={"/"}>
                <Button type="button">Indietro</Button>
              </Link>
              <Button type="button" onClick={handleSave}>
                Salva
              </Button>
            </div>
            {/* <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center bg-gray-100 border-2 border-dashed border-red-500 p-4 rounded-lg mt-4">
                <div className="flex flex-col justify-center">
                  <p className="text-gray-600">
                    Sei sicuro di voler cancellare questo sito?
                  </p>
                </div>
                <Button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none" onClick={removeCards} >
                  Cancella
                </Button>
              </div>
            </div> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCardPage;
