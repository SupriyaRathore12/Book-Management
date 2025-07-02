import React from 'react';
import about1 from '../assets/about1.png';
import './About.css';

const About = () => {
  return (
    <div className="about-section">
      <div className="about-content">
        <div className="text-side">
          <h1>About Us</h1>
          <p>
            <strong>BookMngt</strong> is your smart book management system! Whether you're a student or a librarian, this platform helps you manage books efficiently and keep track of everything in one place.
          </p>
          <p>
            With easy book entry, status tracking, and a responsive interface, BookMate makes your book handling smoother and smarter.
          </p>
          <button className="about-btn">Explore More</button>
        </div>
        <div className="image-side">
          <img src={about1} alt="About BookMate" />
        </div>
      </div>
      <p className='copy'> &copy; 2025 BookMngt. All rights reserved.</p>
                 
    </div>
  );
};

export default About;
