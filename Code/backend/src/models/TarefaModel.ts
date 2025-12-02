import db from '../database/db';

export interface Tarefa {
  tarefa_id?: number;
  descricao: string;
  data_entrega: string;
  status?: string;
  user_id: number;
  materia_id: number;
  anotacao_id?: number | null; // Adicionado: Agora aceita anotação opcional
}

export const TarefaModel = {
  criar: (t: Tarefa): Promise<number> => {
    return new Promise((resolve, reject) => {
      // Adicionamos anotacao_id no INSERT
      const sql = `
        INSERT INTO tarefas (descricao, data_entrega, status, user_id, materia_id, anotacao_id)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const status = t.status || 'A Fazer';
      
      // Se não tiver anotação, salva como NULL
      const anotacaoId = t.anotacao_id || null;
      
      db.run(sql, [t.descricao, t.data_entrega, status, t.user_id, t.materia_id, anotacaoId], function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      });
    });
  },

  listarPorUsuario: (userId: number): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      // --- AQUI ESTÁ A INTERAÇÃO DE 3 TABELAS ---
      // Buscamos dados da Tarefa, da Matéria E da Anotação
      const sql = `
        SELECT t.*, m.nome_materia, a.titulo as titulo_anotacao
        FROM tarefas t
        LEFT JOIN materias m ON t.materia_id = m.materia_id
        LEFT JOIN anotacoes a ON t.anotacao_id = a.anotacao_id
        WHERE t.user_id = ?
        ORDER BY t.data_entrega ASC
      `;
      db.all(sql, [userId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  atualizarStatus: (id: number, status: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE tarefas SET status = ? WHERE tarefa_id = ?';
      db.run(sql, [status, id], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  },

  excluir: (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM tarefas WHERE tarefa_id = ?';
      db.run(sql, [id], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
};