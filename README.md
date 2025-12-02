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

## 1. CONTEXTO DO PROBLEMA E SOLUÇÃO

Esta é a solução para a digitalização da vida acadêmica do estudante, um sistema fullstack projetado para otimizar a organização e produtividade. O objetivo é fornecer uma plataforma centralizada onde os estudantes podem gerenciar todos os aspectos de sua rotina: aulas, tarefas, anotações e lembretes. A solução é composta por uma API REST em Node.js e um frontend dinâmico em React.js.

### ✨ Funcionalidades Planejadas

#### Backend (API REST - Node.js)

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

#### Frontend (React)

- **Homepage:** Dashboard com visualização de tarefas próximas e aulas do dia.
- **Página de Calendário:** Visualização do Calendário.
- **Página de Tarefas:** Listagem, criação, edição e marcação de conclusão de tarefas.
- **Página de Anotações:** Interface para criação e organização de anotações.
- **Design Responsivo:** Interface acessível em dispositivos móveis e desktop.

<h3 id="colab">👥 Colaboradores</h3>

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Clofender">
        <img src="https://avatars.githubusercontent.com/u/73314533?v=4" width="100px;" alt="Foto de Daniel Silva Ferraz Neto"/>
        <br />
        <sub><b>Daniel Silva Ferraz Neto</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Goblinjg">
        <img src="https://avatars.githubusercontent.com/u/169711342?v=4" width="100px;" alt="Foto de João Gabriel Salomão Baldim"/>
        <br />
        <sub><b>João Gabriel Salomão Baldim</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/zector1">
        <img src="https://avatars.githubusercontent.com/u/137319815?v=4" width="100px;" alt="Foto de José Victor Miranda de Oliveira"/>
        <br />
        <sub><b>José Victor Miranda de Oliveira</b></sub>
      </a>
    </td>
  </tr>
</table>


## 2. INSTRUÇÕES PARA USO

### 🚀 Como Rodar o Projeto:

(_Instruções detalhadas serão adicionadas nas próximas fases de desenvolvimento, após a configuração inicial de cada parte (backend e frontend)._)

## 3. INSTRUÇÕES PARA DEVS

### 3.1. Pré-requisitos

- Node.js (v20 ou superior)
- npm ou yarn

### 3.2. Passos Iniciais

1.  Clone o repositório: `git clone https://github.com/Goblinjg/Calendars-Project.git`
2.  Navegue até a pasta do projeto: `cd Calendars-Project`
3.  Crie e configure o ambiente do backend e do frontend:

```bash
# 1. Configure o backend (começando da raiz do projeto)
cd Code/backend
npm install
# npm run dev

# 1.1. Popule o banco de dados (Seed) caso queira
npx ts-node src/database/seed.ts

# 2. Configure o frontend (em outro terminal, começando da raiz do projeto)
cd Code/frontend
npm install
# npm run dev
```


## 4. 🛠️ TECNOLOGIAS UTILIZADAS

- **Backend:**
  - **Node.js (v20+)**
    - **Express.js (v5.1.0):** Framework da API.
    - **SQLite (v5.1.7):** Banco de dados.
- **Frontend:**
  - **React.js (v19.1.1)**
    - **Vite (v7.1.7):** Servidor de desenvolvimento.
  - **Tailwind CSS (v4.1.17):** Estilização.
    - **ReUI (v1.0.27):** Biblioteca de UI (baseada no Shadcn).
    - **Dependências do ReUI:** `Radix UI (v1.4.3)`, `Base UI (v1.0.0-beta.4)`.
    - **next-themes (v0.4.6):** Gerenciador de tema (Modo Escuro).
  - **Axios (v1.13.2):** Cliente HTTP.
  - **React Router Dom (v7.9.5):** Gerenciamento de rotas.
- **Ambiente Comum:**
  - **TypeScript (v5.9.3):** Usado no front e no back.
  - **VSCode & Git/GitHub:** Ambiente de desenvolvimento.


## 5. 📁 ESTRUTURA DO PROJETO

Estrutura monorepo:

```
/
├── Code/ # Contém as aplicações do projeto
│   ├── backend/ # Aplicação da API em Node.js/Express
│   │   ├── src/
│   │   │   ├── controllers/ # Lógica de requisição
│   │   │   ├── services/ # Lógica de negócio
│   │   │   └── database/ # Configuração do SQLite
│   │   └── index.ts # Ponto de entrada da API
│   │
│   └── frontend/ # Aplicação da interface em React (Vite + TS)
│       ├── src/
│       │   ├── components/
│       │   │   └── ui/ # Componentes ReUI/Shadcn (ex: button.tsx)
│       │   ├── lib/
│       │   │   └── utils.ts # Função 'cn' do Shadcn
│       │   ├── pages/ # Componentes de página
│       │   ├── App.tsx # Componente principal
│       │   └── main.tsx # Ponto de entrada (Renderiza o ThemeProvider)
│       ├── tailwind.config.js # Configuração do Tailwind
│       └── components.json # Configuração do Shadcn/ReUI
│
├── Documentacao/ # Documentação técnica e de requisitos do projeto
│   ├── Requisitos/
│       └── Documento de Requisitos-2.pdf
│   ├── Diagramas/
│       ├── Sequencia/
│       ├── Diagrama de Classes . pdf
│       └── Diagrama de Pacotes . png
│
├── LICENSE # Licença do projeto
├── .gitignore # Arquivos e pastas ignorados pelo Git
└── README.md # Documentação do projeto
```
## 6. PADRÕES DE VERSIONAMENTO E ORGANIZAÇÃO

Para garantir a organização e o rastreamento eficiente do histórico do projeto, adotamos os seguintes padrões para o uso do Git e estrutura de arquivos.

### 6.1. Padrões de Commit (Conventional Commits)
Utilizamos o padrão de *Conventional Commits* para manter o histórico limpo e legível.

* **`feat:`** Adição de uma nova funcionalidade (ex: `feat: adiciona página de login`).
* **`fix:`** Correção de um bug (ex: `fix: corrige erro na validação de senha`).
* **`docs:`** Alterações apenas em documentação (ex: `docs: atualiza README com instruções de instalação`).
* **`style:`** Alterações que não afetam o significado do código (espaços, formatação, etc).
* **`refactor:`** Alteração de código que não corrige um bug nem adiciona uma funcionalidade (melhoria de estrutura).
* **`chore:`** Atualização de tarefas de build, configurações de ferramentas, etc (ex: `chore: configura eslint`).

### 6.2. Uso de Branches
* **`main`**: Branch principal contendo o código estável e testado.
* **`feat/nome-da-feature`**: Branches temporárias para desenvolvimento de novas funcionalidades.
* **`fix/nome-do-bug`**: Branches para correção de erros específicos.

### 6.3. Organização de Pastas
A separação de responsabilidades no repositório é estrita:
* **`Code/`**: Destinada exclusivamente para código-fonte (Backend e Frontend).
* **`Documentacao/`**: Destinada a artefatos de engenharia de software (Requisitos, Diagramas UML, Manuais).

### 6.4. Arquivo .gitignore
O arquivo `.gitignore` foi configurado na raiz do projeto para evitar que arquivos desnecessários ou sensíveis sejam enviados ao repositório, mantendo o projeto leve e seguro.

**Configurações principais aplicadas:**
* Ignora **dependências** (`node_modules`) em todas as subpastas.
* Ignora **pastas de build** (`dist`, `.vite`).
* Ignora **arquivos de ambiente** contendo segredos (`.env`).
* Ignora **arquivos de sistema e IDE** (`.DS_Store`, `.vscode`).

## 7. BOAS PRÁTICAS DE CODIFICAÇÃO UTILIZADAS

### 7.1. Padrões de projeto

Adotamos o padrão S.O.L.I.D para garantir um código limpo, modular e de fácil manutenção:

- #### [S]ingle Responsibility Principle (Princípio da Responsabilidade Única)
- #### [O]pen/Closed Principle (Princípio do Aberto/Fechado)
- #### [L]iskov Substitution Principle (Princípio da Substituição de Liskov)
- #### [I]nterface Segregation Principle (Princípio da Segregação de Interfaces)
- #### [D]ependency Inversion Principle (Princípio da Inversão de Dependências)

### 7.2. Padrões de nomenclatura

- **Camel Case:** Utilizado para nomes de variáveis e funções (ex: `minhaVariavel`, `calcularSoma()`).
- **Pascal Case:** Utilizado para nomes de classes e componentes React (ex: `MinhaClasse`, `MeuComponente`).
- **Kebab Case:** Utilizado para nomes de arquivos e pastas (ex: `minha-pasta`, `meu-arquivo.ts`).

### 7.3. Comentários e Documentação

- Comentários claros e concisos para explicar trechos complexos de código.

- Comente por quê algo é feito, não apenas o que está sendo feito (o código já mostra o que).

- Comentarios serão feitos apenas quando realmente agregarem valor ao entendimento do código.

### 7.4. Formatação e estilo consistentes

- Identação padronizada

- Quebrar linhas muito longas para melhorar a legibilidade

- Deixar espaços em branco onde necessário para separar blocos lógicos de código

### 7.5. Funções e Métodos simples

- Funções devem ter uma única responsabilidade

- Evitar funções muito longas ou complexas

- Prefirir clareza em vez de engenhosidade.

### 7.6. Tratamento de erros

- Serão utilizados execeções, mensagens de erro claras e logging adequado para facilitar a depuração e manutenção do código.

### 7.7. Testes

- Codigo sera feito de maneira simples e modular pra permitir a escrita de testes unitários e de integração no futuro.
