import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin, CalendarDays } from "lucide-react";

interface Aula {
  nome_materia: string;
  local: string;
  hora_inicio: string;
  hora_fim: string;
}

interface Tarefa {
  tarefa_id: number;
  descricao: string;
  nome_materia?: string;
  data_entrega: string;
  status: string;
}

interface DashboardData {
  dia: string;
  aulas: Aula[];
  tarefas: Tarefa[];
}

export function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const usuario = JSON.parse(localStorage.getItem("usuario_logado") || "{}");

  useEffect(() => {
    if (usuario.user_id) {
      api
        .get(`/dashboard/resumo?user_id=${usuario.user_id}`)
        .then((res) => setData(res.data))
        .catch((err) => console.error(err));
    }
  }, [usuario.user_id]);

  if (!data) return <div className="text-center mt-10">Carregando...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          Olá, {usuario.nome} 👋
        </h2>
        <p className="text-muted-foreground mt-1">
          Aqui está o resumo do(a) {data.dia}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Coluna 1: Aulas do Dia */}
        <Card className="bg-card border-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Clock className="text-primary" />
              Aulas de Hoje ({data.dia})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.aulas.length === 0 ? (
              <p className="text-muted-foreground italic">
                Nenhuma aula hoje. Aproveite! 🎉
              </p>
            ) : (
              data.aulas.map((aula, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border"
                >
                  <div>
                    <h4 className="font-bold text-lg text-primary">
                      {aula.nome_materia}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Clock size={14} /> {aula.hora_inicio} - {aula.hora_fim}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin size={14} /> {aula.local}
                    </div>
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                    Em breve
                  </span>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Coluna 2: Tarefas Próximas */}
        <Card className="bg-card border-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <CalendarDays className="text-primary" />
              Tarefas Próximas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.tarefas.length === 0 ? (
              <p className="text-muted-foreground italic">
                Nenhuma tarefa pendente. Tudo limpo! ✅
              </p>
            ) : (
              data.tarefas.map((tarefa) => (
                <div
                  key={tarefa.tarefa_id}
                  className="p-4 rounded-lg bg-secondary/50 border border-border"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-foreground">
                        {tarefa.descricao}
                      </h4>
                      <p className="text-sm text-primary font-semibold mt-1">
                        {tarefa.nome_materia || "Geral"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Entrega:{" "}
                        {new Date(tarefa.data_entrega).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full 
                      ${
                        tarefa.status === "A Fazer"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                          : ""
                      }
                      ${
                        tarefa.status === "Em Progresso"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                          : ""
                      }
                    `}
                    >
                      {tarefa.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
