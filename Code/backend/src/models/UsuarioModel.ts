import db from '../database/db';

// Interface para tipagem
export interface Usuario {
  user_id?: number;
  nome: string;
  email: string;
  senha?: string;
}

export const UsuarioModel = {
  // Cria usuário no banco
  criar: (usuario: Usuario): Promise<Usuario> => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
      db.run(sql, [usuario.nome, usuario.email, usuario.senha], function (err) {
        if (err) reject(err);
        else resolve({ user_id: this.lastID, ...usuario });
      });
    });
  },

  // Busca para validar login
  buscarPorEmail: (email: string): Promise<Usuario | undefined> => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM usuarios WHERE email = ?';
      db.get(sql, [email], (err, row) => {
        if (err) reject(err);
        else resolve(row as Usuario);
      });
    });
  }
};