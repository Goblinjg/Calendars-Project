import { useState } from 'react';
import { api } from '../services/api';
// Assumindo que você usa react-router-dom para navegação
import { useNavigate, Link } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErro('');

    try {
      // RF001 - Fluxo Principal: Passo 3 e 4
      const response = await api.post('/login', { email, senha });

      // RF001 - Pós-condição: Concede a sessão (aqui salvamos no localStorage para persistência) 
      localStorage.setItem('usuario_logado', JSON.stringify(response.data));
      
      // RF001 - Fluxo Principal: Passo 5 (Redireciona para o menu principal/dashboard)
      navigate('/dashboard'); 

    } catch (error: unknown) {
      // RF001 - Fluxo Alternativo: Passo 5 (Exibe mensagem de erro) 
      setErro('E-mail ou senha incorretos.');
      console.error('Erro no login:', error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Acessar Calendars</h1>

        {erro && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm text-center">
            {erro}
          </div>
        )}

        <form onSubmit={handleLogin}>
          {/* RF001 - Fluxo Principal: Passo 2 (Campos email e senha)  */}
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

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1 text-gray-600">Senha</label>
            <input 
              type="password" 
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="******"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Não tem uma conta?{' '}
          <Link to="/cadastro" className="text-blue-600 hover:underline font-medium">
            Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
}