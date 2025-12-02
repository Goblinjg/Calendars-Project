import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock,
  Plus,
  Trash2,
  StickyNote,
} from "lucide-react";
import React from "react";

interface Materia {
  materia_id: number;
  nome_materia: string;
}

interface Anotacao {
  anotacao_id: number;
  titulo: string;
}

interface Tarefa {
  tarefa_id: number;
  descricao: string;
  data_entrega: string;
  status: string;
  nome_materia: string;
  materia_id: number;
  titulo_anotacao?: string;
}

interface ApiError {
  response?: { data?: { error?: string } };
}

export function Tarefas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [anotacoes, setAnotacoes] = useState<Anotacao[]>([]);

  // Estado de Ordenação
  const [ordenacao, setOrdenacao] = useState("data"); // 'data' ou 'materia'

  // Estados do Formulário
  const [descricao, setDescricao] = useState("");
  const [dataEntrega, setDataEntrega] = useState("");
  const [materiaSelecionada, setMateriaSelecionada] = useState("");
  const [anotacaoSelecionada, setAnotacaoSelecionada] = useState("");

  const usuario = JSON.parse(localStorage.getItem("usuario_logado") || "{}");

  const carregarDados = React.useCallback(async () => {
    if (!usuario.user_id) return;

    try {
      const resTarefas = await api.get(`/tarefas?user_id=${usuario.user_id}`);
      setTarefas(resTarefas.data);

      const resMaterias = await api.get(`/materias?user_id=${usuario.user_id}`);
      setMaterias(resMaterias.data);

      const resAnotacoes = await api.get(
        `/anotacoes?user_id=${usuario.user_id}`
      );
      setAnotacoes(resAnotacoes.data);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  }, [usuario.user_id]); // A função será recriada apenas se o ID mudar

  // carregarDados ao array de dependências do useEffect
  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  // Lógica de Ordenação
  const tarefasOrdenadas = [...tarefas].sort((a, b) => {
    if (ordenacao === "materia") {
      return (a.nome_materia || "").localeCompare(b.nome_materia || "");
    }
    // Padrão: Data
    return (
      new Date(a.data_entrega).getTime() - new Date(b.data_entrega).getTime()
    );
  });

  async function handleSalvar(e: React.FormEvent) {
    e.preventDefault();
    if (!descricao || !dataEntrega || !materiaSelecionada) {
      return alert("Preencha a descrição, data e matéria!");
    }

    try {
      await api.post("/tarefas", {
        descricao,
        data_entrega: dataEntrega,
        materia_id: Number(materiaSelecionada),
        anotacao_id: anotacaoSelecionada ? Number(anotacaoSelecionada) : null,
        user_id: usuario.user_id,
      });

      alert("Tarefa criada!");
      setDescricao("");
      setDataEntrega("");
      setMateriaSelecionada("");
      setAnotacaoSelecionada("");
      carregarDados();
    } catch (error) {
      const err = error as ApiError;
      alert(err.response?.data?.error || "Erro ao criar tarefa");
    }
  }

  async function handleStatus(id: number, novoStatus: string) {
    try {
      await api.patch(`/tarefas/${id}/status`, { status: novoStatus });
      carregarDados();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleExcluir(id: number) {
    if (confirm("Excluir esta tarefa?")) {
      try {
        await api.delete(`/tarefas/${id}`);
        carregarDados();
      } catch (error) {
        console.error(error);
        alert("Erro ao excluir.");
      }
    }
  }

  return (
    <div className="space-y-8 fade-in p-6 max-w-5xl mx-auto">
      {/* Cabeçalho com Seletor de Ordenação */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <CalendarDays className="text-primary" /> Minhas Tarefas
          </h2>
          <p className="text-muted-foreground mt-1">Organize suas entregas.</p>
        </div>

        <div className="flex items-center gap-2">
          <Label className="text-sm">Ordenar por:</Label>
          <select
            className="h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            value={ordenacao}
            onChange={(e) => setOrdenacao(e.target.value)}
          >
            <option value="data">Data de Entrega</option>
            <option value="materia">Matéria</option>
          </select>
        </div>
      </div>

      <Card className="border-border bg-card shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">✨ Nova Tarefa</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSalvar}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
          >
            <div className="md:col-span-2">
              <Label htmlFor="desc">Descrição *</Label>
              <Input
                id="desc"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Ex: Lista 01"
              />
            </div>

            <div>
              <Label htmlFor="materia">Matéria *</Label>
              <select
                id="materia"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={materiaSelecionada}
                onChange={(e) => setMateriaSelecionada(e.target.value)}
              >
                <option value="">Selecione...</option>
                {materias.map((m) => (
                  <option key={m.materia_id} value={m.materia_id}>
                    {m.nome_materia}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="anotacao">Anotação (Opcional)</Label>
              <select
                id="anotacao"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={anotacaoSelecionada}
                onChange={(e) => setAnotacaoSelecionada(e.target.value)}
              >
                <option value="">Nenhuma</option>
                {anotacoes.map((a) => (
                  <option key={a.anotacao_id} value={a.anotacao_id}>
                    {a.titulo}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-1">
              <Label htmlFor="data">Entrega *</Label>
              <Input
                id="data"
                type="date"
                value={dataEntrega}
                onChange={(e) => setDataEntrega(e.target.value)}
              />
            </div>

            <div className="md:col-start-4">
              <Button type="submit" className="w-full gap-2">
                <Plus size={18} /> Criar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {/* Usamos tarefasOrdenadas aqui */}
        {tarefasOrdenadas.map((tarefa) => (
          <div
            key={tarefa.tarefa_id}
            className="flex flex-col md:flex-row items-center justify-between p-4 bg-card border border-border rounded-lg shadow-sm"
          >
            <div className="flex items-start gap-4 mb-4 md:mb-0 w-full md:w-auto">
              <div
                className={`mt-1 p-2 rounded-full ${
                  tarefa.status === "Concluida"
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {tarefa.status === "Concluida" ? (
                  <CheckCircle2 size={24} />
                ) : (
                  <Circle size={24} />
                )}
              </div>
              <div>
                <h4
                  className={`text-lg font-bold ${
                    tarefa.status === "Concluida"
                      ? "line-through text-muted-foreground"
                      : "text-foreground"
                  }`}
                >
                  {tarefa.descricao}
                </h4>
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mt-1">
                  <span className="font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">
                    {tarefa.nome_materia || "Sem matéria"}
                  </span>

                  {tarefa.titulo_anotacao && (
                    <span className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      <StickyNote size={12} />
                      {tarefa.titulo_anotacao}
                    </span>
                  )}

                  <span className="flex items-center gap-1">
                    <Clock size={14} />{" "}
                    {new Date(tarefa.data_entrega).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 w-full md:w-auto justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  handleStatus(
                    tarefa.tarefa_id,
                    tarefa.status === "Concluida" ? "A Fazer" : "Concluida"
                  )
                }
              >
                {tarefa.status === "Concluida" ? "Reabrir" : "Concluir"}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:text-destructive"
                onClick={() => handleExcluir(tarefa.tarefa_id)}
              >
                <Trash2 size={18} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
