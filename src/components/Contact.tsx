import React from 'react';

const Contact = () => {
  const links = ["EMAIL", "INSTAGRAM", "BEHANCE", "GITHUB"];

  return (
    <section className="bg-primary flex flex-col font-sans border-b-4 border-foreground" id="contact">
      <div className="border-b-4 border-foreground p-8 md:p-14 lg:p-20 bg-background text-foreground">
        <h2 className="text-[18vw] font-black uppercase tracking-tighter leading-[0.75] m-0">
          CONTACT
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-foreground gap-1">
        {links.map((link, i) => (
          <a key={i} href="#" className="bg-primary p-12 lg:p-20 hover:bg-background hover:text-foreground transition-colors text-center flex items-center justify-center min-h-[300px] cursor-pointer">
            <span className="text-4xl md:text-5xl font-black uppercase tracking-tighter">{link}</span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Contact;
