import React from 'react';
import Header from '../HomePage/Header'; 
import Navigation from '../HomePage/Navigation'; 
import Footer from '../HomePage/Footer'; 

const ContactBody = () => {
  return (
    <div className="container-fluid my-4">
      <div className="row">
        {/* Contact Us Form  */}
        <div className="col-md-6 bg-light d-flex flex-column rounded-5 bg-secondary-subtle m-3 p-3">
          <h2>Contact Us</h2>
          <form>
            <label htmlFor="fullName">Full Name:</label>
            <input type="text" id="fullName" className="form-control" />

            <label htmlFor="email">Email Address:</label>
            <input type="email" id="email" className="form-control" />

            <label htmlFor="subject">Subject:</label>
            <input type="text" id="subject" className="form-control" />

            <label htmlFor="message">Message:</label>
            <textarea id="message" className="form-control"></textarea>

            <button type="submit" className="btn btn-primary mt-3">Send</button>
          </form>
        </div>

        {/* FAQs Section (Right) */}
        <div className="col-md-6 rounded-5 bg-warning-subtle m-3 p-3">
          <h2>FAQs</h2>
          <div className='faqs'>
            <p><b className='fs-5'>Question 1</b></p>
            <p>Lorem ipsum odor amet, consectetuer adipiscing elit.</p>
            <p><b>Answer</b></p>
            <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Fermentum augue malesuada duis neque tortor commodo sagittis. Praesent purus massa dignissim nunc curae rutrum molestie. Etiam in sociosqu ullamcorper faucibus vivamus.</p>
            <p><b className='fs-5'>Question 2</b></p>
            <p>Lorem ipsum odor amet, consectetuer adipiscing elit.</p>
            <p><b>Answer</b></p>
            <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Fermentum augue malesuada duis neque tortor commodo sagittis. Praesent purus massa dignissim nunc curae rutrum molestie. Etiam in sociosqu ullamcorper faucibus vivamus.</p>
            <p><b className='fs-5'>Question 3</b></p>
            <p>Lorem ipsum odor amet, consectetuer adipiscing elit.</p>
            <p><b>Answer</b></p>
            <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Fermentum augue malesuada duis neque tortor commodo sagittis. Praesent purus massa dignissim nunc curae rutrum molestie. Etiam in sociosqu ullamcorper faucibus vivamus.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactUs = () => {
  return (
    <div>
      <Header />       
      <Navigation />   
      <ContactBody />  
      <Footer />       
    </div>
  );
};

export default ContactUs;