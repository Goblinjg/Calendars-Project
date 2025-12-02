import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar as CalendarIcon, MapPin, Clock } from "lucide-react";

interface Aula {
  dia_semana: string;
  hora_inicio: string;
  hora_fim: string;
  nome_materia: string;
  local: string;
}

const DIAS_ORDEM = [
  "Segunda-feira", "Terça-feira", "Quarta-feira", 
  "Quinta-feira", "Sexta-feira", "Sábado"
];

export function Calendario() {
  const [aulas, setAulas] = useState<Aula[]>([]);
  const usuario = JSON.parse(localStorage.getItem("usuario_logado") || "{}");

  useEffect(() => {
    if (usuario.user_id) {
      api.get(`/calendario?user_id=${usuario.user_id}`)
         .then(res => setAulas(res.data))
         .catch(err => console.error(err));
    }
  }, []);

  // Função para filtrar aulas de um dia específico
  const getAulasDoDia = (dia: string) => {
    return aulas.filter(a => a.dia_semana === dia);
  };

  return (
    <div className="space-y-8 fade-in p-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <CalendarIcon className="text-primary" /> Meu Calendário Acadêmico
        </h2>
        <p className="text-muted-foreground mt-1">
          Visualização semanal das suas aulas.
        </p>
      </div>

      {/* Grid Responsivo: 1 coluna no mobile, até 6 no desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {DIAS_ORDEM.map(dia => (
          <div key={dia} className="flex flex-col gap-3">
            {/* Cabeçalho do Dia */}
            <div className="bg-primary/10 text-primary font-bold text-center py-2 rounded-md border border-primary/20">
              {dia.split("-")[0]} {/* Mostra só "Segunda", "Terça"... */}
            </div>

            {/* Lista de Aulas do Dia */}
            <div className="space-y-3 h-full bg-secondary/10 p-2 rounded-lg min-h-[200px]">
              {getAulasDoDia(dia).length === 0 ? (
                <div className="text-center text-xs text-muted-foreground py-10 opacity-50">
                  Sem aulas
                </div>
              ) : (
                getAulasDoDia(dia).map((aula, idx) => (
                  <Card key={idx} className="shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-primary">
                    <CardContent className="p-3">
                      <div className="font-bold text-sm line-clamp-2 leading-tight mb-2">
                        {aula.nome_materia}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                        <Clock size={12} /> {aula.hora_inicio} - {aula.hora_fim}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin size={12} /> {aula.local || "N/A"}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}