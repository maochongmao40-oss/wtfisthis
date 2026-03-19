import React from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Works from '@/components/Works';
import Chat from '@/components/Chat';
import Contact from '@/components/Contact';
import Layout from '@/components/Layout';

const Home = () => {
  return (
    <Layout>
      <div id="hero">
        <Hero />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="works">
        <Works />
      </div>
      <div id="chat">
        <Chat />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </Layout>
  );
};

export default Home;
