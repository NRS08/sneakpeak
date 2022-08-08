import React from 'react';
import { SlideShow } from './SlideShow';
import { Trending } from './Trending/Trending';
import Navbar from './Navbar';
import Footer from './Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <SlideShow />
      <Trending />
      <Footer />
    </>
  );
};
export default Home;
