import { useEffect, useState } from "react";
import Card from "./Card";

const CardList = ({ cards, handleNewCard, removeCards, updateCards }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {cards.map((card, index) => (
          <Card
            key={index}
            {...card}
            removeCards={removeCards}
            updateCards={updateCards}
          />
        ))}
      </div>
    </div>
  );
};

export default CardList;
