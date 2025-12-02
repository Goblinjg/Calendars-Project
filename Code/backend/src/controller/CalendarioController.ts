import { Request, Response } from 'express';
import db from '../database/db';

export const CalendarioController = {
  // RF012: Busca todas as aulas para montar a grade
  listarAulas: (req: Request, res: Response) => {
    const { user_id } = req.query;

    if (!user_id) return res.status(400).json({ error: 'User ID obrigatório' });

    const sql = `
      SELECT h.dia_semana, h.hora_inicio, h.hora_fim, m.nome_materia, m.local
      FROM horarios_aula h
      JOIN materias m ON h.materia_id = m.materia_id
      WHERE m.user_id = ?
      ORDER BY 
        CASE h.dia_semana
          WHEN 'Domingo' THEN 1
          WHEN 'Segunda-feira' THEN 2
          WHEN 'Terça-feira' THEN 3
          WHEN 'Quarta-feira' THEN 4
          WHEN 'Quinta-feira' THEN 5
          WHEN 'Sexta-feira' THEN 6
          WHEN 'Sábado' THEN 7
        END,
        h.hora_inicio ASC
    `;

    db.all(sql, [user_id], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  }
};