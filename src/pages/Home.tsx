import React from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Chat from '@/components/Chat';
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
      <div id="chat">
        <Chat />
      </div>
    </Layout>
  );
};

export default Home;
