import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import type { PageId } from '../../types';
import logo from '../../assets/logo.png';

type SiteHeaderProps = {
  onNavigate: (page: PageId) => void;
};

const NAV_ITEMS: PageId[] = ['home', 'about', 'products', 'services', 'contact'];

export default function SiteHeader({ onNavigate }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (page: PageId) => {
    setIsMenuOpen(false);
    onNavigate(page);
  };

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-[1200px] z-50 transition-all duration-500 rounded-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.05)] ${
          scrolled ? 'bg-white/40 backdrop-blur-2xl py-3' : 'bg-white/10 backdrop-blur-md py-4'
        }`}
      >
        <div className="px-6 flex items-center justify-between">
          <button onClick={() => handleNavigate('home')} className="flex items-center gap-2 group hover:opacity-80 active:scale-95 transition-all flex-1">
            <div className="w-8 h-8 overflow-hidden rounded-sm bg-white/80 p-0.5 shadow-sm">
              <img src={logo} alt="DAP Tech Sol logo" className="h-full w-full object-contain" />
            </div>
            <div className="font-display font-black uppercase italic tracking-tighter leading-none text-xl text-primary">
              TVC.
            </div>
          </button>

          <button
            className="flex-none text-primary ml-auto flex items-center gap-2 hover:text-primary/80 active:scale-90 transition-all"
            onClick={() => setIsMenuOpen(true)}
          >
            <span className="font-mono text-xs font-bold uppercase tracking-widest hidden md:inline-block mr-2">Menu</span>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] md:w-1/2 z-[60] bg-background flex flex-col justify-center items-center text-center gap-16 shadow-2xl shadow-black/50 border-l border-primary/10"
            >
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-8 right-8 p-4 border border-primary/20 text-primary rounded-full hover:bg-primary hover:text-white hover:border-primary active:scale-90 transition-all"
              >
                <X size={20} />
              </button>
              <div className="flex flex-col gap-10">
                {NAV_ITEMS.map((id) => (
                  <button
                    key={id}
                    onClick={() => handleNavigate(id)}
                    className="font-display text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-primary hover:text-primary/60 active:scale-95 transition-all"
                  >
                    {id}
                  </button>
                ))}
              </div>
              <div className="absolute bottom-12 font-mono text-[10px] uppercase tracking-[0.4em] text-primary/30">
                Precision Engineered in India
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
