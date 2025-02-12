import React from 'react';

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

export default Footer;
