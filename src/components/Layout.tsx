import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen font-sans selection:bg-primary selection:text-foreground">
      {/* Top Border Indicator */}
      <div className="fixed top-0 left-0 w-full h-2 bg-primary z-50" />
      
      {/* Mobile Top Header */}
      <header className="lg:hidden fixed top-0 left-0 w-full bg-background border-b-2 border-foreground z-40 px-6 py-4 flex justify-between items-center">
        <span className="font-black uppercase tracking-tighter">UnknownCrystal</span>
        <div className="flex gap-4 font-black text-[10px] uppercase">
          <a href="#hero">Intro</a>
          <a href="#about">About</a>
          <a href="#chat">Chat</a>
        </div>
      </header>

      {/* Sidebar Navigation (Desktop) */}
      <nav className="fixed left-0 top-0 h-full w-12 border-r-2 border-foreground bg-background hidden lg:flex flex-col items-center justify-between py-12 z-40 uppercase font-black text-xs [writing-mode:vertical-rl] tracking-widest">
        <span>© 2026 UnknownCrystal</span>
        <div className="flex gap-12">
          <a href="#hero" className="hover:text-primary transition-colors">Intro</a>
          <a href="#about" className="hover:text-primary transition-colors">About</a>
          <a href="#chat" className="hover:text-primary transition-colors">Digital Twin</a>
        </div>
        <span>Swiss Style Personal Page</span>
      </nav>

      {/* Main Content Area */}
      <main className="lg:pl-12 pt-[60px] lg:pt-0">
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
