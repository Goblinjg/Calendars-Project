import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, Plus, StickyNote } from "lucide-react";

interface Anotacao {
  anotacao_id: number;
  titulo: string;
  conteudo: string;
}

export function Anotacoes() {
  const [anotacoes, setAnotacoes] = useState<Anotacao[]>([]);
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");

  // Novo estado para saber se estamos editando (guarda o ID) ou criando (null)
  const [idEdicao, setIdEdicao] = useState<number | null>(null);

  useEffect(() => {
    carregarAnotacoes();
  }, []);

  async function carregarAnotacoes() {
    try {
      const response = await api.get("/anotacoes");
      setAnotacoes(response.data);
    } catch (error) {
      console.error("Erro ao listar:", error);
    }
  }

  // Função unificada: Decide se cria ou atualiza
  async function handleSalvar(e: React.FormEvent) {
    e.preventDefault();
    if (!titulo) return alert("O título é obrigatório!");
    const usuarioLogadoString = localStorage.getItem("usuario_logado");
    const usuarioLogado = JSON.parse(usuarioLogadoString || "{}");
    if (!usuarioLogado || !usuarioLogado.user_id) {
      alert(
        "Sessão expirada ou usuário não autenticado. Faça login novamente."
      );
      return;
    }

    try {
      if (idEdicao) {
        // (PUT) [RF005] Atualizar Anotação
        await api.put(`/anotacoes/${idEdicao}`, {
          titulo,
          conteudo,
        });
        alert("Anotação atualizada!");
      } else {
        // (POST) [RF003] Criar Anotação
        await api.post("/anotacoes", {
          titulo,
          conteudo,
          user_id: usuarioLogado.user_id,
        });
        alert("Anotação criada!");
      }

      limparFormulario();
      carregarAnotacoes();
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar anotação.");
    }
  }

  // Prepara o formulário para edição
  function iniciarEdicao(nota: Anotacao) {
    setIdEdicao(nota.anotacao_id);
    setTitulo(nota.titulo);
    setConteudo(nota.conteudo);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function limparFormulario() {
    setIdEdicao(null);
    setTitulo("");
    setConteudo("");
  }

  async function handleExcluir(id: number) {
    if (confirm("Tem certeza que deseja excluir?")) {
      await api.delete(`/anotacoes/${id}`);
      carregarAnotacoes();
    }
  }

  return (
    <div className="space-y-8 fade-in">
      <div>
        <h2 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <StickyNote className="text-primary" /> Minhas Anotações
        </h2>
        <p className="text-muted-foreground mt-1">
          Gerencie suas ideias e lembretes.
        </p>
      </div>

      {/* Formulário Inteligente (Criação/Edição) */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">
            {idEdicao ? "✏️ Editando Anotação" : "✨ Nova Anotação"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSalvar} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="titulo">Título *</Label>
              <Input
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex: Resumo de História"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="conteudo">Conteúdo</Label>
              <Textarea
                id="conteudo"
                value={conteudo}
                onChange={(e) => setConteudo(e.target.value)}
                placeholder="Detalhes da anotação..."
                rows={3}
              />
            </div>

            <div className="flex gap-3 justify-end">
              {idEdicao && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={limparFormulario}
                >
                  Cancelar
                </Button>
              )}
              <Button type="submit" variant="primary" className="gap-2">
                {idEdicao ? (
                  "Atualizar"
                ) : (
                  <>
                    <Plus size={18} /> Salvar
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Lista de Anotações (Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {anotacoes.map((nota) => (
          <Card
            key={nota.anotacao_id}
            className="group hover:shadow-md transition-all border-border bg-secondary/20 flex flex-col"
          >
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-bold text-foreground line-clamp-1">
                {nota.titulo}
              </CardTitle>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => iniciarEdicao(nota)}
                >
                  <Pencil size={14} />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={() => handleExcluir(nota.anotacao_id)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground whitespace-pre-wrap line-clamp-4">
                {nota.conteudo}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {anotacoes.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
          <StickyNote className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
          <p className="text-muted-foreground">Nenhuma anotação encontrada.</p>
          <p className="text-sm text-muted-foreground/60">
            Crie uma nova acima!
          </p>
        </div>
      )}
    </div>
  );
}
