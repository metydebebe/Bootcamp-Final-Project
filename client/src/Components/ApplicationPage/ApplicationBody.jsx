import React, { useState } from 'react';
import Header from '../HomePage/Header'; 
import Navigation from '../HomePage/Navigation'; 
import Footer from '../HomePage/Footer'; 

const ApplicationBody = () => {
  const [formData, setFormData] = useState({
    pet_id: '',
    full_name: '',
    email: '',
    phone: '',
    address: '',
    preferred_pet_type: '',
    age_preference: '',
    gender_preference: '',
    previous_pet_ownership: false,
    experience_description: '',
    motivation: '',
    special_needs: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Hardcoded API URL for local development
  const url = 'http://localhost:3000/applications';

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    // Validate required fields
    const requiredFields = ['pet_id', 'full_name', 'email', 'phone', 'address'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        setError(`Missing required field: ${field}`);
        setIsLoading(false);
        return;
      }
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to submit application');
      }

      const data = await response.json();
      setSuccessMessage(data.message);
      setFormData({ // Reset form after submission
        pet_id: '',
        full_name: '',
        email: '',
        phone: '',
        address: '',
        preferred_pet_type: '',
        age_preference: '',
        gender_preference: '',
        previous_pet_ownership: false,
        experience_description: '',
        motivation: '',
        special_needs: '',
      });
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="container-fluid">
      <h2 className='container-fluid mt-4 p-2'>Apply Now!</h2>
      <h5 className='text-body-secondary mb-5 p-2'>Get a new companion today!</h5>
      <div className=' container p-3 mt-3 mb-5 bg-warning-subtle'>
        <h2>Application Form</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        
        {isLoading ? (
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-3">
              <label>Pet ID:</label>
              <input type="text" name="pet_id" value={formData.pet_id} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
              <label>Full Name:</label>
              <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
              <label>Email Address:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
              <label>Phone:</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="form-control" />
            </div>
            <div className="mb-3">
              <label>Address:</label>
              <textarea name="address" value={formData.address} onChange={handleChange} className="form-control" required></textarea>
            </div>
            <div className="mb-3">
              <label>Preferred Pet Type:</label>
              <input type="text" name="preferred_pet_type" value={formData.preferred_pet_type} onChange={handleChange} className="form-control" />
            </div>
            <div className="mb-3">
              <label>Age Preference:</label>
              <input type="text" name="age_preference" value={formData.age_preference} onChange={handleChange} className="form-control" />
            </div>
            <div className="mb-3">
              <label>Gender Preference:</label>
              <input type="text" name="gender_preference" value={formData.gender_preference} onChange={handleChange} className="form-control" />
            </div>
            <div className="mb-3">
              <label>Have you owned pets before?</label>
              <select name="previous_pet_ownership" value={formData.previous_pet_ownership} onChange={handleChange} className="form-control">
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
            {formData.previous_pet_ownership && (
              <div className="mb-3">
                <label>If yes, please describe your experience:</label>
                <textarea name="experience_description" value={formData.experience_description} onChange={handleChange} className="form-control"></textarea>
              </div>
            )}
            <div className="mb-3">
              <label>Why do you want to adopt this pet?</label>
              <textarea name="motivation" value={formData.motivation} onChange={handleChange} className="form-control" required></textarea>
            </div>
            <div className="mb-3">
              <label>Any special needs or considerations?</label>
              <textarea name="special_needs" value={formData.special_needs} onChange={handleChange} className="form-control"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

const Applications = () => {
  return (
    <div>
      <Header />       
      <Navigation />   
      <ApplicationBody />  
      <Footer />       
    </div>
  );
};

export default Applications;