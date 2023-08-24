// Import necessary modules
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";
import Card from "../Cards/Card";

// Define the Study component
function Study() {
  // Get the deckId from URL params
  const { deckId } = useParams();

  // State to store the current deck being studied
  const [deck, setDeck] = useState([]);

  // Load the deck being studied using useEffect
  useEffect(() => {
    async function studyDeck() {
      try {
        const currentDeck = await readDeck(deckId);
        setDeck(currentDeck);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      }
    }
    studyDeck();
  }, [deckId]);

  // Render the study page
  return (
    <div className="col-9 mx-auto">
      {/* Breadcrumb navigation */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            {/* link to homepage */}
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            {/* link to deck name that user will be studying */}
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          {/* active study page */}
          <li className="breadcrumb-item active">Study</li>
        </ol>
      </nav>
      {/* title of page: study and name of deck */}
      <h1>Study: {deck.name}</h1>
      {/* calling card component to show current card on study page */}
      <Card cards={deck.cards} deck={deck} />
    </div>
  );
}

export default Study;
