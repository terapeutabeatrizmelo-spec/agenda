# Agenda Terapia com Café - Documentação Completa do Projeto

## 📋 Visão Geral

**Nome do Projeto:** Agenda Terapia com Café  
**Tipo:** Aplicação Web de Agendamento de Consultas  
**URL de Produção:** https://agenda-beatriz-terapia.netlify.app  
**Repositório GitHub:** https://github.com/terapeutabeatrizmelo-spec/agenda  
**Diretório Local:** `c:\Users\marco\.gemini\antigravity\scratch\agenda-premium`

### Descrição
Sistema de agendamento profissional para terapeutas, com interface moderna inspirada no Google Calendar, totalmente responsivo para desktop e mobile.

---

## 🛠️ Stack Tecnológica

### Frontend
- **React 18.3.1** - Biblioteca principal
- **TypeScript 5.6.2** - Tipagem estática
- **Vite 7.3.1** - Build tool e dev server
- **Tailwind CSS 3.4.17** - Framework de estilização

### Bibliotecas Principais
- **date-fns 4.1.0** - Manipulação de datas
- **lucide-react 0.469.0** - Ícones
- **Vitest 3.0.5** - Framework de testes
- **@testing-library/react 16.1.0** - Testes de componentes

### Deploy e Hospedagem
- **Netlify** - Hospedagem e CI/CD
- **GitHub** - Controle de versão

---

## 📁 Estrutura do Projeto

```
agenda-premium/
├── public/
│   └── coffee-cup-v5.png          # Logo da aplicação
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx         # Cabeçalho com navegação e YearPicker
│   │   │   ├── Header.test.tsx    # Testes do Header
│   │   │   └── Sidebar.tsx        # Menu lateral de navegação
│   │   ├── ui/
│   │   │   ├── FloatingActionButton.tsx  # FAB para adicionar eventos
│   │   │   ├── Toast.tsx          # Sistema de notificações
│   │   │   └── YearPicker.tsx     # Seletor de ano (1900-2100)
│   │   ├── AppointmentForm.tsx    # Formulário de compromissos
│   │   └── ErrorBoundary.tsx      # Tratamento de erros
│   ├── context/
│   │   ├── AppointmentContext.tsx # Gerenciamento de compromissos
│   │   └── ToastContext.tsx       # Gerenciamento de toasts
│   ├── utils/
│   │   ├── dateUtils.ts           # Utilitários de data
│   │   ├── dateUtils.test.ts      # Testes de dateUtils
│   │   ├── holidays.ts            # Feriados nacionais brasileiros
│   │   ├── storage.ts             # LocalStorage wrapper
│   │   └── storage.test.ts        # Testes de storage
│   ├── views/
│   │   ├── AgendaView.tsx         # Visualização cronológica
│   │   ├── DayView.tsx            # Visualização diária
│   │   ├── MonthView.tsx          # Visualização mensal
│   │   └── WeekView.tsx           # Visualização semanal
│   ├── types.ts                   # Definições TypeScript
│   ├── App.tsx                    # Componente principal
│   ├── main.tsx                   # Entry point
│   ├── index.css                  # Estilos globais
│   └── setupTests.ts              # Configuração de testes
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## 🎨 Funcionalidades Principais

### 1. Visualizações de Calendário
- **Dia** - Visualização detalhada por hora
- **Semana** - Grid semanal com horários
- **Mês** - Calendário mensal completo
- **Agenda** - Lista cronológica de todos os eventos

### 2. Gerenciamento de Compromissos
- Criar, editar e excluir compromissos
- Campos: título, paciente, data/hora início/fim, notas
- Validação de conflitos de horário
- Persistência em LocalStorage

### 3. Navegação
- **Botões de navegação** - Anterior, Hoje, Próximo
- **Swipe horizontal** - Mudar mês deslizando (mobile)
- **YearPicker** - Seletor de ano clicável (1900-2100)
- **Sidebar** - Menu lateral para trocar visualizações

### 4. Feriados Nacionais
- Destaque automático de feriados brasileiros
- Fundo vermelho nas células de feriados
- Nome do feriado exibido na célula
- Feriados fixos e móveis (Carnaval, Páscoa, Corpus Christi)

### 5. Interface Responsiva
- Design mobile-first
- Adaptação automática para desktop/tablet/mobile
- Título "Terapia com Café" visível em mobile
- FAB (Floating Action Button) sempre acessível

### 6. Sistema de Notificações
- Toasts para feedback de ações
- Tipos: success, error, info
- Auto-dismiss após 3 segundos

---

## 🔧 Configuração e Instalação

### Pré-requisitos
- Node.js 18+ (mesma versão da Netlify)
- npm ou yarn
- Git

### Instalação Local

```bash
# Clone o repositório
git clone https://github.com/terapeutabeatrizmelo-spec/agenda.git
cd agenda

# Instale as dependências
npm install

# Execute em desenvolvimento
npm run dev

# Build para produção
npm run build

# Execute testes
npm test
```

### Variáveis de Ambiente
Não há variáveis de ambiente necessárias para a aplicação. Todos os dados são armazenados localmente no navegador via LocalStorage.

---

## 🚀 Deploy

### Processo de Deploy
1. **Build local** - `npm run build`
2. **Commit e push** - Git push para branch `main`
3. **Deploy Netlify** - `netlify deploy --prod --dir=dist`

### Configuração Netlify
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 18.x
- **Auto-deploy:** Habilitado para branch `main`

---

## 📊 Dados e Armazenamento

### LocalStorage
Todos os compromissos são armazenados no navegador do usuário:

```typescript
interface Appointment {
  id: string;
  title: string;
  patient: string;
  start: string;  // ISO 8601 format
  end: string;    // ISO 8601 format
  notes?: string;
}
```

**Key:** `therapy-appointments`  
**Formato:** JSON array de objetos Appointment

---

## 🎯 Regras de Negócio

### Validações
1. **Horário de início** deve ser anterior ao horário de fim
2. **Conflitos de horário** são detectados e alertados
3. **Campos obrigatórios:** título, paciente, data/hora início e fim

### Feriados Brasileiros

#### Feriados Fixos
- 01/01 - Ano Novo
- 21/04 - Tiradentes
- 01/05 - Dia do Trabalho
- 07/09 - Independência
- 12/10 - N. Sra. Aparecida
- 02/11 - Finados
- 15/11 - Proclamação da República
- 20/11 - Consciência Negra
- 25/12 - Natal

#### Feriados Móveis (calculados via algoritmo de Páscoa)
- Carnaval (47 dias antes da Páscoa)
- Sexta-feira Santa (2 dias antes da Páscoa)
- Páscoa
- Corpus Christi (60 dias após a Páscoa)

---

## 🧪 Testes

### Cobertura de Testes
- `Header.test.tsx` - Testes do componente Header
- `storage.test.ts` - Testes de persistência
- `dateUtils.test.ts` - Testes de utilitários de data

### Executar Testes
```bash
npm test              # Modo watch
npm run test:ui       # Interface visual
npm run test:coverage # Relatório de cobertura
```

---

## 🎨 Design System

### Cores Principais
- **Violeta:** `#8B5CF6` - Cor primária
- **Ciano:** `#06B6D4` - Cor secundária
- **Vermelho:** `#EF4444` - Feriados e alertas
- **Fundo:** Gradiente escuro com glassmorphism

### Tipografia
- **Font Family:** System fonts (sans-serif)
- **Tamanhos:** Responsivos com classes Tailwind

### Componentes UI
- **Glass Panel:** Efeito de vidro fosco com backdrop-blur
- **Botões:** Hover states com transições suaves
- **Cards:** Bordas arredondadas com sombras sutis

---

## 📱 Responsividade

### Breakpoints (Tailwind)
- **sm:** 640px
- **md:** 768px
- **lg:** 1024px
- **xl:** 1280px

### Adaptações Mobile
- Título abreviado no header
- FAB sempre visível (z-index 50)
- Swipe navigation para mudar meses
- Sidebar deslizante
- Grid de calendário adaptativo

---

## 🔄 Fluxo de Trabalho

### Desenvolvimento
1. Criar branch de feature
2. Desenvolver e testar localmente
3. Executar `npm run build` para validar
4. Commit e push
5. Merge para `main`
6. Deploy automático via Netlify

### Regras de Deploy (Políticas do Usuário)
- ✅ Build local obrigatório antes de deploy
- ✅ Máximo 3 deploys de produção por dia
- ✅ Deploy só a partir da branch `main`
- ✅ Validação local completa antes de deploy
- ✅ Netlify CLI para simular ambiente de produção

---

## 📚 Dependências Principais

```json
{
  "dependencies": {
    "date-fns": "^4.1.0",
    "lucide-react": "^0.469.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@testing-library/react": "^16.1.0",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "typescript": "~5.6.2",
    "vite": "^7.3.1",
    "vitest": "^3.0.5"
  }
}
```

---

## 🐛 Troubleshooting

### Problemas Comuns

**1. Build falha com erro TypeScript**
- Verificar versão do Node (deve ser 18+)
- Executar `npm install` novamente
- Limpar cache: `rm -rf node_modules dist && npm install`

**2. Dados não persistem**
- Verificar se LocalStorage está habilitado no navegador
- Verificar console para erros de storage

**3. Feriados não aparecem**
- Verificar se o ano está entre 1900-2100
- Verificar cálculo de Páscoa no `holidays.ts`

---

## 📈 Melhorias Futuras

### Planejadas
- [ ] Integração com Google Calendar
- [ ] Notificações push
- [ ] Exportar agenda para PDF
- [ ] Modo escuro/claro
- [ ] Múltiplos terapeutas
- [ ] Sincronização em nuvem
- [ ] Relatórios e estatísticas

---

## 👥 Contribuição

### Como Contribuir
1. Fork o repositório
2. Crie uma branch de feature
3. Faça suas alterações
4. Execute os testes
5. Envie um Pull Request

### Padrões de Código
- TypeScript strict mode
- ESLint para linting
- Prettier para formatação
- Testes para novas funcionalidades

---

## 📄 Licença

Projeto privado - Todos os direitos reservados.

---

## 📞 Contato

**Terapeuta:** Beatriz Melo  
**Website Principal:** https://terapiacomcafe.com.br  
**Agenda:** https://agenda-beatriz-terapia.netlify.app

---

**Última Atualização:** 22/01/2026  
**Versão:** 2.0.0
