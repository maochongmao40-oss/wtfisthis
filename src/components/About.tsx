import React from 'react';

const About = () => {
  const interests = [
    "VIBE CODING", "OUTDOOR SPORTS", "CONTEMPORARY ART", "TECHNO MUSIC", "CYBERPUNK 2077", 
    "INTERNATIONAL EXCHANGE", "SOCIAL MEDIA", "URBAN EXPLORATION", "JAZZ", "HOUSE MUSIC", 
    "LONG DISTANCE RUNNING", "DOCUMENTARIES", "INDIE FILMS", "ANTHROPOLOGY", "LGBTQ+ RIGHTS", "MEDITATION"
  ];

  const infoGroups = [
    { label: "IDENTITY", content: "UNIVERSITY STUDENT" },
    { label: "CURRENT FOCUS", content: "VIBE CODING, EXPLORING BLENDER, MERGING AI WITH VISUAL ARTS" },
    { label: "EXPERTISE", content: "ART DESIGN, GAME DESIGN, MARKETING, GRAPHIC DESIGN" }
  ];

  return (
    <section className="bg-background flex flex-col font-sans">
      <div className="border-b-4 border-foreground p-6 md:p-12 bg-primary">
        <h2 className="text-[20vw] font-black uppercase tracking-tighter leading-[0.75] text-primary-foreground m-0">
          ABOUT
        </h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 border-b-4 border-foreground">
        <div className="border-b-4 lg:border-b-0 lg:border-r-4 border-foreground flex flex-col text-left">
          {infoGroups.map((group, index) => (
            <div key={index} className="border-b-4 border-foreground p-8 md:p-14 lg:p-20 last:border-b-0 flex flex-col justify-start">
              <h4 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-primary mb-4 leading-none">{group.label}</h4>
              <p className="text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-tight leading-[1.4] text-foreground">{group.content}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-background p-8 md:p-14 lg:p-20 overflow-hidden">
          <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-16 pb-6 border-b-4 border-foreground text-primary">INTERESTS</h3>
          <div className="flex flex-wrap gap-x-6 gap-y-4">
            {interests.map((interest, index) => (
              <span key={index} className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight hover:text-primary transition-colors cursor-default leading-tight">
                {interest.replace(' ', '\u00A0')}
                {index < interests.length - 1 && <span className="text-foreground/30 mx-4">/</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
