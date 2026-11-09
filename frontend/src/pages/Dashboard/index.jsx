import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/layout/Navbar';
import { mockTracks, mockSavedCards } from '../../data/mockTracks';
import { SavedCardItem } from '../../components/activities/SavedCardItem';
import { 
  Lock, Unlock, CheckCircle2, Play, Clock, 
  BookmarkCheck, Trophy, User, Sparkles, ChevronRight 
} from 'lucide-react';

export function Dashboard() {
  const navigate = useNavigate();
  const [selectedTrack, setSelectedTrack] = useState(mockTracks[0]);
  // Por padrão, as aulas futuras vêm bloqueadas (strictLock = true)
  const [strictLock, setStrictLock] = useState(true);
  const [filterLang, setFilterLang] = useState('Todos');

  const filteredCards = filterLang === 'Todos' 
    ? mockSavedCards 
    : mockSavedCards.filter(card => card.lang === filterLang);

  return (
    <div className="min-h-screen pb-20">
      <Navbar />

      <main className="pt-24 px-6 max-w-6xl mx-auto space-y-10">
        
        {/* CABEÇALHO DO ALUNO + PROGRESSÃO GERAL (PRIORIDADE ALTA) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Bloco Principal de Boas-vindas e Barra de Progresso */}
          <div className="lg:col-span-8 rounded-3xl p-7 bg-apple-card dark:bg-dark-card border border-apple-border dark:border-dark-border flex flex-col justify-between gap-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-medium text-blue-500">
                  Painel de Estudos • Engenharia da Computação
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Continue sua jornada, Estudante
                </h1>
              </div>

              {/* Botão de Perfil Visível (Prioridade Média) */}
              <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-black/5 dark:bg-white/5 border border-apple-border dark:border-white/10 self-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                  <User className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <p className="font-semibold">Perfil Público: Ativo</p>
                  <p className="text-apple-muted dark:text-dark-muted">3 Cards no Cofre</p>
                </div>
              </div>
            </div>

            {/* Barra de Progressão da Trilha Selecionada */}
            <div className="space-y-2.5 pt-2 border-t border-apple-border/60 dark:border-white/5">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-medium text-apple-muted dark:text-dark-muted">
                  Progresso em <strong className="text-apple-text dark:text-white">{selectedTrack.title} ({selectedTrack.lang})</strong>
                </span>
                <span className="font-bold text-blue-500">{selectedTrack.progress}% concluído</span>
              </div>
              <div className="w-full h-3 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden p-0.5 border border-apple-border dark:border-white/10">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
                  style={{ width: `${Math.max(selectedTrack.progress, 4)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Bloco Lateral: Controle de Bloqueio de Aulas (PRIORIDADE ALTA) */}
          <div className="lg:col-span-4 rounded-3xl p-7 bg-apple-card dark:bg-dark-card border border-apple-border dark:border-dark-border flex flex-col justify-between gap-4 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-apple-muted dark:text-dark-muted">
                  Modo de Navegação
                </span>
                {strictLock ? (
                  <Lock className="w-4 h-4 text-amber-400" />
                ) : (
                  <Unlock className="w-4 h-4 text-emerald-400" />
                )}
              </div>
              <h3 className="text-lg font-bold">
                {strictLock ? 'Aulas Bloqueadas por Etapa' : 'Modo Livre Desbloqueado'}
              </h3>
              <p className="text-xs text-apple-muted dark:text-dark-muted leading-relaxed">
                {strictLock 
                  ? 'Você precisa concluir a atividade atual para liberar o próximo tópico da matéria.' 
                  : 'Todas as aulas estão abertas para você estudar qualquer tópico fora de ordem.'}
              </p>
            </div>

            {/* Switch estilo iOS / Apple */}
            <div className="pt-3 border-t border-apple-border/60 dark:border-white/5 flex items-center justify-between">
              <span className="text-xs font-medium">
                Bloquear próximas aulas
              </span>
              <button
                onClick={() => setStrictLock(!strictLock)}
                aria-label="Alternar bloqueio de aulas"
                className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-300 ${
                  strictLock ? 'bg-blue-600' : 'bg-gray-300 dark:bg-white/15'
                }`}
              >
                <div
                  className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                    strictLock ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

        </section>

        {/* SELETOR DAS 4 DISCIPLINAS (PORTUGOL -> C -> ED) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold tracking-tight">1. Escolha a Disciplina</h2>
            <span className="text-xs text-apple-muted dark:text-dark-muted">
              Clique para alternar a trilha
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockTracks.map((track) => {
              const isSelected = selectedTrack.id === track.id;
              return (
                <button
                  key={track.id}
                  onClick={() => setSelectedTrack(track)}
                  className={`text-left p-5 rounded-3xl border transition-all duration-200 flex flex-col justify-between gap-4 ${
                    isSelected 
                      ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/20 scale-[1.01]' 
                      : 'bg-apple-card dark:bg-dark-card border-apple-border dark:border-dark-border hover:border-gray-400 dark:hover:border-white/25'
                  }`}
                >
                  <div className="space-y-2 w-full">
                    <div className="flex items-center justify-between text-xs">
                      <span className={`px-2.5 py-0.5 rounded-full font-semibold ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-black/5 dark:bg-white/5 text-apple-muted dark:text-dark-muted'
                      }`}>
                        {track.lang}
                      </span>
                      <span className="font-mono opacity-75">ETAPA {track.step}</span>
                    </div>
                    <h3 className="font-bold text-base leading-snug pt-1">
                      {track.title}
                    </h3>
                  </div>

                  <div className="w-full space-y-1.5">
                    <div className="flex justify-between text-[11px] opacity-85">
                      <span>Progresso</span>
                      <span>{track.progress}%</span>
                    </div>
                    <div className={`w-full h-1.5 rounded-full overflow-hidden ${isSelected ? 'bg-white/25' : 'bg-black/10 dark:bg-white/10'}`}>
                      <div 
                        className={`h-full rounded-full ${isSelected ? 'bg-white' : 'bg-blue-500'}`}
                        style={{ width: `${Math.max(track.progress, 5)}%` }}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* LISTA DE AULAS E TÓPICOS COM LÓGICA DE BLOQUEIO */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Coluna Esquerda (8 cols): Módulos da Matéria */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold tracking-tight">
                  2. Tópicos de {selectedTrack.title} ({selectedTrack.lang})
                </h2>
                <p className="text-xs text-apple-muted dark:text-dark-muted">
                  {selectedTrack.description}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {selectedTrack.lessons.map((lesson) => {
                // Se strictLock for false (Modo Livre), nenhuma aula fica trancada!
                const isLocked = strictLock && lesson.status === 'locked';
                const isCompleted = lesson.status === 'completed';
                const isCurrent = lesson.status === 'current';

                return (
                  <div
                    key={lesson.id}
                    className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      isLocked
                        ? 'bg-apple-card/40 dark:bg-dark-card/40 border-apple-border/50 dark:border-dark-border/50 opacity-55'
                        : isCurrent
                        ? 'bg-apple-card dark:bg-dark-card border-blue-500/50 dark:border-blue-500/50 shadow-sm'
                        : 'bg-apple-card dark:bg-dark-card border-apple-border dark:border-dark-border hover:border-gray-400 dark:hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start sm:items-center gap-4">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                        isCompleted 
                          ? 'bg-emerald-500/10 text-emerald-500' 
                          : isLocked 
                          ? 'bg-black/5 dark:bg-white/5 text-apple-muted dark:text-dark-muted' 
                          : 'bg-blue-500/10 text-blue-500'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : isLocked ? (
                          <Lock className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4 fill-current" />
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-semibold text-sm sm:text-base">
                            {lesson.title}
                          </h4>
                          {!strictLock && lesson.status === 'locked' && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              Liberado pelo Modo Livre
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-xs text-apple-muted dark:text-dark-muted">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {lesson.duration}
                          </span>
                          <span>•</span>
                          <span>{lesson.type}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      {isLocked ? (
                        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-black/5 dark:bg-white/5 text-apple-muted dark:text-dark-muted">
                          <Lock className="w-3.5 h-3.5" />
                          Complete a anterior
                        </span>
                      ) : (
                        <button 
  onClick={() => navigate(`/workspace/${selectedTrack.id}/${lesson.id}`)}
  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
    isCompleted
      ? 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10'
      : 'bg-blue-600 text-white hover:bg-blue-500 shadow-sm'
  }`}
>
  <span>{isCompleted ? 'Praticar Novamente' : 'Iniciar Atividade'}</span>
  <ChevronRight className="w-3.5 h-3.5" />
</button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Coluna Direita (4 cols): Prévia da IA & Rank (Prioridade Baixa) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Card Explicativo da IA do Gean */}
            <div className="rounded-3xl p-6 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/5 bg-apple-card dark:bg-dark-card border border-apple-border dark:border-dark-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold flex items-center gap-1.5 text-purple-400">
                  <Sparkles className="w-4 h-4" />
                  Recomendação Adaptativa
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  IA Integrada
                </span>
              </div>
              <h3 className="font-bold text-base">Sugestão para Hoje</h3>
              <p className="text-xs text-apple-muted dark:text-dark-muted leading-relaxed">
                Você mandou muito bem em Entrada e Saída! O próximo passo ideal é praticar <strong>Estrutura Condicional (se/senao)</strong> em Portugol.
              </p>
            </div>

            {/* Bloco Discreto de Ranking (Prioridade Baixa) */}
            <div className="rounded-3xl p-6 bg-apple-card dark:bg-dark-card border border-apple-border dark:border-dark-border space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <h3 className="font-bold text-sm">Comunidade & Rank</h3>
                </div>
                <span className="text-[11px] text-apple-muted dark:text-dark-muted">Semanal</span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/5 dark:bg-white/5">
                  <span className="font-medium">1. Clarice S.</span>
                  <span className="font-mono text-emerald-400">420 XP</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <span className="font-semibold text-blue-400">2. Você (Júlio)</span>
                  <span className="font-mono font-semibold text-blue-400">380 XP</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/5 dark:bg-white/5">
                  <span className="font-medium">3. Gean C.</span>
                  <span className="font-mono text-apple-muted dark:text-dark-muted">350 XP</span>
                </div>
              </div>
            </div>

          </div>

        </section>

        {/* COFRE DE CARDS DE ATIVIDADES CONCLUÍDAS */}
        <section className="pt-6 border-t border-apple-border dark:border-dark-border space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <BookmarkCheck className="w-5 h-5 text-blue-500" />
                <h2 className="text-xl font-bold tracking-tight">
                  Seu Cofre de Cards Rápidos
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-apple-muted dark:text-dark-muted">
                Todas as atividades que você resolveu ficam guardadas aqui. Clique em qualquer card para revisar sua lógica.
              </p>
            </div>

            {/* Filtro Rápido por Linguagem */}
            <div className="flex items-center gap-2 self-start">
              {['Todos', 'Portugol', 'Linguagem C'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setFilterLang(lang)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    filterLang === lang
                      ? 'bg-apple-text text-white dark:bg-white dark:text-black'
                      : 'bg-black/5 dark:bg-white/5 text-apple-muted dark:text-dark-muted hover:text-apple-text dark:hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredCards.map((card) => (
              <SavedCardItem key={card.id} card={card} />
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}