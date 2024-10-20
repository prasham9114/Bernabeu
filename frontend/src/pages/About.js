import React from 'react';
import '../Styles/About.css';

function About() {
  return (
    <div className="about-page"> {/* Main container for the about page */}
      <div className="about-content"> {/* Content wrapper for about sections */}
        <section className="about-section"> {/* Section for the story */}
          <h2>Our Story</h2>
          <p>Founded in 2024, The Bernabeu started with a simple mission: to provide football enthusiasts with high-quality gear from their favorite teams. What began as a small online store has grown into a trusted destination for football fans worldwide.</p>
        </section>
        <section className="about-section"> {/* Section for the promise */}
          <h2>Our Promise</h2>
          <p>At Bernabeu, we're committed to offering authentic, top-quality football merchandise. From official team kits to accessories, we ensure that every product meets the highest standards of quality and authenticity.</p>
        </section>
        <section className="about-section"> {/* Section for community engagement */}
          <h2>Community Engagement</h2>
          <p>We're more than just a shop - we're part of the football community. Bernabeu actively supports local football initiatives and youth programs, helping to grow the sport we all love.</p>
        </section>
      </div>
    </div>
  );
}

export default About; // Exporting the About component
