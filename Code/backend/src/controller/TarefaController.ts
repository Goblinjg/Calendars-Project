import { Request, Response } from "express";
import { TarefaModel } from "../models/TarefaModel";

export const TarefaController = {
  criar: async (req: Request, res: Response) => {
    // Pegamos também o anotacao_id (que pode vir vazio)
    const { descricao, data_entrega, user_id, materia_id, anotacao_id } =
      req.body;

    if (!descricao || !data_entrega || !user_id || !materia_id) {
      return res
        .status(400)
        .json({ error: "Descrição, Data e Matéria são obrigatórios." });
    }

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const entrega = new Date(data_entrega);

    if (entrega < hoje) {
      return res
        .status(400)
        .json({ error: "A data de entrega não pode ser no passado." });
    }

    try {
      // Passamos o anotacao_id para o model
      const id = await TarefaModel.criar({
        descricao,
        data_entrega,
        user_id,
        materia_id,
        anotacao_id: anotacao_id ? Number(anotacao_id) : null,
      });

      res.status(201).json({ mensagem: "Tarefa criada!", id });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  // Os outros métodos (listar, atualizar, excluir) continuam iguais
  // pois a lógica pesada está no Model que alteramos acima.
  listar: async (req: Request, res: Response) => {
    const { user_id } = req.query;
    if (!user_id)
      return res.status(400).json({ error: "ID do usuário necessário." });

    try {
      const tarefas = await TarefaModel.listarPorUsuario(Number(user_id));
      res.json(tarefas);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  atualizarStatus: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
      await TarefaModel.atualizarStatus(Number(id), status);
      res.json({ mensagem: "Status atualizado!" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  excluir: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await TarefaModel.excluir(Number(id));
      res.json({ mensagem: "Tarefa excluída!" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};
