// Import necessary modules
import React from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { deleteCard } from "../../utils/api";

// Define the CardList component
const CardList = ({ cards = [] }) => {
  // Access to history for navigation
  const history = useHistory();
  // Access to route match for generating URLs
  const { url } = useRouteMatch();

  // Function to handle card deletion
  const handleDelete = async (cardId) => {
    // Prompt user for confirmation before deleting
    const response = window.confirm(
      "Delete this card?\n\nYou will not be able to recover it."
    );
    if (response) {
      // Call API to delete card
      await deleteCard(cardId);
      // Refresh the page after deletion
      history.go(0);
    }
  };

  // If there are cards to display
  if (cards.length > 0) {
    // Return an array of card elements
    return cards.map((card, index) => (
      <div key={index} className="card">
        <div className="card-body">
          <div className="row d-flex justify-content-between">
            {/* Front side content */}
            <p className="col-5">{card.front}</p>
            {/* Back side content */}
            <p className="col-5">{card.back}</p>
          </div>
          {/* Edit button */}
          <Link to={`${url}/cards/${card.id}/edit`}>
            <button className="btn btn-secondary m-3">
              {/* Pencil icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fillRule="currentColor"
                className="bi bi-pencil"
                viewBox="0 0 16 16"
              >
                {/* Pencil path */}
                <path d="..." />
              </svg>
              <i className="fas fa-edit"></i> Edit
            </button>
          </Link>
          {/* Delete button */}
          <button
            onClick={() => handleDelete(card.id)}
            name="delete"
            value={card.id}
            className="btn btn-danger ml-auto"
          >
            {/* Trash icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fillRule="currentColor"
              className="bi bi-trash-fill"
              viewBox="0 0 16 16"
            >
              {/* Trash path */}
              <path d="..." />
            </svg>
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    ));
  }
  // If no cards to display, show loading message
  return <p>Loading...</p>;
};

export default CardList;
