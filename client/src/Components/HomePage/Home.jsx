import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import img1 from '../../assets/img1.png'; 
import img2 from '../../assets/img2.png'; 



// Header Component
const Header = () => {
  return (
    <header className="bg-warning-subtle  text-center py-4 rounded-4">
      <h2 className="text-dark">Welcome! Find Your New Pet Today!</h2>
    </header>
  );
};

// Navigation Component
const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-warning rounded-4">
      <div className="container">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/home">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/petProfiles">Pet Profiles</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/events">Events</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/contact">Contact Us</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/apply">Apply Now</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

// HomeBody Component
const HomeBody = () => {
  const [dogImage, setDogImage] = useState('');

  const handleDogClick = async () => {
    try {
      const response = await axios.get('https://dog.ceo/api/breeds/image/random');
      setDogImage(response.data.message);
    } catch (error) {
      console.error('Error fetching dog image:', error);
    }
  };

  return (
    <div className="container-fluid my-4 mx-0">
      {/* Ethio-Pets Shelter and What We Do */}
      <div className="bg-warning-subtle p-4 my-4 row rounded-5">
      <div className="col-md-6">
        <h2 className='pb-3'>Ethio-Pets Shelter</h2>
        <h4 className="text-muted">WHAT WE DO</h4>
        <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Quisque porttitor tellus lacus tristique magnis. Per posuere facilisis auctor vestibulum natoque maecenas vestibulum natoque. Elementum per eu elit ex torquent accumsan. Sagittis egestas facilisis fusce iaculis libero amet tortor augue. Felis viverra ornare fringilla sem praesent donec turpis lectus. Justo nisi nisl dapibus velit penatibus non et. Fringilla at phasellus leo faucibus nullam dapibus amet ipsum nullam.</p>
        <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Quisque porttitor tellus lacus tristique magnis. Per posuere facilisis auctor vestibulum natoque maecenas vestibulum natoque. Elementum per eu elit ex torquent accumsan. Sagittis egestas facilisis fusce iaculis libero amet tortor augue. Felis viverra ornare fringilla sem praesent donec turpis lectus. Justo nisi nisl dapibus velit penatibus non et. Fringilla at phasellus leo faucibus nullam dapibus amet ipsum nullam.</p>
      </div>

      <div className="col-md-6">
        <img src={img1} alt="homeImg1" className="img-fluid " /> 
      </div>
    </div>


    {/* Services and Steps Section */}
    <div className="row my-4">
      
      {/* Services */}
      <div className="col-md-6 bg-light d-flex flex-column rounded-5 bg-warning-subtle">
        <h2 className="d-block p-3">Services We Provide</h2>
          <ul className="mt-3">
            <li>Lorem ipsum odor amet, consectetuer adipiscing elit.</li>
            <li>Tincidunt rhoncus habitant taciti per porttitor urna nunc primis luctus.</li>
            <li>Taciti duis ut maecenas, aliquet aptent dapibus.</li>
            <li>Iaculis nam penatibus nulla sit vel fusce.</li>
            <li>Nulla metus dapibus vestibulum at fames posuere.</li>
            <li>Nisl aliquet montes rutrum a aptent est diam.</li>
            <li>Libero arcu parturient bibendum magnis mi leo mus aliquam.</li>
          </ul>
  
          <div w-3 h-3>
            <img src={img2} alt="homeImg2" className="img-fluid p-5 custom-img" /> 
          </div>


        </div>

        {/* Steps */}
        <div className="col-md-6 ">
          <ul className="list-group rounded-5 ">
            <li className="list-group-item m-4 p-3">
              <b className="d-block fs-5">Step 1</b> Navigate to the Pet Profiles on the Navigation Bar
            </li>
            <li className="list-group-item m-4 p-3">
              <b className="d-block fs-5">Step 2</b> Choose a Pet
            </li>
            <li className="list-group-item m-4 p-3">
              <b className="d-block fs-5">Step 3</b>
               Navigate to the Apply Link on the Navigation Bar
            </li>
            <li className="list-group-item m-4 p-3">
              <b className="d-block fs-5">Step 4</b> Navigate to the Apply Link on the Navigation Bar
            </li>
            <li className="list-group-item m-4 p-3">
              <b className="d-block fs-5">Step 5</b> Fill Out the Form
            </li>
            <li className="list-group-item m-4 p-3">
              <b className="d-block fs-5">Step 6</b> Submit!
            </li>
          </ul>
        </div>

        {/* FeaturedPets Component */}
        <div className="text-center d-flex flex-column align-items-center">
          <h2 className='m-4'>Our Featured Dogs</h2>
          <button onClick={handleDogClick} className="btn btn-warning mb-3">Get Featured Dog</button>
          {dogImage && (
            <img src={dogImage} alt="Featured Dog" className="img-fluid" style={{ maxWidth: '80%' }} />
          )}
        </div>

      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-warning-subtle text-center py-4">
      <p className='fs-5 custom-animation p-2'><b>Contact Us</b></p>
      <div>
        <p>Email: ethiopets@gmail.com</p>
        <p>Tel: +251 977 76 7879</p>
        <p><b>Address</b> 123 Pets Ave Addis Ababa, Ethiopia Postal Code: 1212</p>
      </div>
      <div>
        <p>© 2023 Ethio-Pets Shelter. All rights reserved.</p>
      </div>
    </footer>
  );
};

// Home Component
const Home = () => {
  return (
    <div>
      <Header />
      <Navigation />
      <HomeBody />
      <Footer />
    </div>
  );
};

export default Home;


