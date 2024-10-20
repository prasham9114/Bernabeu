import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Home.css'; // Importing CSS styles for the Home component
import kits from '../images/kits.jpg'; // Importing images for categories and products
import footwear from '../images/footwear.jpg';
import footballs from '../images/footballs.jpg';
import NikeSuper from '../images/NikeSuperFlyElectric.jpg';
import AdidasPredator from '../images/AdidasPredatorEliteFirm.jpg';
import RMA from '../images/RMA2425.jpg';
import BAR from '../images/BAR2425.jpg';
import NikeStocks from '../images/NikeStocks.jpg';
import PredGloves from '../images/AdidasPredatorGLoves.jpg';

function Home() {
  return (
    <div className="home">
      {/* Hero section with a welcome message and call-to-action button */}
      <header className="hero">
        <h1>Welcome to The Bernabeu</h1>
        <p>Your one-stop shop for all things football</p>
        <Link to="/footwear" className="cta-button">Shop Now</Link>
      </header>

      {/* Featured Categories section */}
      <section className="featured-categories">
        <h2>Featured Categories</h2>
        <div className="category-grid">
          {/* Link to Kits category */}
          <Link to='/kits'>
            <div className="category-item">
              <img src={kits} alt="Football Kits" />
              <h3>Kits</h3>
            </div>
          </Link>
          {/* Link to Footwear category */}
          <Link to='/footwear'>
            <div className="category-item">
              <img src={footwear} alt="Football Footwear" />
              <h3>Footwear</h3>
            </div>
          </Link>
          {/* Link to Footballs category */}
          <Link to='/footballs'>
            <div className="category-item">
              <img src={footballs} alt="Footballs" />
              <h3>Footballs</h3>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Products section */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="category-grid">
          {/* Link to Real Madrid kit */}
          <Link to='/kits'>
            <div className="category-item">
              <img src={RMA} alt="Real Madrid 24/25 Kit" />
              <h3>Real Madrid 24/25</h3>
            </div>
          </Link>
          {/* Link to Nike Mercurial Superfly product */}
          <Link to='/footwear'>
            <div className="category-item">
              <img src={NikeSuper} alt="Nike Mercurial Superfly 10 Elite Electric" />
              <h3>Mercurial Superfly 10 Elite Electric</h3>
            </div>
          </Link>
          {/* Link to Nike Stockings product */}
          <Link to='/accessories'>
            <div className="category-item">
              <img src={NikeStocks} alt="Nike Stockings" />
              <h3>Nike Stockings</h3>
            </div>
          </Link>
        </div>
        <div className="category-grid">
          {/* Link to Barcelona kit */}
          <Link to='/kits'>
            <div className="category-item">
              <img src={BAR} alt="Barcelona 24/25 Kit" />
              <h3>Barcelona Home 24/25</h3>
            </div>
          </Link>
          {/* Link to Adidas Predator product */}
          <Link to='/footwear'>
            <div className="category-item">
              <img src={AdidasPredator} alt="Adidas Predator Elite Firm" />
              <h3>Adidas Predator Elite Firm</h3>
            </div>
          </Link>
          {/* Link to Adidas Predator Gloves product */}
          <Link to='/accessories'>
            <div className="category-item">
              <img src={PredGloves} alt="Adidas Predator Gloves" />
              <h3>Adidas Predator Gloves</h3>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
