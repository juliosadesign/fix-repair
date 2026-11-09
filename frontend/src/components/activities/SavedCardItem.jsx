import React, { useState } from 'react';
import { BookmarkCheck, Code2, CheckSquare, Eye, X, Sparkles } from 'lucide-react';

export function SavedCardItem({ card }) {
  const [isOpen, setIsOpen] = useState(false);
  const isCode = card.type === 'Algoritmo Inteiro';

  return (
    <>
      {/* Card Compacto no Dashboard */}
      <div 
        onClick={() => setIsOpen(true)}
        className="group cursor-pointer rounded-3xl p-6 bg-apple-card dark:bg-dark-card border border-apple-border dark:border-dark-border hover:border-blue-500/50 dark:hover:border-blue-400/40 transition-all duration-300 flex flex-col justify-between gap-4 shadow-sm hover:shadow-md"
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
              {card.lang}
            </span>
            <span className="text-[11px] text-apple-muted dark:text-dark-muted flex items-center gap-1">
              {isCode ? <Code2 className="w-3.5 h-3.5" /> : <CheckSquare className="w-3.5 h-3.5" />}
              {card.type}
            </span>
          </div>

          <h4 className="font-semibold text-base group-hover:text-blue-500 transition-colors">
            {card.title}
          </h4>

          <p className="text-xs text-apple-muted dark:text-dark-muted line-clamp-2 leading-relaxed">
            {card.questionSummary}
          </p>
        </div>

        <div className="pt-3 border-t border-apple-border/60 dark:border-white/5 flex items-center justify-between text-xs">
          <span className="text-emerald-500 font-medium flex items-center gap-1">
            <BookmarkCheck className="w-3.5 h-3.5" />
            Salvo no Cofre
          </span>
          <span className="text-apple-muted dark:text-dark-muted group-hover:text-apple-text dark:group-hover:text-white flex items-center gap-1 transition-colors">
            <Eye className="w-3.5 h-3.5" />
            Revisar
          </span>
        </div>
      </div>

      {/* Modal Apple Blur para Revisar o Card */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-lg rounded-3xl bg-apple-card dark:bg-[#161618] border border-apple-border dark:border-white/15 p-6 sm:p-8 shadow-2xl space-y-5">
            
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider">
                  {card.track} • {card.lang}
                </span>
                <h3 className="text-xl font-bold mt-1">{card.title}</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-medium text-apple-muted dark:text-dark-muted">
                Problema Original:
              </span>
              <p className="text-sm leading-relaxed">
                {card.questionSummary}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-medium text-apple-muted dark:text-dark-muted">
                Sua Solução Validada:
              </span>
              <pre className="p-4 rounded-2xl bg-[#0D0D0F] text-emerald-400 font-mono text-xs overflow-x-auto border border-white/10">
                <code>{card.userAnswer}</code>
              </pre>
            </div>

            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-1">
              <span className="text-xs font-semibold text-blue-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Resumo de Revisão Rápida
              </span>
              <p className="text-xs text-apple-text dark:text-gray-300 leading-relaxed">
                {card.takeaway}
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button 
                onClick={() => setIsOpen(false)}
                className="px-5 py-2.5 rounded-full text-xs font-semibold bg-apple-text text-white dark:bg-white dark:text-black hover:opacity-90 transition-opacity"
              >
                Fechar Revisão
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}