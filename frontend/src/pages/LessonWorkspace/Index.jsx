import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../../components/layout/Navbar';
import { mockTracks } from '../../data/mockTracks';
import { MultipleChoice } from '../../components/activities/MultipleChoice';
import { CodeEditorBox } from '../../components/activities/CodeEditorBox';
import { AnswerFeedback } from '../../components/activities/AnswerFeedback';
import { AICopilotDrawer } from '../../components/layout/AICopilotDrawer';
import { 
  ArrowLeft, Lock, Unlock, CheckCircle2, 
  Play, BookOpen, Code2, CheckSquare 
} from 'lucide-react';

export function LessonWorkspace() {
  const { trackId, lessonId } = useParams();
  const navigate = useNavigate();

  const currentTrack = mockTracks.find(t => t.id === trackId) || mockTracks[0];
  const [activeLessonId, setActiveLessonId] = useState(Number(lessonId) || currentTrack.lessons[0].id);
  
  // Controles do aluno: Modo Livre (destravar aulas) e Ligar/Desligar IA
  const [freeMode, setFreeMode] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(true);
  
  // Alternar entre atividade de Múltipla Escolha e Algoritmo Inteiro
  const [activityMode, setActivityMode] = useState('code'); // 'quiz' ou 'code'
  const [feedback, setFeedback] = useState({ status: null, message: '' });

  const activeLesson = currentTrack.lessons.find(l => l.id === activeLessonId) || currentTrack.lessons[0];

  // Dados das atividades baseados na linguagem da trilha (Portugol ou C)
  const isPortugol = currentTrack.lang === 'Portugol';

  const quizData = isPortugol ? {
    prompt: `Sobre "${activeLesson.title}" em Portugol: Qual condição abaixo verifica corretamente se a variável "media" é maior ou igual a 7?`,
    codeSnippet: `inteiro media = 8\n// Qual estrutura condicional usar abaixo?`,
    options: [
      'se (media => 7) { escreva("Aprovado") }',
      'se (media >= 7) { escreva("Aprovado") }',
      'condicao (media >= 7) entao { escreva("Aprovado") }',
      'if (media == 7) { printf("Aprovado"); }'
    ],
    correctIndex: 1,
    successFeedback: 'Perfeito! Em Portugol usamos a palavra-chave "se" seguida do operador relacional ">=" (maior ou igual).',
    errorFeedback: 'Atenção ao operador relacional! Em Portugol o símbolo de maior vem antes do igual (>=) e usamos a estrutura "se".'
  } : {
    prompt: `Sobre "${activeLesson.title}" em Linguagem C: Qual especificador de formato e operador são usados no scanf para ler um número inteiro na variável "valor"?`,
    codeSnippet: `int valor;\n// Complete a leitura no endereço de memória:`,
    options: [
      'scanf("%f", valor);',
      'scanf("%d", &valor);',
      'leia(valor);',
      'printf("%d", *valor);'
    ],
    correctIndex: 1,
    successFeedback: 'Exato! "%d" lê inteiros decimais e o "&" passa o endereço de memória da variável.',
    errorFeedback: 'Lembre-se que em C precisamos informar o tipo inteiro ("%d") e o operador de endereço "&" antes do nome da variável.'
  };

  const codeChallengeData = isPortugol ? {
    title: `Prática: ${activeLesson.title}`,
    prompt: 'Escreva um algoritmo em Portugol que utilize a estrutura "se" e "senao" para verificar se a variável "media" é maior ou igual (>=) a 7.0 e exiba "Aprovado" com o comando escreva.',
    starterCode: `programa {\n  funcao inicio() {\n    real media = 8.5\n\n    // Escreva sua estrutura condicional se / senao abaixo:\n    se (media >= 7.0) {\n      escreva("Aprovado")\n    } senao {\n      escreva("Reprovado")\n    }\n  }\n}`,
    requiredTokens: ['se', '>=', 'escreva'],
    expectedOutput: 'Aprovado',
    successFeedback: 'Seu algoritmo em Portugol compilou perfeitamente e passou nos testes lógicos!',
    errorFeedback: 'Certifique-se de manter a estrutura "se", a comparação ">=" e o comando "escreva" no seu algoritmo.'
  } : {
    title: `Prática em C: ${activeLesson.title}`,
    prompt: 'Complete o programa em Linguagem C utilizando "if" e "printf" para verificar se a variável "nota" é maior ou igual (>=) a 7.',
    starterCode: `#include <stdio.h>\n\nint main() {\n  int nota = 8;\n\n  if (nota >= 7) {\n    printf("Aprovado em C!\\n");\n  }\n\n  return 0;\n}`,
    requiredTokens: ['if', '>=', 'printf', 'return'],
    expectedOutput: 'Aprovado em C!',
    successFeedback: 'Código em C validado com sucesso! Sintaxe e retorno da função main corretos.',
    errorFeedback: 'Verifique se o seu código em C contém a condição "if", o operador ">=", a função "printf" e o "return 0;".'
  };

  const handleSelectLesson = (lesson) => {
    const isLocked = !freeMode && lesson.status === 'locked';
    if (isLocked) return;
    setActiveLessonId(lesson.id);
    setFeedback({ status: null, message: '' });
  };

  return (
    <div className="min-h-screen pb-16">
      <Navbar />

      <main className="pt-20 px-4 sm:px-6 max-w-[1400px] mx-auto space-y-6">
        
        {/* BARRA SUPERIOR DE CONTEXTO */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-apple-border dark:border-dark-border">
          <div className="flex items-center gap-3">
            <Link 
              to="/dashboard"
              className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2 text-xs text-blue-500 font-semibold">
                <span>Trilha {currentTrack.step}: {currentTrack.title}</span>
                <span>•</span>
                <span>{currentTrack.lang}</span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight">
                {activeLesson.title}
              </h1>
            </div>
          </div>

          {/* Botão para Destravar Aulas direto dentro do Workspace */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              onClick={() => setFreeMode(!freeMode)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium bg-apple-card dark:bg-dark-card border border-apple-border dark:border-dark-border hover:border-blue-500/40 transition-all"
            >
              {freeMode ? (
                <>
                  <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Aulas Desbloqueadas</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Bloqueio Ativo (Destravar)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* LAYOUT DE 3 COLUNAS (TRILHA ESQUERDA + ATIVIDADE CENTRO + IA DIREITA) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* COLUNA 1 (3 cols): Tópicos da Matéria */}
          <div className="lg:col-span-3 rounded-3xl p-5 bg-apple-card dark:bg-dark-card border border-apple-border dark:border-dark-border space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-apple-muted dark:text-dark-muted flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Módulos da Aula
              </span>
              <span className="text-[11px] text-blue-500 font-semibold">
                {currentTrack.progress}%
              </span>
            </div>

            <div className="space-y-2">
              {currentTrack.lessons.map((lesson) => {
                const isLocked = !freeMode && lesson.status === 'locked';
                const isSelected = lesson.id === activeLesson.id;
                const isCompleted = lesson.status === 'completed';

                return (
                  <button
                    key={lesson.id}
                    onClick={() => handleSelectLesson(lesson)}
                    disabled={isLocked}
                    className={`w-full text-left p-3 rounded-2xl text-xs font-medium transition-all flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-sm'
                        : isLocked
                        ? 'opacity-40 cursor-not-allowed bg-black/[0.02] dark:bg-white/[0.01]'
                        : 'hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <span className="truncate">{lesson.title}</span>
                    {isCompleted ? (
                      <CheckCircle2 className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-emerald-500'}`} />
                    ) : isLocked ? (
                      <Lock className="w-3.5 h-3.5 shrink-0" />
                    ) : (
                      <Play className="w-3.5 h-3.5 shrink-0 fill-current" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* COLUNA 2 (6 cols): Centro de Atividades Rápidas e Código */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Seletor entre Múltipla Escolha e Algoritmo Inteiro */}
            <div className="p-1.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-apple-border dark:border-white/10 inline-flex items-center gap-1">
              <button
                onClick={() => {
                  setActivityMode('code');
                  setFeedback({ status: null, message: '' });
                }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activityMode === 'code'
                    ? 'bg-apple-card dark:bg-dark-card text-apple-text dark:text-white shadow-sm'
                    : 'text-apple-muted dark:text-dark-muted'
                }`}
              >
                <Code2 className="w-3.5 h-3.5 text-blue-500" />
                Prática de Algoritmo Inteiro
              </button>

              <button
                onClick={() => {
                  setActivityMode('quiz');
                  setFeedback({ status: null, message: '' });
                }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activityMode === 'quiz'
                    ? 'bg-apple-card dark:bg-dark-card text-apple-text dark:text-white shadow-sm'
                    : 'text-apple-muted dark:text-dark-muted'
                }`}
              >
                <CheckSquare className="w-3.5 h-3.5 text-purple-400" />
                Questão de Múltipla Escolha
              </button>
            </div>

            {/* Card Principal da Atividade */}
            <div className="rounded-3xl p-6 sm:p-8 bg-apple-card dark:bg-dark-card border border-apple-border dark:border-dark-border shadow-sm">
              {activityMode === 'code' ? (
                <CodeEditorBox 
                  challengeData={codeChallengeData}
                  lang={currentTrack.lang}
                  onVerify={(status, message) => setFeedback({ status, message })}
                />
              ) : (
                <MultipleChoice 
                  questionData={quizData}
                  onVerify={(status, message) => setFeedback({ status, message })}
                />
              )}
            </div>

            {/* Feedback de Correto / Incorreto */}
            <AnswerFeedback 
              status={feedback.status}
              message={feedback.message}
              onAskAI={() => setAiEnabled(true)}
              onNextLesson={() => {
                const currentIndex = currentTrack.lessons.findIndex(l => l.id === activeLesson.id);
                const next = currentTrack.lessons[currentIndex + 1];
                if (next) {
                  setActiveLessonId(next.id);
                  setFeedback({ status: null, message: '' });
                } else {
                  navigate('/dashboard');
                }
              }}
            />

          </div>

          {/* COLUNA 3 (3 cols): Espaço Lateral Direito para a IA do Gean */}
          <div className="lg:col-span-3">
            <AICopilotDrawer 
              isEnabled={aiEnabled}
              onToggle={() => setAiEnabled(!aiEnabled)}
              currentTopic={activeLesson.title}
              lang={currentTrack.lang}
            />
          </div>

        </div>
      </main>
    </div>
  );
}