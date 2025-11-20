import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Erro ao conectar no SQLite:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS anotacoes (
      anotacao_id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      conteudo TEXT,
      data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
      user_id INTEGER
    )
  `);
});

export default db;