import { Request, Response } from "express";
import { MateriaModel, Materia, Horario } from "../models/MateriaModel";

export const MateriaController = {
  // RF011: Cadastrar Matéria
  criar: async (req: Request, res: Response) => {
    const { nome_materia, local, user_id, horarios } = req.body;

    // Validação Obrigatória
    if (!nome_materia) {
      return res
        .status(400)
        .json({ error: "O nome da matéria é obrigatório." });
    }

    if (!user_id) {
      return res.status(400).json({ error: "Usuário não identificado." });
    }

    // Regra de Negócio: Hora fim > Hora inicio
    if (horarios && Array.isArray(horarios)) {
      for (const h of horarios) {
        if (h.hora_fim <= h.hora_inicio) {
          return res.status(400).json({
            error: `Horário inválido no ${h.dia_semana}: O fim da aula deve ser depois do início.`,
          });
        }
      }
    }

    try {
      const novaMateria: Materia = { nome_materia, local, user_id, horarios };
      const id = await MateriaModel.criar(novaMateria);

      res.status(201).json({
        mensagem: "Matéria cadastrada com sucesso!",
        materia_id: id,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  listar: async (req: Request, res: Response) => {
    // Pegamos o user_id da query string (ex: /materias?user_id=1) ou do corpo, dependendo da sua auth
    const { user_id } = req.query;

    if (!user_id)
      return res.status(400).json({ error: "ID do usuário é necessário." });

    try {
      const materias = await MateriaModel.listarPorUsuario(Number(user_id));
      res.json(materias);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  excluir: async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID da matéria é obrigatório." });
    }

    try {
      await MateriaModel.excluir(Number(id));
      // Graças ao ON DELETE CASCADE no banco, os horários somem sozinhos.
      res.json({ mensagem: "Matéria excluída com sucesso!" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};
