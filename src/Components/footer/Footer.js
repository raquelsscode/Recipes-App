import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './Footer.css';

const Footer = () => (
  <div data-testid="footer" className="styles-footer">
    <Link to="/drinks">
      <img src={ drinkIcon } alt="Drink Icon" data-testid="drinks-bottom-btn" />
    </Link>
    <Link to="/explore">
      <img src={ exploreIcon } alt="Explore Icon" data-testid="explore-bottom-btn" />
    </Link>
    <Link to="/foods">
      <img src={ mealIcon } alt="Meal Icon" data-testid="food-bottom-btn" />
    </Link>
  </div>
);

export default Footer;
