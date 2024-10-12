import { useState } from "react";
import Cards from "./cards";
import TriggerCard from "../components/navbar/trigger";
import health from "../assets/img/health.svg";
import handcuffs from "../assets/img/handcuffs.svg";
import flood from "../assets/img/flood.svg";
import fire from "../assets/img/fire.svg";
import callss from "../assets/img/callss.svg";
import nonviolence from "../assets/img/nonviolence.svg";

export default function MainPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const cardsData = [
    {
      cardName: "Health",
      cardName2: "Crisis",
      cardLogo: health,
      logoAlt: "health crisis",
    },
    {
      cardName: "Robbery",
      cardName2: "Attack",
      cardLogo: handcuffs,
      logoAlt: "robbery attack",
    },
    {
      cardName: "Fire",
      cardName2: "Outbreak",
      cardLogo: fire,
      logoAlt: "fire outbreak",
    },
    {
      cardName: "Flood",
      cardName2: "Alert",
      cardLogo: flood,
      logoAlt: "flood alert",
    },
    {
      cardName: "Call",
      cardName2: "Emergency",
      cardLogo: callss,
      logoAlt: "call emergency",
    },
    {
      cardName: "Violence",
      cardName2: "Alert",
      cardLogo: nonviolence,
      logoAlt: "violence alert",
    },
  ];

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsOpen(true);
  };

  return (
    <div className="m-5 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
      {cardsData.map((card, index) => (
        <div key={index} className="p-0" onClick={() => handleCardClick(card)}>
          <Cards
            cardName={card.cardName}
            cardName2={card.cardName2}
            cardLogo={card.cardLogo}
            logoAlt={card.logoAlt}
          />
        </div>
      ))}
      {isOpen && (
        <TriggerCard {...selectedCard} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
}
