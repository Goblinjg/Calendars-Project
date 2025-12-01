
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Erro ao conectar no SQLite:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
    db.run("PRAGMA foreign_keys = ON"); // permite chaves estrangeiras
  }
});

db.serialize(() => {
  // 1. Tabela Usuarios
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL
    )
  `);

  // 2. Tabela Materias (Relação 1 Usuario -> N Materias)
  db.run(`
    CREATE TABLE IF NOT EXISTS materias (
      materia_id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome_materia TEXT NOT NULL,
      local TEXT,
      user_id INTEGER,
      FOREIGN KEY(user_id) REFERENCES usuarios(user_id) ON DELETE CASCADE
    )
  `);

  // 3. Tabela Anotacoes (Relação 1 Usuario -> N Anotacoes)
  db.run(`
    CREATE TABLE IF NOT EXISTS anotacoes (
      anotacao_id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      conteudo TEXT,
      data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
      user_id INTEGER,
      FOREIGN KEY(user_id) REFERENCES usuarios(user_id) ON DELETE CASCADE
    )
  `);
});

export default db;