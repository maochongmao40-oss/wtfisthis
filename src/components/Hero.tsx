import React from 'react';

const Hero = () => {
  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-background text-foreground border-b-4 border-foreground">
      <div className="col-span-12 lg:col-span-8 p-6 md:p-12 border-b-4 lg:border-b-0 lg:border-r-4 border-foreground flex flex-col justify-between relative overflow-hidden">
        <div className="w-32 h-32 md:w-64 md:h-64 bg-foreground mb-12 overflow-hidden border-4 border-foreground z-10">
          <img 
            src="https://miaoda-site-img.cdn.bcebos.com/images/MiaoTu_cd5f4087-5b6f-46d7-9c96-376e15fa123d.jpg" 
            alt="UnknownCrystal Avatar" 
            className="w-full h-full object-cover grayscale contrast-125"
          />
        </div>
        <h1 className="text-[17vw] lg:text-[11vw] font-black uppercase tracking-tighter leading-[0.75] z-10 break-words mt-auto">
          UNKNOWN<br/>CRYSTAL
        </h1>
      </div>
      
      <div className="col-span-12 lg:col-span-4 flex flex-col relative overflow-hidden bg-primary text-primary-foreground border-t-4 lg:border-t-0 border-foreground">
        <div className="absolute inset-0 opacity-40 bg-checkerboard-fade pointer-events-none mix-blend-multiply" />
        <div className="p-6 md:p-12 z-10 flex-1 flex flex-col justify-between lg:justify-end">
          <a href="#chat" className="bg-foreground text-background inline-flex items-center gap-4 px-6 md:px-8 py-3 md:py-4 font-black uppercase text-lg md:text-2xl tracking-widest self-start mb-12 lg:mb-24 border-4 border-foreground hover:bg-primary hover:text-primary-foreground hover:scale-[1.02] transition-transform cursor-pointer z-50">
            TALK TO DIGITAL TWIN <span className="text-2xl md:text-4xl animate-bounce">↓</span>
          </a>
          <p className="text-3xl md:text-5xl font-black leading-[1.05] uppercase tracking-tighter mix-blend-color-burn">
            A UNIVERSITY STUDENT EXPLORING THE INTERSECTION OF ARTIFICIAL INTELLIGENCE AND CREATIVE EXPRESSION. FOCUSING ON GRAPHIC DESIGN, MUSIC PRODUCTION, AND GAME DEVELOPMENT.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
