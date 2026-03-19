import React from 'react';

const Works = () => {
  const projects = [
    { title: "PROJECT 01", type: "GRAPHIC DESIGN", year: "2025" },
    { title: "PROJECT 02", type: "3D RENDERING", year: "2025" },
    { title: "PROJECT 03", type: "UI/UX DESIGN", year: "2026" }
  ];

  return (
    <section className="bg-background flex flex-col font-sans border-b-4 border-foreground" id="works">
      <div className="border-b-4 border-foreground p-8 md:p-14 lg:p-20 bg-primary">
        <h2 className="text-[18vw] font-black uppercase tracking-tighter leading-[0.75] text-primary-foreground m-0">
          WORKS
        </h2>
      </div>
      <div className="grid grid-cols-1">
        {projects.map((project, idx) => (
          <div key={idx} className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-4 border-foreground last:border-b-0 p-8 md:p-14 lg:p-20 hover:bg-foreground hover:text-background transition-colors cursor-pointer group">
            <h3 className="text-5xl md:text-7xl lg:text-[100px] font-black uppercase tracking-tighter mb-8 md:mb-0 leading-[0.85] group-hover:pl-8 transition-all duration-300">
              {project.title}
            </h3>
            <div className="flex flex-col text-left md:text-right">
              <span className="text-2xl md:text-4xl font-black tracking-widest">{project.type}</span>
              <span className="text-lg md:text-2xl font-bold tracking-tighter opacity-80">{project.year}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Works;
