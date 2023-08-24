// Import necessary modules and components
import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";
import CardForm from "./CardForm";

// Define the AddCard component
const AddCard = () => {
  // Extract deckId from URL parameters
  const { deckId } = useParams();
  // State to store deck data
  const [deck, setDeck] = useState([]);
  // Access to history for navigation
  const history = useHistory();
  // Initial form data and state to manage form data
  const initialFormState = {
    id: "",
    front: "",
    back: "",
    deckId: "",
  };
  const [formData, setFormData] = useState(initialFormState);

  // Fetch deck data from API
  useEffect(() => {
    async function fetchDeck() {
      try {
        const currentDeck = await readDeck(deckId);
        setDeck(currentDeck);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      }
    }
    fetchDeck();
  }, [deckId]);

  // Handle form submission
  async function handleSubmit(event) {
    event.preventDefault();
    await createCard(deckId, formData);
    setFormData(initialFormState);
    history.go(0); // Reload the page
  }

  // Handle form input changes
  const handleChange = ({ target }) =>
    setFormData({ ...formData, [target.name]: target.value });

  // Return JSX for the AddCard component
  return (
    <div>
      {/* Breadcrumb navigation */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          {/* Home breadcrumb */}
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          {/* Deck breadcrumb */}
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          {/* Add Card breadcrumb */}
          <li className="breadcrumb-item active">Add Card</li>
        </ol>
      </nav>
      {/* Title */}
      <h1 className="my-4 text-center">{deck.name}: Add Card</h1>
      {/* Render CardForm component */}
      <CardForm
        deckId={deckId}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        newCardData={formData}
      />
    </div>
  );
};

export default AddCard;
