import { useState } from "react";
import { api } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    try {
      // RF001 - Fluxo Principal: Passo 3 e 4
      const response = await api.post("/login", { email, senha });

      // RF001 - Pós-condição: Concede a sessão (aqui salvamos no localStorage para persistência)
      localStorage.setItem("usuario_logado", JSON.stringify(response.data));

      // RF001 - Fluxo Principal: Passo 5 (Redireciona para o menu principal/dashboard)
      navigate("/dashboard");
    } catch (error: unknown) {
      // RF001 - Fluxo Alternativo: Passo 5 (Exibe mensagem de erro)
      setErro("E-mail ou senha incorretos.");
      console.error("Erro no login:", error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
      <Card className="w-full max-w-md border-border shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
            <LogIn className="text-primary" /> Acessar Calendars
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Entre com suas credenciais para acessar o sistema
          </p>
        </CardHeader>
        <CardContent>
          {erro && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/50 text-destructive rounded-md text-sm text-center">
              {erro}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* RF001 - Fluxo Principal: Passo 2 (Campos email e senha)  */}
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
                placeholder="******"
              />
            </div>

            <Button type="submit" className="w-full font-bold">
              Entrar
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Não tem uma conta?{" "}
            <Link
              to="/cadastro"
              className="text-primary hover:underline font-medium"
            >
              Cadastre-se
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
