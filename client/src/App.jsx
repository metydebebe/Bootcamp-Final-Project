import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Components/HomePage/Home';
import ContactUs from './Components/ContactUsPage/ContactBody';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<ContactUs />} /> 

        {/* add other routes*/}
 
      </Routes>
    </Router>
  );
};

export default App;