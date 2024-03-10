//index.js

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import NatureSpot from './NatureSpot';
import './css/style.css'; // Import CSS file



const App = () => {


  const [natureSpots, setNatureSpots] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, description, imageUrl } = event.target.elements;

    // create a new spot object
    const newSpot = {
      name: name.value,
      description: description.value,
      imageUrl: imageUrl.value,
    };

    setNatureSpots([...natureSpots, newSpot]);
  }

  return (

    <div>
      <h1> Nature Spots</h1>
      {/* Nature spots list */}
      <form onSubmit={handleSubmit}>
        <div className="form-group ">
          <input type='text' className='form-control' name='name' placeholder='Name' required />
        </div>
        <div className="form-group ">
          <input type='text' className='form-control' name='description' aria-describedby='emailHelp' placeholder='Description' required />
          <small id="emailHelp" className="form-text text-muted">What experience will you remember attached to this place?</small>

        </div>
        <div className="form-group">

          <input type='text' className='form-control' name='imageUrl' placeholder='Image URL' required />
        </div>
        <button className='btn-primary' type='submit'> Add Nature Spot </button>
      </form>

      {natureSpots.map((spot, index) => (
        <NatureSpot key={index} spot={spot} />
      ))}
    </div>

  );
};

ReactDOM.render(<App />, document.getElementById('app'));

