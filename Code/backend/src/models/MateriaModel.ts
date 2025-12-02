import db from '../database/db';

export interface Horario {
  dia_semana: string;
  hora_inicio: string;
  hora_fim: string;
}

export interface Materia {
  materia_id?: number;
  nome_materia: string;
  local: string;
  user_id: number;
  horarios?: Horario[];
}

export const MateriaModel = {
  // RF011: Cria a matéria e seus horários
  criar: (materia: Materia): Promise<number> => {
    return new Promise((resolve, reject) => {
      
      // 1. Inserir a Matéria
      const sqlMateria = 'INSERT INTO materias (nome_materia, local, user_id) VALUES (?, ?, ?)';
      
      db.run(sqlMateria, [materia.nome_materia, materia.local, materia.user_id], function (err) {
        if (err) return reject(err);

        const novaMateriaId = this.lastID;

        // 2. Inserir os Horários (se houver)
        if (materia.horarios && materia.horarios.length > 0) {
          const sqlHorario = 'INSERT INTO horarios_aula (dia_semana, hora_inicio, hora_fim, materia_id) VALUES (?, ?, ?, ?)';
          
          // Prepara um statement para executar várias vezes (otimização)
          const stmt = db.prepare(sqlHorario);
          
          materia.horarios.forEach(h => {
            stmt.run([h.dia_semana, h.hora_inicio, h.hora_fim, novaMateriaId]);
          });
          
          stmt.finalize((err) => {
            if (err) return reject(err); // Nota: Erro aqui não desfaz a matéria no SQLite básico, mas avisa
            resolve(novaMateriaId);
          });
        } else {
          resolve(novaMateriaId);
        }
      });
    });
  },

  // Listar matérias de um usuário
  listarPorUsuario: (userId: number): Promise<Materia[]> => {
    return new Promise((resolve, reject) => {
      // Trazemos as matérias. (Para trazer horários junto precisaria de um JOIN ou segunda query)
      const sql = 'SELECT * FROM materias WHERE user_id = ?';
      db.all(sql, [userId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows as Materia[]);
      });
    });
  },
  excluir: (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM materias WHERE materia_id = ?';
      
      db.run(sql, [id], function (err) {
        if (err) return reject(err);
        resolve();
      });
    });
  }
};