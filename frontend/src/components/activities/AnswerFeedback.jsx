import React from 'react';
import { CheckCircle2, XCircle, BookmarkCheck, Sparkles, ArrowRight } from 'lucide-react';

export function AnswerFeedback({ status, message, onAskAI, onNextLesson }) {
  if (!status) return null;

  const isSuccess = status === 'correct';

  return (
    <div 
      className={`p-5 rounded-2xl border transition-all duration-300 ${
        isSuccess 
          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' 
          : 'bg-red-500/10 border-red-500/30 text-red-400'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          {isSuccess ? (
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-500" />
          ) : (
            <XCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-400" />
          )}
          
          <div className="space-y-1">
            <h4 className="font-bold text-sm">
              {isSuccess ? 'Resposta Correta! Excelente lógica.' : 'Quase lá! Encontramos um detalhe na sua resposta.'}
            </h4>
            <p className="text-xs text-apple-text/80 dark:text-gray-300 leading-relaxed">
              {message}
            </p>
            {isSuccess && (
              <div className="pt-1 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                <BookmarkCheck className="w-3.5 h-3.5" />
                <span>Esta atividade foi guardada automaticamente no seu Cofre de Cards!</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {!isSuccess && onAskAI && (
            <button
              onClick={onAskAI}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Pedir dica à IA
            </button>
          )}

          {isSuccess && onNextLesson && (
            <button
              onClick={onNextLesson}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-500 text-white hover:bg-emerald-400 transition-all shadow-sm"
            >
              <span>Próximo Tópico</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}