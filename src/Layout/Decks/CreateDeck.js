// Import necessary modules
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";

// Define the CreateDeck component
const CreateDeck = () => {
  // State to hold new deck data
  const [newDeck, setNewDeck] = useState({ name: "", description: "" });
  const history = useHistory();

  // Handle form submission
  async function handleSubmit(event) {
    event.preventDefault();
    // Create a new deck using API call
    const response = await createDeck(newDeck);
    // Redirect to the newly created deck's page
    history.push(`/decks/${response.id}`);
  }

  // Handle form input changes
  const handleChange = (event) =>
    setNewDeck({ ...newDeck, [event.target.name]: event.target.value });

  // Return JSX for the CreateDeck component
  return (
    <div className="col-9 mx-auto">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item" aria-current="page">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>

      <div className="container">
        <div className="row">
          <h1>Create Deck</h1>
        </div>
      </div>
      {/* Deck creation form */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <br />
          <input
            name="name"
            type="text"
            placeholder="Deck Name"
            value={newDeck.name}
            onChange={handleChange}
            style={{ width: "100%" }}
            required
          />
          <div className="row"></div>
          <br />
          <label htmlFor="description">Description</label>
          <br />
          <textarea
            onChange={handleChange}
            name="description"
            placeholder="Brief description of the Deck"
            style={{ width: "100%" }}
            maxLength="200"
          />
        </div>
        <br />
        <Link to="/" className="btn btn-secondary mr-3">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateDeck;
