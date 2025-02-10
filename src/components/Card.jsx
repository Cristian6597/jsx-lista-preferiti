import { Pen, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";  
import Modal from "./Modal";
import { useState } from "react";

const Card = ({ title, description, imageUrl, removeCards, id, updateCards, area }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Definisce i colori in base all'area
  const getColorClasses = (area) => {
    switch (area) {
      case "Lavoro":
        return "text-red-400 border-red-400 bg-red-100";
      case "Hobby":
        return "text-yellow-500 border-yellow-500 bg-yellow-100";
      case "Utile":
        return "text-blue-400 border-blue-500 bg-blue-100";
      default:
        return "text-gray-600 border-gray-400 bg-gray-100"; // Colore di default
    }
  };

  return (
    <div className="bg-stone-50 rounded-lg shadow-md overflow-hidden">
      <Modal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onNewCardAdded={updateCards}
        cardToEdit={{ title, description, imageUrl, id, area }}
      />
      
      {imageUrl && (
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}
      {/* colore del box per identificare a che categoria appartiene */}
      <div className="flex flex-col p-4">
        <div className={`inline-block px-3 py-1 rounded-lg border font-bold ${getColorClasses(area)}`}>
          {area}
        </div>

        <h2 className="text-xl font-semibold mt-2 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
        <div className="flex justify-end gap-3 mt-3">
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
