// Import necessary modules
import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";

// Define the EditDeck component
const EditDeck = () => {
  // Get the deckId from URL params and set up useHistory
  const { deckId } = useParams();
  const history = useHistory();

  // Initial state for the deck being edited
  const initialDeckState = {
    name: "",
    description: "",
  };

  // State to store the edited deck
  const [editDeck, setEditDeck] = useState(initialDeckState);

  // Load the deck to be edited using useEffect
  useEffect(() => {
    async function loadDeck() {
      try {
        const loadedDeck = await readDeck(deckId);
        setEditDeck(loadedDeck);
      } catch (error) {
        // Handle errors
      }
    }
    loadDeck();
  }, [deckId]);

  // Handle changes in the form inputs
  const handleChange = (event) =>
    setEditDeck({ ...editDeck, [event.target.name]: event.target.value });

  // Handle form submission
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await updateDeck(editDeck);
      history.push(`/decks/${response.id}`);
    } catch (error) {
      // Handle errors
    }
  }

  // Render the edit deck form
  return (
    <div>
      <nav aria-label="breadcrumb">
        {/* Breadcrumb navigation */}
      </nav>
      <form onSubmit={handleSubmit}>
        <h1 className="my-4 text-center">Edit Deck</h1>
        {/* Input fields for deck name and description */}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            id="name"
            className="form-control form-control-lg"
            type="text"
            placeholder="Deck Name"
            onChange={handleChange}
            value={editDeck.name}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="5"
            placeholder="Brief description of the deck"
            onChange={handleChange}
            value={editDeck.description}
            required
          />
        </div>
        {/* Cancel and Submit buttons */}
        <Link to={`/decks/${deckId}`} className="mr-2">
          <button type="button" className="btn btn-secondary">
            Cancel
          </button>
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditDeck;
