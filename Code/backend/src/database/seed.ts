import db from "./db";

const seed = () => {
  console.log("🌱 Semeando banco de dados...");

  const dias = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];
  const hoje = dias[new Date().getDay()];

  const USER_ID = 4;

  db.serialize(() => {
    db.run(
      "DELETE FROM horarios_aula WHERE materia_id IN (SELECT materia_id FROM materias WHERE user_id = ?)",
      [USER_ID]
    );
    db.run("DELETE FROM tarefas WHERE user_id = ?", [USER_ID]);
    db.run("DELETE FROM materias WHERE user_id = ?", [USER_ID]);

    db.run(
      `INSERT INTO materias (materia_id, nome_materia, local, user_id) VALUES (100, 'Engenharia de Software', 'Pavilhão 3 - Sala 10', ?)`,
      [USER_ID]
    );
    db.run(
      `INSERT INTO materias (materia_id, nome_materia, local, user_id) VALUES (101, 'Cálculo Numérico', 'B05', ?)`,
      [USER_ID]
    );
    db.run(
      `INSERT INTO materias (materia_id, nome_materia, local, user_id) VALUES (102, 'Inteligência Artificial', 'Lab Vermelho', ?)`,
      [USER_ID]
    );

    db.run(
      `INSERT INTO horarios_aula (materia_id, dia_semana, hora_inicio, hora_fim) VALUES (100, ?, '08:00', '10:00')`,
      [hoje]
    );
    db.run(
      `INSERT INTO horarios_aula (materia_id, dia_semana, hora_inicio, hora_fim) VALUES (101, ?, '10:00', '12:00')`,
      [hoje]
    );

    const amanha = dias[(new Date().getDay() + 1) % 7];
    db.run(
      `INSERT INTO horarios_aula (materia_id, dia_semana, hora_inicio, hora_fim) VALUES (102, ?, '14:00', '16:00')`,
      [amanha]
    );

    const dataAmanha = new Date();
    dataAmanha.setDate(dataAmanha.getDate() + 1);
    const strAmanha = dataAmanha.toISOString();

    const dataSemanaVem = new Date();
    dataSemanaVem.setDate(dataSemanaVem.getDate() + 7);
    const strSemanaVem = dataSemanaVem.toISOString();

    db.run(
      `INSERT INTO tarefas (descricao, data_entrega, status, user_id, materia_id) VALUES ('Entrega do Diagrama de Classes', ?, 'A Fazer', ?, 100)`,
      [strAmanha, USER_ID]
    );
    db.run(
      `INSERT INTO tarefas (descricao, data_entrega, status, user_id, materia_id) VALUES ('Lista de Exercícios 02', ?, 'Em Progresso', ?, 101)`,
      [strSemanaVem, USER_ID]
    );
    db.run(
      `INSERT INTO tarefas (descricao, data_entrega, status, user_id, materia_id) VALUES ('Comprar canetas novas', ?, 'A Fazer', ?, null)`,
      [strAmanha, USER_ID]
    );

    console.log("✅ Banco de dados populado com sucesso!");
    console.log(`📅 Aulas criadas para: ${hoje}`);
  });
};

seed();
