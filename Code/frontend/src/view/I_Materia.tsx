import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, MapPin, Plus, Trash2, Clock, X } from "lucide-react";

// Tipagens para evitar erros de lint (any)
interface ApiError {
  response?: {
    data?: {
      error?: string;
    };
  };
}

interface HorarioInput {
  dia_semana: string;
  hora_inicio: string;
  hora_fim: string;
}

interface Materia {
  materia_id: number;
  nome_materia: string;
  local: string;
}

export function Materias() {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [nome, setNome] = useState("");
  const [local, setLocal] = useState("");
  
  const [horarios, setHorarios] = useState<HorarioInput[]>([
    { dia_semana: "Segunda-feira", hora_inicio: "", hora_fim: "" }
  ]);

  useEffect(() => {
    carregarMaterias();
  }, []);

  async function carregarMaterias() {
    try {
      const usuarioLogado = JSON.parse(localStorage.getItem("usuario_logado") || "{}");
      if (!usuarioLogado.user_id) return;

      const response = await api.get(`/materias?user_id=${usuarioLogado.user_id}`);
      setMaterias(response.data);
    } catch (error) {
      console.error("Erro ao listar:", error);
    }
  }

  function addHorario() {
    setHorarios([...horarios, { dia_semana: "Segunda-feira", hora_inicio: "", hora_fim: "" }]);
  }

  function removeHorario(index: number) {
    const novosHorarios = horarios.filter((_, i) => i !== index);
    setHorarios(novosHorarios);
  }

  function updateHorario(index: number, campo: keyof HorarioInput, valor: string) {
    const novosHorarios = [...horarios];
    novosHorarios[index][campo] = valor;
    setHorarios(novosHorarios);
  }

  async function handleSalvar(e: React.FormEvent) {
    e.preventDefault();
    if (!nome) return alert("O nome da matéria é obrigatório!");

    const usuarioLogado = JSON.parse(localStorage.getItem("usuario_logado") || "{}");
    if (!usuarioLogado || !usuarioLogado.user_id) {
      alert("Sessão expirada. Faça login novamente.");
      return;
    }

    try {
      await api.post("/materias", {
        nome_materia: nome,
        local,
        user_id: usuarioLogado.user_id,
        horarios 
      });
      
      alert("Matéria cadastrada com sucesso!");
      limparFormulario();
      carregarMaterias();

    } catch (error) {
      const err = error as ApiError;
      console.error("Erro ao salvar:", err);
      alert(err.response?.data?.error || "Erro ao salvar matéria.");
    }
  }

  function limparFormulario() {
    setNome("");
    setLocal("");
    setHorarios([{ dia_semana: "Segunda-feira", hora_inicio: "", hora_fim: "" }]);
  }

  async function handleExcluir(id: number) {
    if (confirm("Tem certeza que deseja excluir esta matéria?")) {
      console.log("Excluindo ID:", id); // Uso do ID para evitar erro de lint
      try {
        await api.delete(`/materias/${id}`);
        alert("Matéria excluída!");
        carregarMaterias();
      } catch (error) {
        console.error("Erro ao tentar excluir:", error);
        alert("Erro ao excluir matéria.");
      }
    }
  }

  return (
    <div className="space-y-8 fade-in p-6 max-w-6xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <BookOpen className="text-primary" /> Minhas Matérias
        </h2>
        <p className="text-muted-foreground mt-1">
          Gerencie suas disciplinas e horários de aula.
        </p>
      </div>

      {/* Formulário */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">✨ Nova Matéria</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSalvar} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="nome">Nome da Matéria *</Label>
                <Input
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: Cálculo I"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="local">Local / Sala</Label>
                <Input
                  id="local"
                  value={local}
                  onChange={(e) => setLocal(e.target.value)}
                  placeholder="Ex: PV 3, Sala 10"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold flex items-center gap-2">
                  <Clock size={16} /> Horários de Aula
                </Label>
                <Button type="button" variant="outline" size="sm" onClick={addHorario}>
                  <Plus size={14} className="mr-1" /> Adicionar Horário
                </Button>
              </div>

              {horarios.map((horario, index) => (
                <div key={index} className="flex gap-3 items-end p-3 bg-secondary/20 rounded-md border border-border">
                  <div className="w-1/3">
                    <Label className="text-xs text-muted-foreground">Dia</Label>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={horario.dia_semana}
                      onChange={(e) => updateHorario(index, "dia_semana", e.target.value)}
                    >
                      <option value="Segunda-feira">Segunda-feira</option>
                      <option value="Terça-feira">Terça-feira</option>
                      <option value="Quarta-feira">Quarta-feira</option>
                      <option value="Quinta-feira">Quinta-feira</option>
                      <option value="Sexta-feira">Sexta-feira</option>
                      <option value="Sábado">Sábado</option>
                    </select>
                  </div>
                  <div className="w-1/3">
                    <Label className="text-xs text-muted-foreground">Início</Label>
                    <Input type="time" value={horario.hora_inicio} onChange={(e) => updateHorario(index, "hora_inicio", e.target.value)} />
                  </div>
                  <div className="w-1/3">
                    <Label className="text-xs text-muted-foreground">Fim</Label>
                    <Input type="time" value={horario.hora_fim} onChange={(e) => updateHorario(index, "hora_fim", e.target.value)} />
                  </div>
                  {horarios.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => removeHorario(index)}>
                      <X size={18} />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-3 justify-end pt-2 border-t">
              <Button type="button" variant="ghost" onClick={limparFormulario}>Cancelar</Button>
              <Button type="submit" className="gap-2"><Plus size={18} /> Salvar Matéria</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Lista */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {materias.map((materia) => (
          <Card key={materia.materia_id} className="group hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div className="space-y-1">
                <CardTitle className="text-lg font-bold line-clamp-1">{materia.nome_materia}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground gap-1">
                  <MapPin size={14} /> {materia.local || "Local não definido"}
                </div>
              </div>
              <Button size="icon" variant="ghost" className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleExcluir(materia.materia_id)}>
                <Trash2 size={14} />
              </Button>
            </CardHeader>
            <CardContent>
               <div className="text-sm text-muted-foreground/60 italic">Matéria cadastrada.</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}