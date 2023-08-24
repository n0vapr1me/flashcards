// Import necessary modules
import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readCard, updateCard, readDeck } from "../../utils/api";
import CardForm from "./CardForm";

// Define the EditCard component
const EditCard = () => {
  // Access to route parameters and history for navigation
  const { deckId, cardId } = useParams();
  const history = useHistory();
  // Initial state for card data
  const initialCardState = {
    id: "",
    front: "",
    back: "",
    deckId: "",
  };

  // State to hold deck and card data
  const [deck, setDeck] = useState({});
  const [editCard, setEditCard] = useState(initialCardState);

  // Load deck data from API
  useEffect(() => {
    async function loadDeck() {
      try {
        const loadedDeck = await readDeck(deckId);
        setDeck(loadedDeck);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      }
    }
    loadDeck();
  }, [deckId]);

  // Load card data from API
  useEffect(() => {
    async function loadCard() {
      try {
        const loadedCard = await readCard(cardId);
        setEditCard(loadedCard);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      }
    }
    loadCard();
  }, [cardId]);

  // Handle form input changes
  const handleChange = (event) =>
    setEditCard({ ...editCard, [event.target.name]: event.target.value });

  // Handle form submission
  async function handleSubmit(event) {
    event.preventDefault();
    await updateCard(editCard);
    setEditCard(initialCardState);
    history.push(`/decks/${deckId}`);
  }

  // Return JSX for the EditCard component
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"}> Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>Edit {deck.name}</Link>
          </li>
          <li className="breadcrumb-item active">Edit Card {cardId}</li>
        </ol>
      </nav>
      <h1 className="text-center">Edit Card</h1>
      {/* Render CardForm component with relevant props */}
      <CardForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        newCardData={editCard}
        deckId={deckId}
      />
    </div>
  );
};

export default EditCard;
