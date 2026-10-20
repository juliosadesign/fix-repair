import React from 'react';
import { Sun, Moon, Sparkles, ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/75 dark:bg-[#0A0A0A]/75 border-b border-apple-border dark:border-white/10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Lado Esquerdo: Espaço da Logomarca Sem Fundo + Nome Fix Repair */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center overflow-hidden p-1.5 transition-transform group-hover:scale-105">
            <img 
              src="/logo-fix-repair.png" 
              alt="Fix Repair Logo" 
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <Sparkles className="w-4 h-4 text-blue-500 hidden" />
          </div>
          <span className="font-semibold text-lg tracking-tight">
            Fix Repair
          </span>
        </a>

        {/* Centro: Navegação Limpa */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-apple-muted dark:text-dark-muted">
          <a href="#como-funciona" className="hover:text-apple-text dark:hover:text-white transition-colors">
            Experiência
          </a>
          <a href="#trilhas" className="hover:text-apple-text dark:hover:text-white transition-colors">
            Trilhas de Estudo
          </a>
          <a href="#cards" className="hover:text-apple-text dark:hover:text-white transition-colors">
            Cards Rápidos
          </a>
        </nav>

        {/* Lado Direito: Alternador Dark/Light + CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className="p-2.5 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-transparent dark:border-white/10 transition-all"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-apple-text" />
            )}
          </button>

          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-apple-text text-white dark:bg-white dark:text-black hover:opacity-90 transition-all shadow-sm">
            <span>Entrar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </header>
  );
}