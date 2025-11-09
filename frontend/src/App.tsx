import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-10 text-foreground isolate">
      <h1 className="mb-4 text-3xl font-bold text-primary">
        Sistema de Gerenciamento Acadêmico
      </h1>

      <p className="mb-4 text-accent-foreground">Teste</p>

      <Button variant="primary" size="lg">
        Meu Botão ReUI
      </Button>
    </div>
  );
}

export default App;
