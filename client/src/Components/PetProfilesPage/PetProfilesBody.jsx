import React, { useState, useEffect } from 'react';
import Header from '../HomePage/Header'; 
import Navigation from '../HomePage/Navigation'; 
import Footer from '../HomePage/Footer'; 
import bobImage from '../../assets/bob.jpg';
import dililaImage from '../../assets/dilila.jpg';
import gregory from '../../assets/gregory.jpg';
import khaiImage from '../../assets/khai.jpg';
import poppyImage from '../../assets/poppy.jpg';
import robertImage from '../../assets/robert.jpg';
import princessImage from '../../assets/princess.jpg';
import tinaImage from '../../assets/tina.jpg';
import defaultImage from '../../assets/default.jpg'; 

const PetProfilesBody = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [petType, setPetType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('http://localhost:3000/pets');
        if (!response.ok) {
          throw new Error('Failed to fetch pets');
        }
        const data = await response.json();
        setPets(data);
        setFilteredPets(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setPetType(selectedType);
    if (selectedType) {
      const filtered = pets.filter(pet => pet.pet_type === selectedType);
      setFilteredPets(filtered);
    } else {
      setFilteredPets(pets);
    }
  };

  if (loading) {
    return <p>Loading pets...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const getImageSrc = (pet) => {
    switch (pet.name.toLowerCase()) {
      case 'khai':
        return khaiImage;
      case 'dilila':
        return dililaImage;
      case 'bob':
        return bobImage;
      case 'gregory':
        return gregory;
      case 'poppy':
        return poppyImage;
      case 'robert':
        return robertImage;
      case 'princess':
        return princessImage;
      case 'tina':
        return tinaImage;
      default:
        return defaultImage; // Use the default image directly
    }
  };

  return (
    <div className="container mt-4">
      <h2>Pet Profiles</h2>
      <div className="mb-3">
        <label htmlFor="petType" className="form-label">Select Pet Type:</label>
        <select
          id="petType"
          className="form-select"
          value={petType}
          onChange={handleTypeChange}
        >
          <option value="">All</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
        </select>
      </div>

      <div className="row">
        {filteredPets.map(pet => (
          <div className="col-md-4 mb-4" key={pet.pet_id}>
            <div className="card">
              <img
                src={getImageSrc(pet)}
                alt={pet.name}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }} 
              />
              <div className="card-body">
                <h5 className="card-title">{pet.name}</h5>
                <p className="card-text">Type: {pet.pet_type}</p>
                <p className="card-text">Age: {pet.age}</p>
                <p className="card-text">Description: {pet.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PetProfiles = () => {
  return (
    <div>
      <Header />
      <Navigation />
      <PetProfilesBody />
      <Footer />
    </div>
  );
};

export default PetProfiles;