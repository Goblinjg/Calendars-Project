
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

  // RF004: Listar Anotações ao carregar a página
  useEffect(() => {
    carregarAnotacoes();
  }, []);

  async function carregarAnotacoes() {
    const response = await api.get('/anotacoes');
    setAnotacoes(response.data);
  }

  // RF003: Criar Anotação
  async function handleCriar(e: React.FormEvent) {
    e.preventDefault();
    
    if (!titulo) return alert('O título é obrigatório!');

    try {
      await api.post('/anotacoes', {
        titulo,
        conteudo,
        user_id: 1 //  não temos login ainda
      });
      
      // Limpa o form e recarrega a lista
      setTitulo('');
      setConteudo('');
      carregarAnotacoes();
    } catch (error) {
      console.error('Erro ao criar:', error);
      alert('Erro ao criar anotação.');
    }
  }

  // RF006: Excluir Anotação (Bônus para fechar o CRUD)
  async function handleExcluir(id: number) {
    if (confirm('Tem certeza que deseja excluir?')) {
      await api.delete(`/anotacoes/${id}`);
      carregarAnotacoes();
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Minhas Anotações</h1>

      {/* Formulário de Criação */}
      <form onSubmit={handleCriar} className="bg-gray-100 p-4 rounded-lg mb-8">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Título</label>
          <input 
            type="text" 
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Ex: Prova de Cálculo"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Conteúdo</label>
          <textarea 
            value={conteudo}
            onChange={e => setConteudo(e.target.value)}
            className="w-full p-2 border rounded h-24"
            placeholder="Detalhes da anotação..."
          />
        </div>

        <button 
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Salvar Anotação
        </button>
      </form>

      {/* Lista de Anotações */}
      <div className="grid gap-4">
        {anotacoes.map(nota => (
          <div key={nota.anotacao_id} className="border p-4 rounded shadow-sm flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg">{nota.titulo}</h3>
              <p className="text-gray-600 mt-1">{nota.conteudo}</p>
            </div>
            <button 
              onClick={() => handleExcluir(nota.anotacao_id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Excluir
            </button>
          </div>
        ))}
        
        {anotacoes.length === 0 && (
          <p className="text-gray-500 text-center">Nenhuma anotação encontrada.</p>
        )}
      </div>
    </div>
  );
}