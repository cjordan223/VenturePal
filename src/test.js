import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import NatureSpot from './NatureSpot';
import './css/style.css'; // Import CSS file

const App = () => {
  const [natureSpots, setNatureSpots] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, description, imageUrl } = event.target.elements;

    const newSpot = {
      name: name.value,
      description: description.value,
      image: imageUrl.value,
    };

    setNatureSpots([...natureSpots, newSpot]);
  };

  return (
    <div>
      <h1>Nature Spots Showcase</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" required />
        <input type="text" name="description" placeholder="Description" required />
        <input type="text" name="imageUrl" placeholder="Image URL" required />
        <button type="submit">Add Nature Spot</button>
      </form>
      {natureSpots.map((spot, index) => (
        <NatureSpot key={index} spot={spot} />
      ))}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app')); dd