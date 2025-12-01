import { useEffect, useState } from 'react';
import { api } from '../services/api';

interface Anotacao {
  anotacao_id: number;
  titulo: string;
  conteudo: string;
}

export function Anotacoes() {
  const [anotacoes, setAnotacoes] = useState<Anotacao[]>([]);
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  
  // Novo estado para saber se estamos editando (guarda o ID) ou criando (null)
  const [idEdicao, setIdEdicao] = useState<number | null>(null);

  useEffect(() => {
    carregarAnotacoes();
  }, []);

  async function carregarAnotacoes() {
    try {
      const response = await api.get('/anotacoes');
      setAnotacoes(response.data);
    } catch (error) {
      console.error("Erro ao listar:", error);
    }
  }

  // Função unificada: Decide se cria ou atualiza
  async function handleSalvar(e: React.FormEvent) {
    e.preventDefault();
    if (!titulo) return alert('O título é obrigatório!');
    const usuarioLogadoString = localStorage.getItem('usuario_logado');
    const usuarioLogado = JSON.parse(usuarioLogadoString || '{}');
    if (!usuarioLogado || !usuarioLogado.user_id) {
      alert("Sessão expirada ou usuário não autenticado. Faça login novamente.");
      return;
    }

    try {
      if (idEdicao) {
        // (PUT) [RF005] Atualizar Anotação
        await api.put(`/anotacoes/${idEdicao}`, {
          titulo,
          conteudo
        });
        alert('Anotação atualizada!');
      } else {
        // (POST) [RF003] Criar Anotação
        await api.post('/anotacoes', {
          titulo,
          conteudo,
          user_id: usuarioLogado.user_id 
        });
        alert('Anotação criada!');
      }
      
      limparFormulario();
      carregarAnotacoes();

    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar anotação.');
    }
  }

  // Prepara o formulário para edição
  function iniciarEdicao(nota: Anotacao) {
    setIdEdicao(nota.anotacao_id);
    setTitulo(nota.titulo);
    setConteudo(nota.conteudo);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function limparFormulario() {
    setIdEdicao(null);
    setTitulo('');
    setConteudo('');
  }

  async function handleExcluir(id: number) {
    if (confirm('Tem certeza que deseja excluir?')) {
      await api.delete(`/anotacoes/${id}`);
      carregarAnotacoes();
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Minhas Anotações</h1>

      {/* Formulário Inteligente */}
      <form onSubmit={handleSalvar} className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          {idEdicao ? 'Editando Anotação' : 'Nova Anotação'}
        </h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-600">Título *</label>
          <input 
            type="text" 
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: Prova de Cálculo"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-600">Conteúdo</label>
          <textarea 
            value={conteudo}
            onChange={e => setConteudo(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Detalhes da anotação..."
          />
        </div>

        <div className="flex gap-2">
          <button 
            type="submit"
            className={`px-4 py-2 rounded text-white font-medium transition-colors ${
              idEdicao ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {idEdicao ? 'Atualizar' : 'Salvar'}
          </button>

          {idEdicao && (
            <button 
              type="button"
              onClick={limparFormulario}
              className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400 transition-colors"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Lista de Anotações */}
      <div className="grid gap-4">
        {anotacoes.map(nota => (
          <div key={nota.anotacao_id} className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg text-gray-800">{nota.titulo}</h3>
              <p className="text-gray-600 mt-1 whitespace-pre-wrap">{nota.conteudo}</p>
            </div>
            
            <div className="flex gap-2 ml-4">
              <button 
                onClick={() => iniciarEdicao(nota)}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm px-2 py-1 border border-blue-200 rounded hover:bg-blue-50"
              >
                Editar
              </button>
              <button 
                onClick={() => handleExcluir(nota.anotacao_id)}
                className="text-red-600 hover:text-red-800 font-medium text-sm px-2 py-1 border border-red-200 rounded hover:bg-red-50"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
        
        {anotacoes.length === 0 && (
          <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500">Nenhuma anotação encontrada.</p>
            <p className="text-sm text-gray-400">Crie uma nova acima!</p>
          </div>
        )}
      </div>
    </div>
  );
}