import { Request, Response } from "express";
import db from "../database/db";

export const DashboardController = {
  getResumo: (req: Request, res: Response) => {
    const { user_id } = req.query;

    if (!user_id) return res.status(400).json({ error: "User ID obrigatório" });

    // AJUSTE: Os nomes devem ser iguais aos salvos na MateriasView ("-feira")
    const diasSemana = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];
    const hoje = diasSemana[new Date().getDay()];

    // Queries
    const sqlAulas = `
      SELECT m.nome_materia, m.local, h.hora_inicio, h.hora_fim 
      FROM horarios_aula h
      JOIN materias m ON h.materia_id = m.materia_id
      WHERE m.user_id = ? AND h.dia_semana = ?
      ORDER BY h.hora_inicio ASC
    `;

    // Nota: Como acabamos de criar a tabela, essa query retornará vazio (sem erro)
    const sqlTarefas = `
      SELECT t.tarefa_id, t.descricao, t.data_entrega, t.status, m.nome_materia
      FROM tarefas t
      LEFT JOIN materias m ON t.materia_id = m.materia_id
      WHERE t.user_id = ? AND t.status != 'Concluida'
      ORDER BY t.data_entrega ASC
      LIMIT 5
    `;

    db.all(sqlAulas, [user_id, hoje], (err, aulas) => {
      if (err) return res.status(500).json({ error: err.message });

      db.all(sqlTarefas, [user_id], (err2, tarefas) => {
        if (err2) return res.status(500).json({ error: err2.message });

        res.json({
          dia: hoje,
          aulas,
          tarefas,
        });
      });
    });
  },
};