import { useState } from "react";
import { api } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";

export function Cadastro() {
  const navigate = useNavigate();

  // RF002 - Cadastra Usuario
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [mensagem, setMensagem] = useState({ tipo: "", texto: "" });

  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault();
    setMensagem({ tipo: "", texto: "" });

    // RF002 - Regra de Negócio 2: Senha e Confirmar Senha devem ser idênticos
    if (senha !== confirmarSenha) {
      setMensagem({ tipo: "erro", texto: "As senhas não coincidem." });
      return;
    }

    try {
      // RF002 - Fluxo Principal: Passo 3 (Preenche e clica em Cadastrar)
      await api.post("/cadastro", {
        nome,
        email,
        senha,
      });

      // RF002 - Fluxo Principal: Passo 7 (Mensagem de sucesso)
      setMensagem({ tipo: "sucesso", texto: "Usuário salvo com sucesso!" });

      // RF002 - Fluxo Principal: Passo 8 (Redireciona para login)
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: unknown) {
      // RF002 - Fluxo Alternativo 5b/6b: Email já existe
      const apiError = error as { response?: { status: number } };

      if (apiError?.response?.status === 409) {
        setMensagem({ tipo: "erro", texto: "Este e-mail já está em uso." });
      } else {
        setMensagem({
          tipo: "erro",
          texto: "Erro ao realizar cadastro. Tente novamente.",
        });
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
      <Card className="w-full max-w-md border-border shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
            <UserPlus className="text-primary" /> Crie sua conta
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Preencha os dados abaixo para começar
          </p>
        </CardHeader>
        <CardContent>
          {mensagem.texto && (
            <div
              className={`mb-4 p-3 rounded-md text-sm text-center border ${
                mensagem.tipo === "sucesso"
                  ? "bg-green-500/10 border-green-500/50 text-green-600 dark:text-green-400"
                  : "bg-destructive/10 border-destructive/50 text-destructive"
              }`}
            >
              {mensagem.texto}
            </div>
          )}

          <form onSubmit={handleCadastro} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                placeholder="Seu nome"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <Input
                id="senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                minLength={6}
                placeholder="******"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmar">Confirmar Senha</Label>
              <Input
                id="confirmar"
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
                placeholder="Repita a senha"
              />
            </div>

            <Button
              type="submit"
              className="w-full font-bold"
              variant="primary"
            >
              Cadastrar
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Já possui conta?{" "}
            <Link
              to="/login"
              className="text-primary hover:underline font-medium"
            >
              Faça Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
