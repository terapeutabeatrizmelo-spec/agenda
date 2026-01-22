# Credenciais e Configurações - Agenda Terapia com Café

> ⚠️ **CONFIDENCIAL** - Este documento contém informações sensíveis. Não compartilhe publicamente.

---

## 🔐 Netlify

### Account Information
- **Account ID:** `6929f3cc0540b60f651259c8`
- **Site Name:** `agenda-beatriz-terapia`
- **Production URL:** https://agenda-beatriz-terapia.netlify.app

### Authentication Token
```
NETLIFY_AUTH_TOKEN=nfp_pCiVzGfq64YquAf9JLJU1S9yRsjN4XXifd97
```

### Deploy Configuration
- **Build Command:** `npm run build`
- **Publish Directory:** `dist`
- **Node Version:** 18.x
- **Auto Deploy:** Enabled (branch: `main`)

### CLI Usage
```bash
# Set environment variable
$env:NETLIFY_AUTH_TOKEN="nfp_pCiVzGfq64YquAf9JLJU1S9yRsjN4XXifd97"

# Deploy to production
npx netlify deploy --prod --dir=dist
```

---

## 🐙 GitHub

### Repository Information
- **Repository URL:** https://github.com/terapeutabeatrizmelo-spec/agenda
- **Owner:** terapeutabeatrizmelo-spec
- **Repository Name:** agenda
- **Default Branch:** main

### Remote Configuration
```bash
# Remote URL
git remote add origin https://github.com/terapeutabeatrizmelo-spec/agenda.git

# Push to main
git push origin main
```

---

## 💾 LocalStorage

### Storage Keys
- **Appointments Key:** `therapy-appointments`
- **Format:** JSON array of Appointment objects

### Data Structure
```typescript
interface Appointment {
  id: string;           // UUID v4
  title: string;        // Appointment title
  patient: string;      // Patient name
  start: string;        // ISO 8601 datetime
  end: string;          // ISO 8601 datetime
  notes?: string;       // Optional notes
}
```

### Example Data
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Consulta Inicial",
    "patient": "João Silva",
    "start": "2026-01-22T14:00:00",
    "end": "2026-01-22T15:00:00",
    "notes": "Primeira sessão"
  }
]
```

---

## 🌐 URLs do Projeto

### Production
- **Main Application:** https://agenda-beatriz-terapia.netlify.app
- **Main Website:** https://terapiacomcafe.com.br

### Development
- **Local Dev Server:** http://localhost:5173
- **Netlify Dev:** http://localhost:8888 (se configurado)

---

## 📂 Diretórios Importantes

### Local Development
```
Project Root: c:\Users\marco\.gemini\antigravity\scratch\agenda-premium
Artifacts: c:\Users\marco\.gemini\antigravity\brain\2c17d409-eb33-4eaf-91b0-6db4db21968f
```

### Build Output
```
Distribution: c:\Users\marco\.gemini\antigravity\scratch\agenda-premium\dist
```

---

## 🔧 Environment Variables

### Development (.env.local - se necessário)
```bash
# Não há variáveis de ambiente necessárias atualmente
# Todos os dados são armazenados localmente
```

### Production (Netlify)
```bash
# Não há variáveis de ambiente configuradas
# A aplicação funciona sem backend
```

---

## 🔑 API Keys e Tokens

### Netlify CLI
- **Token Type:** Personal Access Token
- **Scope:** Full access to sites and deploys
- **Created:** Durante a configuração inicial
- **Expires:** Não expira (verificar periodicamente)

### Rotation Policy
- Recomendado: Rotacionar token a cada 6 meses
- Em caso de comprometimento: Revogar imediatamente no painel Netlify

---

## 🛡️ Segurança

### Boas Práticas
1. ✅ Nunca commitar credenciais no Git
2. ✅ Usar variáveis de ambiente para tokens
3. ✅ Manter este documento fora do repositório público
4. ✅ Rotacionar tokens periodicamente
5. ✅ Usar HTTPS para todas as comunicações

### .gitignore
Certifique-se de que os seguintes arquivos/pastas estão no `.gitignore`:
```
.env
.env.local
.env.production
credentials.md
node_modules/
dist/
```

---

## 📊 Deploy History

### Recent Deploys
- **2026-01-22 10:47** - YearPicker, month names fix, header spacing
  - Deploy ID: `69722a6bc3dd877d3e7e70ac`
  - Commit: `33a850e`

- **2026-01-22 10:36** - Layout fixes and swipe navigation
  - Deploy ID: `697226dbf0eeeb721199c3cf`
  - Commit: `74758c8`

- **2026-01-22 10:16** - Agenda view, mobile fixes, Brazilian holidays
  - Deploy ID: `69722315aa50aa65570c63df`
  - Commit: `f009d50`

---

## 🔄 Backup e Recovery

### LocalStorage Backup
```javascript
// Export appointments
const data = localStorage.getItem('therapy-appointments');
console.log(data);

// Import appointments
localStorage.setItem('therapy-appointments', jsonData);
```

### Git Backup
```bash
# Create backup branch
git checkout -b backup-$(date +%Y%m%d)
git push origin backup-$(date +%Y%m%d)
```

---

## 📞 Support Contacts

### Netlify Support
- **Dashboard:** https://app.netlify.com
- **Documentation:** https://docs.netlify.com
- **Support:** support@netlify.com

### GitHub Support
- **Dashboard:** https://github.com
- **Documentation:** https://docs.github.com
- **Support:** https://support.github.com

---

## 🔐 Access Control

### Who Has Access
- **Owner:** Marco (desenvolvedor)
- **Client:** Beatriz Melo (terapeuta)

### Permissions
- **Netlify:** Owner access
- **GitHub:** Admin access
- **Domain:** Configurado via Netlify

---

## 📝 Notes

### Important Reminders
1. Este projeto não possui backend - todos os dados são locais
2. Cada usuário tem seus próprios dados no navegador
3. Limpar cache do navegador apaga todos os compromissos
4. Recomendado: Implementar backup/export no futuro

### Known Limitations
- Sem sincronização entre dispositivos
- Sem backup automático
- Sem autenticação de usuários
- Dados limitados ao navegador

---

**Última Atualização:** 22/01/2026  
**Responsável:** Marco (Desenvolvedor)

---

> ⚠️ **LEMBRETE:** Mantenha este documento seguro e atualizado. Nunca compartilhe tokens ou credenciais publicamente.
