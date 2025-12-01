import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { UsuarioModel } from '../models/UsuarioModel';

export const UsuarioController = {
  
  // RF002: Cadastrar Usuário
  cadastrarUsuario: async (req: Request, res: Response) => {
    const { nome, email, senha } = req.body;

    // Validação
    if (!nome || !email || !senha) {
      return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
    }

    try {
      // Verifica se já existe
      const existe = await UsuarioModel.buscarPorEmail(email);
      if (existe) {
        return res.status(409).json({ error: 'Este email já está cadastrado.' });
      }

      // Criptografa a senha (Hash) usando bcrypt
      const hashSenha = await bcrypt.hash(senha, 10);

      // Salva no banco
      const novoUsuario = await UsuarioModel.criar({ nome, email, senha: hashSenha });

      // Retorna sucesso (sem mandar a senha de volta)
      res.status(201).json({
        mensagem: 'Usuário cadastrado com sucesso!',
        usuario: {
          user_id: novoUsuario.user_id,
          nome: novoUsuario.nome,
          email: novoUsuario.email
        }
      });

    } catch (error: any) {
      res.status(500).json({ error: 'Erro interno ao cadastrar usuário.' });
    }
  },

  // RF001: Autenticar (Login)
  autenticar: async (req: Request, res: Response) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    try {
      const usuario = await UsuarioModel.buscarPorEmail(email);

      // Se usuário não existe
      if (!usuario) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }

      // Compara a senha enviada com a hash do banco
      const senhaValida = await bcrypt.compare(senha, usuario.senha || '');

      if (!senhaValida) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }

      // Login Sucesso
      res.json({
        mensagem: 'Autenticação realizada com sucesso!',
        user_id: usuario.user_id,
        nome: usuario.nome
      });

    } catch (error: any) {
      res.status(500).json({ error: 'Erro interno ao realizar login.' });
    }
  }
};