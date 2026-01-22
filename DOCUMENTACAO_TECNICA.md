# Documentação Técnica - Agenda Terapia com Café

**Data de Atualização:** 20 de Janeiro de 2026
**Status do Projeto:** Em Desenvolvimento (Funcional)

## 1. Visão Geral
Este documento registra as alterações recentes, desafios técnicos enfrentados e o estado atual da arquitetura da aplicação "Agenda Terapia com Café". O foco principal das últimas iterações foi a personalização de alto nível da interface (UI), especificamente o cabeçalho.

## 2. Personalizações Recentes (Header)

### Objetivo
Substituir o ícone padrão de calendário por uma **xícara de café realista** que transmitisse a identidade da marca, incluindo **uma animação de fumaça** para dar vida à interface.

### Implementação
A solução adotada foi uma abordagem **híbrida** para garantir realismo e performance:
*   **Imagem Base**: Um arquivo PNG realista transparente (`coffee-cup-v4.png`) com o texto "TERAPIA COM CAFÉ" inscrito.
*   **Animação**: Camadas de vetor (SVG) sobrepostas à imagem, animadas via CSS (`@keyframes steam`) para simular vapor subindo suavemente.

### Arquivos Modificados
*   `src/components/layout/Header.tsx`: Estrutura do componente contendo a imagem e os elementos SVG da fumaça.
*   `src/index.css`: Definição das variáveis globais, estilos de "glassmorphism" e os keyframes da animação `steam`.
*   `public/coffee-cup-v4.png`: O asset gráfico da xícara.

## 3. Histórico de Problemas e Soluções (Troubleshooting)

Durante o processo, encontramos e resolvemos os seguintes obstáculos críticos:

### A. Cache Persistente de Imagem
*   **Problema**: O navegador insistia em carregar uma versão antiga da imagem, mesmo após sobrescrever o arquivo.
*   **Solução**: Adotamos o versionamento no nome do arquivo (`coffee-cup-v4.png`), forçando o navegador a baixar a nova versão.

### B. Conflito Tailwind CSS v4 vs v3
*   **Problema**: Uma tentativa de atualização para o Tailwind v4 gerou erros de configuração com o PostCSS (`[plugin:vite:css] [postcss]...`), quebrando a build.
*   **Solução**: Revertemos para a **versão estável (v3)**.
    *   Restauramos `postcss.config.js` e `tailwind.config.js` para o padrão v3.
    *   Removemos imports experimentais (`@theme`) do CSS.

### C. Perda de Estilos Globais ("App Desfigurada")
*   **Problema**: Durante o rollback de versões, o arquivo `index.css` foi acidentalmente limpo, removendo o tema escuro e os gradientes.
*   **Solução**: O arquivo foi completamente reescrito com as variáveis de cores (`--color-dark`, `--color-primary`), fontes e utilitários de vidro (`.glass-panel`) originais.

## 4. Estado Atual da Arquitetura

*   **Runtime**: Vite + React + TypeScript.
*   **Estilização**: Tailwind CSS v3 (configurado via `postcss`).
*   **Servidor Local**: Roda na porta padrão `5173` (ou incrementais se ocupada).

## 5. Como Verificar o Funcionamento

1.  Certifique-se de que as dependências estão instaladas:
    ```bash
    npm install
    ```
2.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
3.  Acesse no navegador: **http://localhost:5173/**

### Checklist de Validação Visual
- [x] O fundo da página é escuro com gradientes sutis (roxo/azul).
- [x] O cabeçalho é um painel de vidro translúcido.
- [x] O ícone da esquerda é uma xícara realista com texto "TERAPIA COM CAFÉ".
- [x] Existe uma fumaça suave se movendo acima da xícara.
- [x] O título "Agenda Terapia com Café" está visível.

---
*Documento gerado para referência futura e manutenção.*
