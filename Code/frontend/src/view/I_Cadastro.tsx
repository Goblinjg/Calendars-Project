import { useState } from 'react';
import { api } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

export function Cadastro() {
  const navigate = useNavigate();
  
  // RF002 - Fluxo Principal: Passo 2 (Campos Nome, Email, Senha, Confirmar Senha) 
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });

  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault();
    setMensagem({ tipo: '', texto: '' });

    // RF002 - Regra de Negócio 2: Senha e Confirmar Senha devem ser idênticos [cite: 140]
    // RF002 - Fluxo Alternativo 4a/5a 
    if (senha !== confirmarSenha) {
      setMensagem({ tipo: 'erro', texto: 'As senhas não coincidem.' });
      return;
    }

    try {
      // RF002 - Fluxo Principal: Passo 3 (Preenche e clica em Cadastrar)
      await api.post('/cadastro', {
        nome,
        email,
        senha
      });

      // RF002 - Fluxo Principal: Passo 7 (Mensagem de sucesso) 
      setMensagem({ tipo: 'sucesso', texto: 'Usuário salvo com sucesso!' });

      // RF002 - Fluxo Principal: Passo 8 (Redireciona para login) 
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      // RF002 - Fluxo Alternativo 5b/6b: Email já existe [cite: 137]
      const apiError = error as { response?: { status: number } };
      if (apiError?.response?.status === 409) {
        setMensagem({ tipo: 'erro', texto: 'Este e-mail já está em uso.' });
      } else {
        setMensagem({ tipo: 'erro', texto: 'Erro ao realizar cadastro. Tente novamente.' });
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Crie sua conta</h1>

        {mensagem.texto && (
          <div className={`mb-4 p-3 rounded text-sm text-center border ${
            mensagem.tipo === 'sucesso' 
              ? 'bg-green-100 border-green-400 text-green-700' 
              : 'bg-red-100 border-red-400 text-red-700'
          }`}>
            {mensagem.texto}
          </div>
        )}

        <form onSubmit={handleCadastro}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-600">Nome Completo</label>
            <input 
              type="text" 
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Seu nome"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-600">E-mail</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="seu@email.com"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-600">Senha</label>
            <input 
              type="password" 
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
              minLength={6}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="******"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1 text-gray-600">Confirmar Senha</label>
            <input 
              type="password" 
              value={confirmarSenha}
              onChange={e => setConfirmarSenha(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Repita a senha"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Cadastrar
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Já possui conta?{' '}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Faça Login
          </Link>
        </div>
      </div>
    </div>
  );
}