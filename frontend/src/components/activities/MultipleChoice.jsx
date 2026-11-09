import React, { useState } from 'react';
import { CheckSquare, Send } from 'lucide-react';

export function MultipleChoice({ questionData, onVerify }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleCheck = () => {
    if (selectedOption === null) return;
    const isCorrect = selectedOption === questionData.correctIndex;
    onVerify(
      isCorrect ? 'correct' : 'incorrect',
      isCorrect ? questionData.successFeedback : questionData.errorFeedback
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-500">
          <CheckSquare className="w-3.5 h-3.5" />
          Questão Rápida • Múltipla Escolha
        </span>
        <h3 className="text-lg sm:text-xl font-bold leading-snug">
          {questionData.prompt}
        </h3>
      </div>

      {/* Bloco de código de apoio, se houver */}
      {questionData.codeSnippet && (
        <pre className="p-4 rounded-2xl bg-[#121214] text-gray-200 font-mono text-xs sm:text-sm overflow-x-auto border border-white/10">
          <code>{questionData.codeSnippet}</code>
        </pre>
      )}

      {/* Opções */}
      <div className="space-y-3">
        {questionData.options.map((option, index) => {
          const isSelected = selectedOption === index;
          return (
            <button
              key={index}
              onClick={() => setSelectedOption(index)}
              className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-3.5 ${
                isSelected
                  ? 'bg-blue-600/10 border-blue-500 text-blue-500 dark:text-blue-400 font-medium shadow-sm'
                  : 'bg-apple-bg/60 dark:bg-white/[0.02] border-apple-border dark:border-white/10 hover:border-gray-400 dark:hover:border-white/25'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${
                isSelected ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-400 dark:border-white/20'
              }`}>
                {String.fromCharCode(65 + index)}
              </div>
              <span className="text-sm">{option}</span>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={handleCheck}
          disabled={selectedOption === null}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-md shadow-blue-500/10"
        >
          <Send className="w-3.5 h-3.5" />
          Verificar Resposta
        </button>
      </div>
    </div>
  );
}