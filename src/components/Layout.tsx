import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen font-sans selection:bg-primary selection:text-foreground">
      {/* Top Border Indicator */}
      <div className="fixed top-0 left-0 w-full h-2 bg-primary z-50" />
      
      {/* Mobile Top Header */}
      <header className="lg:hidden fixed top-0 left-0 w-full bg-background border-b-4 border-foreground z-40 px-6 py-4 flex justify-between items-center">
        <span className="font-black uppercase tracking-tighter text-xl">UNKNOWN<br/>CRYSTAL</span>
        <div className="flex gap-4 font-black text-xs uppercase tracking-widest">
          <a href="#hero">INTRO</a>
          <a href="#about">ABOUT</a>
          <a href="#works">WORKS</a>
          <a href="#chat">CHAT</a>
          <a href="#contact">CONTACT</a>
        </div>
      </header>

      {/* Sidebar Navigation (Desktop) */}
      <nav className="fixed left-0 top-0 h-full w-16 border-r-4 border-foreground bg-background hidden lg:flex flex-col items-center justify-between py-12 z-40 uppercase font-black text-sm [writing-mode:vertical-rl] tracking-widest">
        <span>© 2026 UNKNOWNCRYSTAL</span>
        <div className="flex gap-12">
          <a href="#hero" className="hover:text-primary transition-colors">INTRO</a>
          <a href="#about" className="hover:text-primary transition-colors">ABOUT</a>
          <a href="#works" className="hover:text-primary transition-colors">WORKS</a>
          <a href="#chat" className="hover:text-primary transition-colors">DIGITAL TWIN</a>
          <a href="#contact" className="hover:text-primary transition-colors">CONTACT</a>
        </div>
        <span>SWISS STYLE PERSONAL PAGE</span>
      </nav>

      {/* Main Content Area */}
      <main className="lg:pl-16 pt-[80px] lg:pt-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="lg:pl-12 p-12 bg-foreground text-background text-center uppercase font-black tracking-widest text-xs border-t-2 border-foreground">
        © 2026 UnknownCrystal | Made with AI & Coffee | Swiss International Style
      </footer>
    </div>
  );
};

export default Layout;
