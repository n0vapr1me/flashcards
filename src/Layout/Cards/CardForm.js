// Import necessary modules
import React from "react";
import { Link, useHistory } from "react-router-dom";

// Define the CardForm component
const CardForm = ({ handleSubmit, handleChange, newCardData, deckId }) => {
  // Access to history for navigation
  const history = useHistory();

  // Return JSX for the CardForm component
  return (
    <div>
      {/* Card form */}
      <form onSubmit={handleSubmit}>
        {/* Front text input */}
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            onChange={handleChange}
            value={newCardData.front}
            type="text"
            name="front"
            placeholder="Front of the card"
            style={{ width: "100%" }}
          />
        </div>
        {/* Back text input */}
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            onChange={handleChange}
            value={newCardData.back}
            name="back"
            placeholder="Back of the card"
            style={{ width: "100%" }}
            maxLength="200"
          />
        </div>
        {/* Buttons for navigation */}
        <Link to={`/decks/${deckId}`} className="mr-2">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => history.push(`/decks/${deckId}`)}
          >
            Done
          </button>
        </Link>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default CardForm;
