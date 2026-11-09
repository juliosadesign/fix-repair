import React, { useState, useEffect } from 'react';
import { Code2, Play, RotateCcw, Terminal } from 'lucide-react';

export function CodeEditorBox({ challengeData, lang, onVerify }) {
  const [code, setCode] = useState(challengeData.starterCode);
  const [consoleOutput, setConsoleOutput] = useState('');

  useEffect(() => {
    setCode(challengeData.starterCode);
    setConsoleOutput('');
  }, [challengeData]);

  const handleRunAndVerify = () => {
    const cleanCode = code.toLowerCase();
    // Verifica se o aluno utilizou todas as estruturas obrigatórias daquele algoritmo
    const passedAllChecks = challengeData.requiredTokens.every(token => 
      cleanCode.includes(token.toLowerCase())
    );

    if (passedAllChecks) {
      setConsoleOutput(challengeData.expectedOutput);
      onVerify('correct', challengeData.successFeedback);
    } else {
      setConsoleOutput('Erro de lógica ou sintaxe: O resultado não atingiu a condição esperada.');
      onVerify('incorrect', challengeData.errorFeedback);
    }
  };

  const lines = code.split('\n').length;

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Code2 className="w-3.5 h-3.5" />
            Prática de Algoritmo Inteiro • {lang}
          </span>
          <button
            onClick={() => {
              setCode(challengeData.starterCode);
              setConsoleOutput('');
              onVerify(null, '');
            }}
            className="inline-flex items-center gap-1 text-xs text-apple-muted dark:text-dark-muted hover:text-apple-text dark:hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restaurar código inicial
          </button>
        </div>

        <h3 className="text-lg sm:text-xl font-bold">{challengeData.title}</h3>
        <p className="text-xs sm:text-sm text-apple-muted dark:text-dark-muted leading-relaxed">
          {challengeData.prompt}
        </p>
      </div>

      {/* Caixa do Editor estilo macOS Dark */}
      <div className="rounded-2xl overflow-hidden border border-apple-border dark:border-white/15 bg-[#0D0D0F] shadow-inner">
        <div className="px-4 py-2.5 bg-[#161618] border-b border-white/10 flex items-center justify-between text-xs text-gray-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
            <span className="ml-2 text-gray-300">
              {lang === 'Portugol' ? 'solucao.por' : 'main.c'}
            </span>
          </div>
          <span>UTF-8</span>
        </div>

        <div className="flex font-mono text-xs sm:text-sm">
          {/* Numeração de linhas */}
          <div className="py-4 px-3 text-right select-none text-gray-600 bg-[#121214] border-r border-white/5">
            {Array.from({ length: Math.max(lines, 8) }).map((_, i) => (
              <div key={i} className="leading-6">{i + 1}</div>
            ))}
          </div>

          {/* Área de digitação do algoritmo */}
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck="false"
            rows={Math.max(lines, 8)}
            className="w-full p-4 bg-transparent text-emerald-300 focus:outline-none resize-none leading-6 font-mono"
          />
        </div>
      </div>

      {/* Saída do Terminal / Console */}
      {consoleOutput && (
        <div className="p-3.5 rounded-xl bg-black/80 border border-white/10 font-mono text-xs text-gray-300 flex items-center gap-2.5">
          <Terminal className="w-4 h-4 text-blue-400 shrink-0" />
          <span><strong>Saída do Console:</strong> {consoleOutput}</span>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleRunAndVerify}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-md shadow-blue-500/10"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          Executar & Verificar Algoritmo
        </button>
      </div>
    </div>
  );
}