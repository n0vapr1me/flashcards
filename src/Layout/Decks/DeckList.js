// Import necessary modules
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../../utils/api";

// Define the DeckList component
function DeckList({ deck }) {
  const { id, name, description, cards } = deck;
  const history = useHistory();

  // Handle deck deletion
  async function handleDelete() {
    if (window.confirm("Delete this deck?")) {
      await deleteDeck(id);
      history.go(0);
    } else {
      history.go(0);
    }
  }

  // Render deck information
  return (
    <div className="card w-75 mb-4">
      <div className="card-body">
        <div className="row px-3">
          <h5>{name}</h5>
          <p className='ml-3'>{cards.length} cards</p>
          <div />
          <p>{description}</p>

          {/* View button */}
          <Link to={`/decks/${id}`} className="btn btn-secondary">
            <i className="fas fa-eye"></i> View
          </Link>

          {/* Study button */}
          <Link to={`/decks/${id}/study`} className="btn btn-primary ml-3">
            <i className="fas fa-book"></i> Study
          </Link>

          {/* Delete button */}
          <button
            onClick={handleDelete}
            value={id}
            className="btn btn-danger ml-auto"
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeckList;
