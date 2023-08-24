// Import necessary modules and components
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Define the Card component
function Card({ cards }) {
  // State to manage current cardId and front/back side
  const [cardId, setCardId] = useState(1);
  const [frontSide, setFrontSide] = useState(true);
  // Access to history for navigation
  const history = useHistory();

  // Handle flipping the card
  function flipHandler() {
    setFrontSide(() => !frontSide);
  }

  // Handle moving to the next card
  function nextHandler() {
    setCardId(cardId + 1);
    setFrontSide(!frontSide);
    // Check if cardId exceeds the number of cards
    if (cardId >= cards.length) {
      // Prompt to restart or go back to home
      if (window.confirm("Restart Cards?")) {
        history.go(0); // Restart the cards
      } else {
        history.push("/"); // Go back to home
      }
    }
  }

  // Return JSX for the Card component
  if (cards) {
    if (cards.length > 2) {
      return (
        <div className="card w-75 mb-4">
          <div className="card-body">
            <div className="row px-3">
              {/* Display card number */}
              <h6>
                Card {cardId} of {cards.length}
              </h6>
            </div>
            {/* Display front/back side of the card */}
            <p className="card-text">
              {frontSide ? cards[cardId - 1].front : cards[cardId - 1].back}
            </p>
            {/* Flip button */}
            <div className="row px-3">
              <button onClick={flipHandler} className="btn btn-secondary m-2 ">
                Flip
              </button>
              {/* Next button */}
              {!frontSide ? (
                <button onClick={nextHandler} className="btn btn-primary">
                  Next
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        // Display a message if there are not enough cards
        <div>
          <h2>Not Enough Cards</h2>
          <p>
            You need at least 3 cards to study. There are {cards.length} cards
            in this deck.
          </p>
        </div>
      );
    }
  } else {
    // Display loading message while cards are fetched
    return <h5>Loading...</h5>;
  }
}

export default Card;
