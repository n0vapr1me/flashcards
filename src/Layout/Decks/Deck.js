// Import necessary modules
import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck } from "../../utils/api";
import CardList from "../Cards/CardList";

// Define the Deck component
const Deck = () => {
  // State to hold deck data
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();
  const history = useHistory();

  // Fetch the deck data when component mounts
  useEffect(() => {
    const findDeck = async () => {
      try {
        const currentDeck = await readDeck(deckId);
        setDeck(() => currentDeck);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      }
    };
    findDeck();
  }, [deckId]);

  // Handle deck deletion
  const handleDelete = async () => {
    if (
      window.confirm(
        `Delete this Deck?\n\nYou will not be able to recover it.`
      )
    ) {
      await deleteDeck(deckId);
      history.go(0);
    } else {
      history.go(0);
    }
  };

  // Render deck information
  if (deck.id) {
    return (
      <div>
        {/* Breadcrumb navigation */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={"/"}> Home</Link>
            </li>

            <li className="breadcrumb-item active">{deck.name}</li>
          </ol>
        </nav>

        {/* Deck information */}
        <div>
          <h1>{deck.name}</h1>
          <div>{deck.description}</div>
        </div>

        <div className="row px-3">
          {/* Edit button */}
          <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary ml-3">
            {/* Edit icon */}
            <i className="fas fa-pencil-alt"></i> Edit
          </Link>

          {/* Study button */}
          <Link to={`/decks/${deckId}/study`} className="btn btn-primary ml-3">
            {/* Study icon */}
            <i className="fas fa-book-open"></i> Study
          </Link>

          {/* Add Cards button */}
          <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary ml-3">
            {/* Add icon */}
            <i className="fas fa-plus"></i> Add Cards
          </Link>

          {/* Delete button */}
          <button
            onClick={handleDelete}
            name="delete"
            value={deckId}
            className="btn btn-danger ml-auto"
          >
            {/* Trash icon */}
            <i className="fas fa-trash"></i>
          </button>
        </div>

        <h1>Cards</h1>
        {/* Display cards */}
        <CardList cards={deck.cards} />
      </div>
    );
  }
  
  // If deck data is still loading
  return <p>Loading...</p>;
};

export default Deck;
