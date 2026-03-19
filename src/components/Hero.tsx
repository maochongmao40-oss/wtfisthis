import React from 'react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-end p-6 md:p-12 bg-primary overflow-hidden border-b-4 border-foreground">
      <div className="absolute top-24 left-6 md:left-12 flex flex-col gap-4 z-20">
        <div className="w-32 h-32 md:w-48 md:h-48 bg-background border-4 border-foreground overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <img 
            src="https://miaoda-site-img.cdn.bcebos.com/images/MiaoTu_cd5f4087-5b6f-46d7-9c96-376e15fa123d.jpg" 
            alt="UnknownCrystal Avatar" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="bg-foreground text-background inline-block px-4 py-1 font-black uppercase text-xs tracking-widest self-start">
          Digital Twin Active
        </div>
      </div>
      
      <div className="max-w-6xl z-10 mt-48">
        <h1 className="text-4xl md:text-[90px] font-black uppercase tracking-tighter leading-[0.75] mb-8 select-none">
          Unknown<br /><span className="text-background stroke-2 stroke-foreground" style={{ WebkitTextStroke: '2px black' }}>Crystal</span>
        </h1>
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-end">
          <p className="text-lg md:text-2xl font-black max-w-2xl leading-none uppercase">
            一个正在学习用 AI 参与艺术创作（包括平面视觉，音乐，游戏）的大学生
          </p>
          <div className="hidden md:block w-32 h-[2px] bg-foreground mb-4" />
        </div>
      </div>

      {/* Swiss Style Decorative Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full border-l-2 border-foreground hidden md:block opacity-20 bg-grid-pattern bg-grid-size">
        <img 
          src="https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_7f637a8f-3206-47d9-9619-8352ab6eb692.jpg" 
          alt="Decorative Background" 
          className="w-full h-full object-cover grayscale"
        />
      </div>
    </section>
  );
};

export default Hero;
