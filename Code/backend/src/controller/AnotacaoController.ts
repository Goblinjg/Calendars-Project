import { Request, Response } from "express";
import db from "../database/db";

export const AnotacaoController = {
  // RF003: Criar Anotação
  criar: (req: Request, res: Response) => {
    console.log("Chegou uma requisição!"); // teste verificação
    console.log("Dados recebidos:", req.body);
    const { titulo, conteudo, user_id } = req.body;

    if (!titulo) {
      return res.status(400).json({ error: "O título é obrigatório." });
    }

    const sql =
      "INSERT INTO anotacoes (titulo, conteudo, user_id) VALUES (?, ?, ?)";

    db.run(sql, [titulo, conteudo, user_id], function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.status(201).json({
        id: this.lastID,
        mensagem: "Anotação salva com sucesso!", // Conforme RF003
      });
    });
  },

  // RF004: Listar Anotações
  listar: (req: Request, res: Response) => {
    const sql = "SELECT * FROM anotacoes ORDER BY data_criacao DESC";

    db.all(sql, [], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  },

  // RF005: Atualizar Anotação
  atualizar: (req: Request, res: Response) => {
    const { id } = req.params;
    const { titulo, conteudo } = req.body;

    const sql =
      "UPDATE anotacoes SET titulo = ?, conteudo = ? WHERE anotacao_id = ?";

    db.run(sql, [titulo, conteudo, id], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0)
        return res.status(404).json({ error: "Anotação não encontrada." });

      res.json({ mensagem: "Anotação atualizada com sucesso!" });
    });
  },
  // RF006: Excluir Anotação
  excluir: (req: Request, res: Response) => {
    const { id } = req.params;
    const sql = "DELETE FROM anotacoes WHERE anotacao_id = ?";

    db.run(sql, [id], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0)
        return res.status(404).json({ error: "Anotação não encontrada." });

      res.json({ mensagem: "Anotação excluída com sucesso!" });
    });
  },
};
