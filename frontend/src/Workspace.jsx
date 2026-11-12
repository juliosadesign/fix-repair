import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { mockTracks } from './data/mockTracks';
import { 
  ArrowLeft, Lock, Unlock, CheckCircle2, Play, BookOpen, 
  Code2, CheckSquare, Sparkles, Send, Power, Lightbulb, 
  Bug, HelpCircle, RotateCcw, Terminal, XCircle, BookmarkCheck, ArrowRight 
} from 'lucide-react';

export function LessonWorkspace() {
  const { trackId, lessonId } = useParams();
  const navigate = useNavigate();

  const currentTrack = mockTracks.find(t => t.id === trackId) || mockTracks[0];
  const [activeLessonId, setActiveLessonId] = useState(Number(lessonId) || currentTrack.lessons[0].id);
  
  const [freeMode, setFreeMode] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(true);
  const [activityMode, setActivityMode] = useState('code');
  const [feedback, setFeedback] = useState({ status: null, message: '' });
  const [selectedOption, setSelectedOption] = useState(null);

  const activeLesson = currentTrack.lessons.find(l => l.id === activeLessonId) || currentTrack.lessons[0];
  const isPortugol = currentTrack.lang === 'Portugol';

  const starterCodeText = isPortugol
    ? `programa {\n  funcao inicio() {\n    real media = 8.5\n\n    // Escreva sua estrutura condicional se / senao abaixo:\n    se (media >= 7.0) {\n      escreva("Aprovado")\n    } senao {\n      escreva("Reprovado")\n    }\n  }\n}`
    : `#include <stdio.h>\n\nint main() {\n  int nota = 8;\n\n  if (nota >= 7) {\n    printf("Aprovado em C!\\n");\n  }\n\n  return 0;\n}`;

  const [code, setCode] = useState(starterCodeText);
  const [consoleOutput, setConsoleOutput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: `Olá! Sou o Copilot da Fix Repair. Estou acompanhando sua atividade em ${currentTrack.lang}. Como posso ajudar na sua lógica?`
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  const quizData = isPortugol ? {
    prompt: `Sobre "${activeLesson.title}" em Portugol: Qual condição verifica corretamente se "media" é maior ou igual a 7?`,
    options: [
      'se (media => 7) { escreva("Aprovado") }',
      'se (media >= 7) { escreva("Aprovado") }',
      'condicao (media >= 7) entao { escreva("Aprovado") }',
      'if (media == 7) { printf("Aprovado"); }'
    ],
    correctIndex: 1
  } : {
    prompt: `Sobre "${activeLesson.title}" em Linguagem C: Qual comando lê corretamente um inteiro na variável "valor"?`,
    options: [
      'scanf("%f", valor);',
      'scanf("%d", &valor);',
      'leia(valor);',
      'printf("%d", *valor);'
    ],
    correctIndex: 1
  };

  const handleRunCode = () => {
    const clean = code.toLowerCase();
    const valid = isPortugol 
      ? clean.includes('se') && clean.includes('>=') && clean.includes('escreva')
      : clean.includes('if') && clean.includes('>=') && clean.includes('printf');

    if (valid) {
      setConsoleOutput(isPortugol ? 'Aprovado' : 'Aprovado em C!');
      setFeedback({
        status: 'correct',
        message: 'Excelente! Seu algoritmo compilou e passou na validação lógica.'
      });
    } else {
      setConsoleOutput('Erro de lógica: Verifique a condição e o comando de saída.');
      setFeedback({
        status: 'incorrect',
        message: 'Quase lá! Confira se utilizou a estrutura condicional e o operador >= corretamente.'
      });
    }
  };

  const handleCheckQuiz = () => {
    if (selectedOption === null) return;
    if (selectedOption === quizData.correctIndex) {
      setFeedback({ status: 'correct', message: 'Resposta exata! Conceito dominado.' });
    } else {
      setFeedback({ status: 'incorrect', message: 'Alternativa incorreta. Revise a sintaxe da linguagem.' });
    }
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const text = chatInput;
    setChatInput('');
    setMessages(prev => [
      ...prev,
      { role: 'user', text },
      { role: 'ai', text: `Dica pedagógica sobre "${text}": Divida o problema validando primeiro a condição lógica antes de exibir o resultado no console.` }
    ]);
  };

  const lines = code.split('\n').length;

  return (
    <div className="min-h-screen pb-16">
      <Navbar />

      <main className="pt-20 px-4 sm:px-6 max-w-[1400px] mx-auto space-y-6">
        {/* Topo */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-apple-border dark:border-dark-border">
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:opacity-80">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <span className="text-xs text-blue-500 font-semibold">
                Trilha {currentTrack.step}: {currentTrack.title} • {currentTrack.lang}
              </span>
              <h1 className="text-lg sm:text-xl font-bold">{activeLesson.title}</h1>
            </div>
          </div>

          <button
            onClick={() => setFreeMode(!freeMode)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium bg-apple-card dark:bg-dark-card border border-apple-border dark:border-dark-border"
          >
            {freeMode ? <Unlock className="w-3.5 h-3.5 text-emerald-400" /> : <Lock className="w-3.5 h-3.5 text-amber-400" />}
            <span>{freeMode ? 'Modo Livre Ativo' : 'Bloqueio Ativo (Destravar)'}</span>
          </button>
        </div>

        {/* 3 Colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Coluna 1: Aulas */}
          <div className="lg:col-span-3 rounded-3xl p-5 bg-apple-card dark:bg-dark-card border border-apple-border dark:border-dark-border space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-apple-muted dark:text-dark-muted flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> Módulos da Aula
            </span>
            <div className="space-y-2">
              {currentTrack.lessons.map((lesson) => {
                const isLocked = !freeMode && lesson.status === 'locked';
                const isSelected = lesson.id === activeLesson.id;
                return (
                  <button
                    key={lesson.id}
                    disabled={isLocked}
                    onClick={() => {
                      setActiveLessonId(lesson.id);
                      setFeedback({ status: null, message: '' });
                    }}
                    className={`w-full text-left p-3 rounded-2xl text-xs font-medium flex items-center justify-between gap-2 ${
                      isSelected ? 'bg-blue-600 text-white' : isLocked ? 'opacity-40 cursor-not-allowed' : 'hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <span className="truncate">{lesson.title}</span>
                    {lesson.status === 'completed' ? <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" /> : isLocked ? <Lock className="w-3.5 h-3.5 shrink-0" /> : <Play className="w-3.5 h-3.5 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Coluna 2: Prática Central */}
          <div className="lg:col-span-6 space-y-5">
            <div className="p-1.5 rounded-2xl bg-black/5 dark:bg-white/5 inline-flex items-center gap-1">
              <button
                onClick={() => { setActivityMode('code'); setFeedback({ status: null, message: '' }); }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold ${activityMode === 'code' ? 'bg-apple-card dark:bg-dark-card shadow-sm' : ' opacity-70'}`}
              >
                <Code2 className="w-3.5 h-3.5 text-blue-500" /> Algoritmo Prático
              </button>
              <button
                onClick={() => { setActivityMode('quiz'); setFeedback({ status: null, message: '' }); }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold ${activityMode === 'quiz' ? 'bg-apple-card dark:bg-dark-card shadow-sm' : 'opacity-70'}`}
              >
                <CheckSquare className="w-3.5 h-3.5 text-purple-400" /> Múltipla Escolha
              </button>
            </div>

            <div className="rounded-3xl p-6 bg-apple-card dark:bg-dark-card border border-apple-border dark:border-dark-border space-y-5">
              {activityMode === 'code' ? (
                <>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">Editor Prático ({currentTrack.lang})</h3>
                    <button onClick={() => setCode(starterCodeText)} className="text-xs text-apple-muted flex items-center gap-1">
                      <RotateCcw className="w-3.5 h-3.5" /> Restaurar
                    </button>
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-white/15 bg-[#0D0D0F]">
                    <div className="flex font-mono text-xs sm:text-sm">
                      <div className="py-4 px-3 text-right select-none text-gray-600 bg-[#121214]">
                        {Array.from({ length: Math.max(lines, 8) }).map((_, i) => <div key={i} className="leading-6">{i + 1}</div>)}
                      </div>
                      <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        rows={Math.max(lines, 8)}
                        className="w-full p-4 bg-transparent text-emerald-300 focus:outline-none resize-none leading-6 font-mono"
                      />
                    </div>
                  </div>

                  {consoleOutput && (
                    <div className="p-3 rounded-xl bg-black/80 text-xs font-mono text-gray-300 flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-blue-400" />
                      <span>Saída: {consoleOutput}</span>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button onClick={handleRunCode} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold bg-blue-600 text-white hover:bg-blue-500">
                      <Play className="w-3.5 h-3.5 fill-current" /> Executar & Verificar
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-base font-bold">{quizData.prompt}</h3>
                  <div className="space-y-2.5">
                    {quizData.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedOption(idx)}
                        className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm flex items-center gap-3 ${
                          selectedOption === idx ? 'border-blue-500 bg-blue-500/10 text-blue-400 font-semibold' : 'border-apple-border dark:border-white/10'
                        }`}
                      >
                        <span className="w-6 h-6 rounded-full border flex items-center justify-center text-xs">{String.fromCharCode(65 + idx)}</span>
                        <span>{opt}</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <button onClick={handleCheckQuiz} className="px-6 py-2.5 rounded-full text-xs font-semibold bg-blue-600 text-white">
                      Verificar Resposta
                    </button>
                  </div>
                </div>
              )}
            </div>

            {feedback.status && (
              <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
                feedback.status === 'correct' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
              }`}>
                <div className="flex items-center gap-2.5 text-xs">
                  {feedback.status === 'correct' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <XCircle className="w-5 h-5 shrink-0" />}
                  <div>
                    <p className="font-bold">{feedback.message}</p>
                    {feedback.status === 'correct' && (
                      <span className="text-[11px] flex items-center gap-1 mt-0.5"><BookmarkCheck className="w-3.5 h-3.5" /> Salvo no Cofre de Cards!</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Coluna 3: IA Copilot */}
          <div className="lg:col-span-3 rounded-3xl bg-apple-card dark:bg-dark-card border border-apple-border dark:border-dark-border flex flex-col justify-between min-h-[480px] overflow-hidden">
            <div className="p-4 border-b border-apple-border dark:border-dark-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-bold">Copilot IA</span>
              </div>
              <button onClick={() => setAiEnabled(!aiEnabled)} className="text-xs px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/10">
                <Power className="w-3 h-3 inline mr-1" /> {aiEnabled ? 'Ativo' : 'Off'}
              </button>
            </div>

            {aiEnabled ? (
              <>
                <div className="p-4 space-y-3 overflow-y-auto max-h-[340px] text-xs">
                  {messages.map((m, i) => (
                    <div key={i} className={`p-3 rounded-2xl ${m.role === 'ai' ? 'bg-black/5 dark:bg-white/5' : 'bg-blue-600 text-white ml-4'}`}>
                      {m.text}
                    </div>
                  ))}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    <button onClick={() => setMessages(p => [...p, { role: 'ai', text: 'Dica: Verifique o operador >= dentro do se().' }])} className="px-2.5 py-1 rounded-xl bg-purple-500/10 text-purple-400 flex items-center gap-1">
                      <Lightbulb className="w-3 h-3" /> Dica de Lógica
                    </button>
                    <button onClick={() => setMessages(p => [...p, { role: 'ai', text: 'Sintaxe: Confira abertura e fechamento de chaves {}.' }])} className="px-2.5 py-1 rounded-xl bg-blue-500/10 text-blue-400 flex items-center gap-1">
                      <Bug className="w-3 h-3" /> Sintaxe
                    </button>
                  </div>
                </div>
                <form onSubmit={handleSendChat} className="p-3 border-t border-apple-border dark:border-dark-border flex gap-2">
                  <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Tire uma dúvida..." className="w-full px-3 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 focus:outline-none" />
                  <button type="submit" className="p-2 rounded-xl bg-blue-600 text-white"><Send className="w-3.5 h-3.5" /></button>
                </form>
              </>
            ) : (
              <div className="p-6 text-center my-auto text-xs text-apple-muted">Modo Resolução Solo Ativo.</div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}