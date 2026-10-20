import React, { useState } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { 
  Code2, Layers, Cpu, Network, Lock, Unlock, 
  CheckCircle2, Sparkles, BookmarkCheck, Play, ArrowUpRight 
} from 'lucide-react';

export function LandingPage() {
  const [freeModeDemo, setFreeModeDemo] = useState(false);

  const tracks = [
    {
      step: '01',
      title: 'Algoritmos',
      lang: 'Portugol',
      desc: 'Construa a base do raciocínio lógico sequencial sem travar na sintaxe complexa.',
      icon: Code2,
      accent: 'from-blue-500/20 to-cyan-500/5',
      badgeColor: 'text-blue-500 bg-blue-500/10 border-blue-500/20'
    },
    {
      step: '02',
      title: 'Linguagem de Programação',
      lang: 'Linguagem C',
      desc: 'Transição guiada do pseudocódigo para o controle real de memória, ponteiros e funções em C.',
      icon: Cpu,
      accent: 'from-indigo-500/20 to-purple-500/5',
      badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
    },
    {
      step: '03',
      title: 'Estruturas de Dados Básicas',
      lang: 'Linguagem C',
      desc: 'Domine pilhas, filas, listas encadeadas e alocação dinâmica através de cards visuais rápidos.',
      icon: Layers,
      accent: 'from-emerald-500/20 to-teal-500/5',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      step: '04',
      title: 'Estruturas de Dados Avançadas',
      lang: 'Estrutura Inicial',
      desc: 'Introdução descomplicada a árvores, grafos e análise de complexidade de algoritmos.',
      icon: Network,
      accent: 'from-amber-500/20 to-orange-500/5',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
    }
  ];

  return (
    <div className="min-h-screen selection:bg-blue-500 selection:text-white">
      <Navbar />

      {/* HERO SECTION */}
      <main className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-black/5 dark:bg-white/5 border border-apple-border dark:border-white/10 text-apple-muted dark:text-dark-muted">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Plataforma Inteligente de Estudo Ativo
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.1]">
            Domine as matérias mais difíceis.{' '}
            <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              No seu próprio ritmo.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-apple-muted dark:text-dark-muted max-w-2xl mx-auto leading-relaxed">
            Do Portugol às Estruturas de Dados em C. Aprenda com atividades rápidas em cards, 
            validação instantânea de código e um assistente de IA que você ativa apenas quando quiser.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button className="px-7 py-3.5 rounded-full font-medium text-sm bg-apple-text text-white dark:bg-white dark:text-black hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-blue-500/10">
              Começar Agora
            </button>
            <a 
              href="#trilhas" 
              className="px-7 py-3.5 rounded-full font-medium text-sm bg-apple-card dark:bg-dark-card border border-apple-border dark:border-dark-border hover:border-gray-400 dark:hover:border-white/30 transition-all"
            >
              Explorar Trilhas
            </a>
          </div>
        </div>

        {/* MOCKUP INTERATIVO DO WORKSPACE */}
        <div id="como-funciona" className="mt-16 rounded-3xl p-2 sm:p-4 bg-black/5 dark:bg-white/[0.03] border border-apple-border dark:border-white/10 backdrop-blur-sm">
          <div className="rounded-2xl bg-apple-card dark:bg-dark-card border border-apple-border dark:border-dark-border overflow-hidden shadow-2xl">
            
            <div className="px-4 py-3 border-b border-apple-border dark:border-dark-border flex items-center justify-between bg-apple-bg/50 dark:bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs text-apple-muted dark:text-dark-muted font-mono">
                  fix-repair / algoritmos / condicionais.por
                </span>
              </div>

              <button 
                onClick={() => setFreeModeDemo(!freeModeDemo)}
                className="flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-apple-border dark:border-white/10 hover:border-blue-500/50 transition-all"
              >
                {freeModeDemo ? (
                  <>
                    <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Modo Livre: Ativado</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Progressão Guiada (Clique para destravar)</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[340px]">
              
              {/* Coluna 1: Progressão */}
              <div className="lg:col-span-3 p-5 border-b lg:border-b-0 lg:border-r border-apple-border dark:border-dark-border space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-apple-muted dark:text-dark-muted">
                  Trilha Atual
                </span>
                <div className="space-y-2 pt-1 text-sm">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-between font-medium">
                    <span>1. Variáveis</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-500 font-medium flex items-center justify-between">
                    <span>2. Estrutura Se/Senão</span>
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <div className={`p-2.5 rounded-xl flex items-center justify-between transition-opacity ${freeModeDemo ? 'opacity-100 bg-black/5 dark:bg-white/5' : 'opacity-40'}`}>
                    <span>3. Laço Para (For)</span>
                    {freeModeDemo ? <Unlock className="w-4 h-4 text-emerald-400" /> : <Lock className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Coluna 2: Área de Atividade */}
              <div className="lg:col-span-6 p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400">
                    Desafio Prático • Portugol
                  </span>
                  <h3 className="text-lg font-semibold">
                    Verificador de Aprovação
                  </h3>
                  <p className="text-sm text-apple-muted dark:text-dark-muted">
                    Complete a condição para exibir "Aprovado" caso a média seja maior ou igual a 7.0.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#161618] text-gray-200 font-mono text-xs sm:text-sm space-y-1 border border-white/10">
                  <div><span className="text-purple-400">se</span> (media &gt;= <span className="text-amber-300">7.0</span>) {'{'}</div>
                  <div className="pl-4 text-emerald-400">escreva("Aprovado!")</div>
                  <div>{'}'} <span className="text-purple-400">senao</span> {'{'}</div>
                  <div className="pl-4 text-red-400">escreva("Recuperação")</div>
                  <div>{'}'}</div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-apple-muted dark:text-dark-muted flex items-center gap-1.5">
                    <BookmarkCheck className="w-4 h-4 text-blue-400" />
                    Salvo automaticamente nos seus Cards
                  </span>
                  <button className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-colors">
                    Verificar Resposta
                  </button>
                </div>
              </div>

              {/* Coluna 3: Lateral Direita da IA */}
              <div className="lg:col-span-3 p-5 border-t lg:border-t-0 lg:border-l border-apple-border dark:border-dark-border bg-black/[0.02] dark:bg-white/[0.01] flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      Copilot IA
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Opcional
                    </span>
                  </div>
                  <p className="text-xs text-apple-muted dark:text-dark-muted leading-relaxed bg-apple-card dark:bg-dark-card p-3 rounded-xl border border-apple-border dark:border-dark-border">
                    "Sua condição lógica está correta! Quer uma dica de como validar notas inválidas menores que zero?"
                  </p>
                </div>
                <div className="text-[11px] text-apple-muted dark:text-dark-muted text-center pt-4">
                  Ative ou desative o auxílio a qualquer momento.
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* BENTO GRID DE DIFERENCIAIS */}
        <section id="cards" className="mt-24 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
              Projetado para eliminar a sobrecarga.
            </h2>
            <p className="text-sm sm:text-base text-apple-muted dark:text-dark-muted">
              Cada elemento visual foi pensado para manter seu foco na lógica, sem distrações.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-3xl bg-apple-card dark:bg-dark-card border border-apple-border dark:border-dark-border space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <BookmarkCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold">Cofre de Cards Rápidos</h3>
              <p className="text-sm text-apple-muted dark:text-dark-muted leading-relaxed">
                Toda atividade resolvida vira um card interativo no seu perfil para você revisar conceitos em poucos segundos antes das provas.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-apple-card dark:bg-dark-card border border-apple-border dark:border-dark-border space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Unlock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold">Progressão Flexível</h3>
              <p className="text-sm text-apple-muted dark:text-dark-muted leading-relaxed">
                Siga a trilha passo a passo desbloqueando aulas ao acertar questões, ou desative o bloqueio se já dominar o assunto.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-apple-card dark:bg-dark-card border border-apple-border dark:border-dark-border space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold">Correção & IA Sob Medida</h3>
              <p className="text-sm text-apple-muted dark:text-dark-muted leading-relaxed">
                Validação imediata de múltipla escolha e algoritmos completos, com painel lateral de IA pronto para tirar dúvidas.
              </p>
            </div>
          </div>
        </section>

        {/* VITRINE DAS 4 TRILHAS INICIAIS */}
        <section id="trilhas" className="mt-24 space-y-10">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
              Sua Jornada Inicial
            </h2>
            <p className="text-sm sm:text-base text-apple-muted dark:text-dark-muted">
              As disciplinas mais desafiadoras organizadas em uma sequência clara e visual.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tracks.map((item) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.step}
                  className={`group relative rounded-3xl p-7 bg-gradient-to-br ${item.accent} bg-apple-card dark:bg-dark-card border border-apple-border dark:border-dark-border hover:border-gray-400 dark:hover:border-white/25 transition-all duration-300 flex flex-col justify-between gap-6`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${item.badgeColor}`}>
                        {item.lang}
                      </span>
                      <span className="text-xs font-mono text-apple-muted dark:text-dark-muted">
                        ETAPA {item.step}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-2xl bg-black/5 dark:bg-white/5">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold tracking-tight">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-sm text-apple-muted dark:text-dark-muted leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-apple-border/60 dark:border-white/5 text-xs font-medium">
                    <span>Múltipla escolha & Código prático</span>
                    <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Ver trilha <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-apple-border dark:border-dark-border py-10 px-6 text-center text-xs text-apple-muted dark:text-dark-muted">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-semibold text-apple-text dark:text-dark-text">Fix Repair</span>
          <span>Plataforma Web Interativa de Apoio ao Aprendizado de Algoritmos</span>
        </div>
      </footer>
    </div>
  );
}