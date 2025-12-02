import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./view/I_Login";
import { Cadastro } from "./view/I_Cadastro";
import { Anotacoes } from "./view/I_Anotacoes";
import { Dashboard } from "./view/I_Dashboard";
import { Materias } from "./view/I_Materia";
import { Tarefas } from "./view/I_Tarefas";
import { Layout } from "./components/ui/Layout";
import { Calendario } from "./view/I_Calendario";
import type { JSX } from "react";

// Componente para proteger rotas (Só deixa passar se tiver logado)
const RotaPrivada = ({ children }: { children: JSX.Element }) => {
  const usuarioLogado = localStorage.getItem("usuario_logado");

  // Se não tiver usuário salvo, manda pro login
  if (!usuarioLogado) {
    return <Navigate to="/login" />;
  }

  // Se tiver, mostra o conteúdo (ex: Dashboard/Anotações)
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

        {/* Todas as rotas dentro do Layout terão a Sidebar */}
        <Route
          element={
            <RotaPrivada>
              <Layout />
            </RotaPrivada>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/calendario"
            element={
              <RotaPrivada>
                <Calendario />
              </RotaPrivada>
            }
          />
          <Route
            path="/tarefas"
            element={
              <RotaPrivada>
                <Tarefas />
              </RotaPrivada>
            }
          />
          <Route path="/anotacoes" element={<Anotacoes />} />
          <Route
            path="/materias"
            element={
              <RotaPrivada>
                <Materias />
              </RotaPrivada>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
