import React from 'react';
import './Home.css';
import Navbar from '../Header/Navbar';
import Footer from '../Footer/Footer';
import CarouselContainer from '../../Carousel';
import AboutUs from '../AboutUs/AboutUs';
import News from './News';



const Home = () => {

  return (
    <>
      <Navbar />
      <CarouselContainer />
      <AboutUs />
      <News />
      <Footer />
    </>
  );
}

export default Home;
