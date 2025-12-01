import { Router } from "express";
import { UsuarioController } from "./controller/UsuarioController";
import { AnotacaoController } from "./controller/AnotacaoController";
import { DashboardController } from "./controller/DashboardController";

const router = Router();

// --- LOG para ajudar a ver se a rota foi chamada ---
router.use((req, res, next) => {
  console.log(
    `[${new Date().toLocaleTimeString()}] Requisição recebida: ${req.method} ${
      req.url
    }`
  );
  next();
});

router.get("/dashboard/resumo", DashboardController.getResumo);

// Rotas de Usuário
router.post("/cadastro", UsuarioController.cadastrarUsuario);
router.post("/login", UsuarioController.autenticar);

// Rotas de Anotações
router.post("/anotacoes", AnotacaoController.criar);
router.get("/anotacoes", AnotacaoController.listar);
router.put("/anotacoes/:id", AnotacaoController.atualizar);
router.delete("/anotacoes/:id", AnotacaoController.excluir);

export default router;
