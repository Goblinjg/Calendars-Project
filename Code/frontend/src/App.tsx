import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './view/I_Login';   // Ajuste o caminho se necessário
import { Cadastro } from './view/I_Cadastro'; // Ajuste o caminho se necessário
import { Anotacoes } from './view/I_Anotacoes'; // Ajuste o caminho se necessário
import type { JSX } from 'react';

// Componente para proteger rotas (Só deixa passar se tiver logado)
const RotaPrivada = ({ children }: { children: JSX.Element }) => {
  const usuarioLogado = localStorage.getItem('usuario_logado');
  
  // Se não tiver usuário salvo, manda pro login
  if (!usuarioLogado) {
    return <Navigate to="/login" />;
  }

  // Se tiver, mostra o conteúdo (ex: Anotações)
  return children;
};

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota padrão: Ao abrir o site, vai para o Login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Rotas Públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Rotas Privadas (Onde o usuário cai após o login) */}
        {/* No LoginView.tsx definimos navigate('/dashboard'), então precisamos dessa rota: */}
        <Route 
          path="/dashboard" 
          element={
            <RotaPrivada>
              <Anotacoes />
            </RotaPrivada>
          } 
        />
        
        {/* Rota direta para anotações, se precisar */}
        <Route 
          path="/anotacoes" 
          element={
            <RotaPrivada>
              <Anotacoes />
            </RotaPrivada>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;