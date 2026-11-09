import React, { useState } from 'react';
import { Sparkles, Send, Power, Lightbulb, Bug, HelpCircle } from 'lucide-react';

export function AICopilotDrawer({ isEnabled, onToggle, currentTopic, lang }) {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: `Olá! Sou o assistente pedagógico da Fix Repair. Estou acompanhando sua atividade de "${currentTopic}" em ${lang}. Como posso te ajudar a pensar na lógica sem te dar a resposta pronta?`
    }
  ]);
  const [input, setInput] = useState('');

  const sendQuickPrompt = (promptText, simulatedReply) => {
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: promptText },
      { role: 'ai', text: simulatedReply }
    ]);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userText = input;
    setInput('');
    
    // Espaço onde o Gean vai conectar o fetch() para a API de IA Generativa dele no Node.js
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: userText },
      { 
        role: 'ai', 
        text: `[Espaço integrado para a API do Gean]: Analisando sua dúvida sobre "${userText}" dentro do contexto de ${lang}... Lembre-se de verificar a condição lógica antes do bloco de saída!` 
      }
    ]);
  };

  return (
    <aside className="rounded-3xl bg-apple-card dark:bg-dark-card border border-apple-border dark:border-dark-border flex flex-col justify-between h-full min-h-[520px] overflow-hidden shadow-sm">
      
      {/* Topo da Lateral Direita: Switch para Ligar / Desligar a IA */}
      <div className="p-5 border-b border-apple-border dark:border-dark-border flex items-center justify-between bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/5">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-xl ${isEnabled ? 'bg-purple-500/20 text-purple-400' : 'bg-black/5 dark:bg-white/5 text-apple-muted'}`}>
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold leading-none">Copilot IA</h3>
            <span className="text-[11px] text-apple-muted dark:text-dark-muted">
              {isEnabled ? 'Auxílio ativo' : 'Desativado pelo aluno'}
            </span>
          </div>
        </div>

        <button
          onClick={onToggle}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            isEnabled 
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
              : 'bg-black/5 dark:bg-white/10 text-apple-muted dark:text-dark-muted'
          }`}
        >
          <Power className="w-3 h-3" />
          {isEnabled ? 'Ativo' : 'Ativar IA'}
        </button>
      </div>

      {/* Corpo: Se o aluno desativar a IA, mostra tela limpa de foco */}
      {!isEnabled ? (
        <div className="p-8 text-center my-auto space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center mx-auto text-apple-muted">
            <Power className="w-5 h-5" />
          </div>
          <h4 className="font-semibold text-sm">Modo Resolução Solo</h4>
          <p className="text-xs text-apple-muted dark:text-dark-muted leading-relaxed">
            O assistente de IA está desativado para você testar seus conhecimentos sem dicas. Você pode reativá-lo no botão acima quando quiser.
          </p>
        </div>
      ) : (
        <>
          {/* Histórico de Mensagens + Botões de Dica Progressiva */}
          <div className="p-4 space-y-3 overflow-y-auto max-h-[340px] text-xs">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl leading-relaxed ${
                  msg.role === 'ai'
                    ? 'bg-black/5 dark:bg-white/[0.04] text-apple-text dark:text-gray-200 border border-apple-border dark:border-white/5'
                    : 'bg-blue-600 text-white ml-6'
                }`}
              >
                {msg.text}
              </div>
            ))}

            {/* Botões de Scaffolding (Dicas Rápidas) */}
            <div className="pt-2 space-y-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-apple-muted dark:text-dark-muted px-1">
                Ações Rápidas Pedagógicas
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => sendQuickPrompt(
                    'Me dê uma dica de lógica',
                    'Dica de Lógica: Divida o problema em 3 partes — 1º leia os valores, 2º teste a condição dentro dos parênteses do "se", 3º exiba a mensagem correspondente.'
                  )}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 transition-colors"
                >
                  <Lightbulb className="w-3 h-3" />
                  Dica de lógica
                </button>
                <button
                  onClick={() => sendQuickPrompt(
                    'Explique meu erro de sintaxe',
                    `Em ${lang}, verifique se você abriu e fechou todas as chaves "{ }" corretamente e se usou o operador relacional ">=" sem espaços entre os símbolos.`
                  )}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                >
                  <Bug className="w-3 h-3" />
                  Explicar sintaxe
                </button>
                <button
                  onClick={() => sendQuickPrompt(
                    'Mostre um exemplo parecido',
                    'Exemplo similar: se (idade >= 18) { escreva("Maior de idade") } senao { escreva("Menor") }.'
                  )}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-colors"
                >
                  <HelpCircle className="w-3 h-3" />
                  Exemplo parecido
                </button>
              </div>
            </div>
          </div>

          {/* Campo de digitação de dúvida */}
          <form onSubmit={handleSend} className="p-3 border-t border-apple-border dark:border-dark-border flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tire uma dúvida com a IA..."
              className="w-full px-3.5 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-transparent focus:border-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-colors shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </>
      )}
    </aside>
  );
}