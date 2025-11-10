<h1 align="center" style="font-weight: bold;">
  Sistema de Gerenciamento de Vida Acadêmica
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React">
  <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/express.js-%23404D59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express.js">
  <img src="https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite">
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
</p>

Esta é a solução para a digitalização da vida acadêmica do estudante, um sistema fullstack projetado para otimizar a organização e produtividade. O objetivo é fornecer uma plataforma centralizada onde os estudantes podem gerenciar todos os aspectos de sua rotina: aulas, tarefas, anotações e lembretes. A solução é composta por uma API REST em Node.js e um frontend dinâmico em React.js.

## 👥 Colaboradores

- Daniel Silva Ferraz Neto
- João Gabriel Salomão Baldim
- José Victor Miranda de Oliveira

## ✨ Funcionalidades Planejadas

### Backend (API REST - Node.js)

- **Gestão de Aulas e Calendário**
  - Cadastro de matérias e horários de aula.
  - Estrutura para busca e filtragem por dia/semana.
- **Gestão de Tarefas**
  - Cadastro de tarefas com data de entrega, matéria associada e status (a fazer, em progresso, concluída).
- **Gestão de Anotações e Lembretes**
  - Cadastro de notas rápidas ou detalhadas.
  - Funcionalidade de lembretes.
- **Banco de Dados**
  - Utilização do **SQLite** para armazenamento local e simplificado dos dados.

### Frontend (React)

- **Homepage:** Dashboard com visualização de tarefas próximas e aulas do dia.
- **Página de Calendário:** Visualização do Calendário.
- **Página de Tarefas:** Listagem, criação, edição e marcação de conclusão de tarefas.
- **Página de Anotações:** Interface para criação e organização de anotações.
- **Design Responsivo:** Interface acessível em dispositivos móveis e desktop.

## 🛠️ Tecnologias Utilizadas

- **Backend:**
  - **Node.js**
  - **Express.js**
  - **TypeScript**
  - **SQLite** (Banco de Dados)
- **Frontend:**
  - **React.js** (com **Vite**)
  - **TypeScript**
  - **ReUI** (Biblioteca de componentes baseada em **shadcn/ui**)
  - **Tailwind CSS** (Para estilização)
  - **Radix UI** & **Base UI** (Dependências de componentes)
  - **Axios** (Para chamadas à API)
  - **React Router Dom** (Para rotas)
  - **next-themes** (Para Modo Escuro)
- **Desenvolvimento:**
  - **VSCode** (Editor de Código)
  - **Git/GitHub** (Controle de Versão)

## 📁 Estrutura do Projeto

Estrutura monorepo:

```
/
├── backend/ # Aplicação da API em Node.js/Express
│ ├── src/
│ │ ├── controllers/ # Lógica de requisição
│ │ ├── services/ # Lógica de negócio
│ │ └── database/ # Configuração do SQLite
│ └── index.ts # Ponto de entrada da API
│
├── frontend/ # Aplicação da interface em React (Vite + TS)
│ ├── src/
│ │ ├── components/
│ │ │ └── ui/ # Componentes ReUI/Shadcn (ex: button.tsx)
│ │ ├── lib/
│ │ │ └── utils.ts # Função 'cn' do Shadcn
│ │ ├── pages/ # Componentes de página
│ │ ├── App.tsx # Componente principal
│ │ └── main.tsx # Ponto de entrada (Renderiza o ThemeProvider)
│ ├── tailwind.config.js # Configuração do Tailwind
│ └── components.json # Configuração do Shadcn/ReUI
│
└── README.md # Documentação do projeto
```

## 🚀 Como Rodar o Projeto

(_Instruções detalhadas serão adicionadas nas próximas fases de desenvolvimento, após a configuração inicial de cada parte (backend e frontend)._)

### 1. Pré-requisitos

- Node.js (v20 ou superior)
- npm ou yarn

### 2. Passos Iniciais

1.  Clone o repositório: `git clone https://github.com/Goblinjg/joao_salomao.git`
2.  Navegue até a pasta do projeto: `cd Calendars-Project`
3.  Crie e configure o ambiente do backend e do frontend:

```bash
# Configure o backend em um terminal
cd backend
npm install
# npm run dev (ou outro comando de inicialização)

# Configure o frontend em outro terminal
cd ../frontend
npm install
# npm run dev (ou outro comando de inicialização)
```
