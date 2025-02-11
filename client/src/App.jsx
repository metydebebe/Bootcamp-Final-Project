import React from 'react';
import Home from './Components/HomePage/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/home" element={<Home />} />
        {/* add other routes*/}
 
      </Routes>
    </Router>
  );
};

export default App;