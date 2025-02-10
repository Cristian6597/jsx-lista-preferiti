import { Pen, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";  // Importa il Link
import Modal from "./Modal";
import { useState } from "react";

const Card = ({ title, description, imageUrl, removeCards, id, updateCards }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-stone-50 rounded-lg shadow-md overflow-hidden">
      <Modal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onNewCardAdded={updateCards}
        cardToEdit={{ title, description, imageUrl, id }}
      />
      
      {imageUrl && (
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="flex flex-col p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
        <div className="flex justify-end gap-3">
          <Link to={`/edit-card/${id}`}>
            <Pen className="size-5 text-blue-500 hover:text-blue-600 cursor-pointer" />
          </Link>
          <Trash2
            className="size-5 text-red-500 hover:text-red-600 cursor-pointer"
            onClick={() => removeCards(id)}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;

