// Arquivo: extrair_contexto.js (versão corrigida)

import fs from "fs/promises";
import path from "path";

// --- CONFIGURAÇÕES ---
const arquivoSaida = "contexto_final.txt";

const itensIgnorados = [
    "node_modules", ".git", ".vscode", "dist", "build", ".next", "coverage",
    "pnpm-lock.yaml", "package-lock.json", arquivoSaida, ".DS_Store"
];

const extensoesIgnoradas = [
    ".png", ".jpg", ".jpeg", ".gif", ".ico", ".svg", ".webp",
    ".woff", ".woff2", ".ttf", ".eot", ".otf",
    ".pdf", ".zip", ".rar", ".gz", ".exe", ".dll"
];
// --- FIM DAS CONFIGURAÇÕES ---

const arquivosComErro = [];

async function main() {
    console.log("--- INICIANDO SCRIPT DE DEPURAÇÃO ---");
    console.log("O nome de cada arquivo processado será exibido abaixo.");
    console.log("Se houver um erro, a mensagem será exibida.\n");

    try {
        const caminhoRaiz = process.cwd();
        const bufferSaida = [];

        await processarDiretorio(caminhoRaiz, caminhoRaiz, bufferSaida);

        await fs.writeFile(path.join(caminhoRaiz, arquivoSaida), bufferSaida.join(""));

        console.log("\n\n--- FINALIZADO ---");
        console.log(`✅ Sucesso! O contexto foi salvo em: ${arquivoSaida}`);

        if (arquivosComErro.length > 0) {
            console.warn("\n⚠️ Arquivos que falharam na leitura:");
            arquivosComErro.forEach(a => console.log("  - " + a));
        }

    } catch (erro) {
        console.error("\n❌ Erro fatal:", erro);
    }
}

async function processarDiretorio(diretorioAtual, caminhoRaiz, bufferSaida) {
    let entradas;

    try {
        entradas = await fs.readdir(diretorioAtual, { withFileTypes: true });
    } catch (err) {
        const caminhoRelativo = path.relative(caminhoRaiz, diretorioAtual).replace(/\\/g, "/");
        console.error(`\n[ERRO DE PERMISSÃO] Não foi possível ler: ${caminhoRelativo}`);
        console.error("Motivo:", err.message);
        return;
    }

    for (const entrada of entradas) {

        // *** IGNORA DIRETÓRIOS E ARQUIVOS IMEDIATAMENTE ***
        if (itensIgnorados.includes(entrada.name)) {
            continue;
        }

        const caminhoCompleto = path.join(diretorioAtual, entrada.name);
        const caminhoRelativo = path.relative(caminhoRaiz, caminhoCompleto).replace(/\\/g, "/");

        if (entrada.isDirectory()) {
            await processarDiretorio(caminhoCompleto, caminhoRaiz, bufferSaida);
        } else if (entrada.isFile()) {

            const extensao = path.extname(entrada.name).toLowerCase();
            if (extensoesIgnoradas.includes(extensao)) {
                continue;
            }

            console.log(`Lendo: ${caminhoRelativo}...`);

            try {
                const conteudo = await fs.readFile(caminhoCompleto, "utf-8");

                bufferSaida.push(`${caminhoRelativo}\n\n`);
                bufferSaida.push(`${conteudo}\n\n`);
                bufferSaida.push("========================================\n\n");

            } catch (err) {
                console.error(`\n[ERRO DE LEITURA] ${caminhoRelativo}`);
                console.error("Motivo:", err.message);
                arquivosComErro.push(caminhoRelativo);
            }
        }
    }
}

main();
