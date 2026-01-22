# Guia: Transformar Agenda em App Instalável (PWA)

## 📱 Visão Geral

Para transformar a aplicação web **Agenda Terapia com Café** em um aplicativo instalável, precisamos implementar uma **Progressive Web App (PWA)**. Isso permitirá:

- ✅ Instalar o app no celular/desktop com ícone próprio
- ✅ Funcionar offline
- ✅ Abrir em tela cheia (sem barra do navegador)
- ✅ Aparecer na lista de apps do dispositivo
- ✅ Receber notificações push (futuro)

---

## 🛠️ Implementação

### 1. Criar Manifest (manifest.json)

Arquivo: `public/manifest.json`

```json
{
  "name": "Agenda Terapia com Café",
  "short_name": "Agenda Terapia",
  "description": "Sistema de agendamento profissional para terapeutas",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#1e1b4b",
  "theme_color": "#8b5cf6",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "categories": ["productivity", "health", "business"],
  "screenshots": [
    {
      "src": "/screenshot-mobile.png",
      "sizes": "540x720",
      "type": "image/png",
      "form_factor": "narrow"
    },
    {
      "src": "/screenshot-desktop.png",
      "sizes": "1280x720",
      "type": "image/png",
      "form_factor": "wide"
    }
  ]
}
```

### 2. Criar Ícones do App

Você precisará criar ícones em diferentes tamanhos. Recomendado usar a xícara de café atual como base.

**Tamanhos necessários:**
- 72x72
- 96x96
- 128x128
- 144x144
- 152x152
- 192x192
- 384x384
- 512x512

**Ferramentas para gerar ícones:**
- https://realfavicongenerator.net/
- https://www.pwabuilder.com/imageGenerator
- Photoshop/Figma (manual)

**Design do ícone:**
- Usar a xícara de café com gradiente violeta/ciano
- Fundo sólido ou gradiente
- Bordas arredondadas (iOS safe area)
- Versão "maskable" para Android

### 3. Adicionar Service Worker

Arquivo: `public/sw.js`

```javascript
const CACHE_NAME = 'agenda-terapia-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/index.css',
  '/assets/index.js',
  '/coffee-cup-v5.png'
];

// Install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Fetch
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

// Activate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
```

### 4. Registrar Service Worker

Arquivo: `src/main.tsx` (adicionar no final)

```typescript
// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered:', registration);
      })
      .catch((error) => {
        console.log('SW registration failed:', error);
      });
  });
}
```

### 5. Atualizar index.html

Arquivo: `index.html` (adicionar no `<head>`)

```html
<!-- PWA Manifest -->
<link rel="manifest" href="/manifest.json">

<!-- Theme Color -->
<meta name="theme-color" content="#8b5cf6">

<!-- Apple Touch Icon -->
<link rel="apple-touch-icon" href="/icon-192x192.png">

<!-- Apple Mobile Web App -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Agenda Terapia">

<!-- Splash Screens (iOS) -->
<link rel="apple-touch-startup-image" href="/splash-640x1136.png" media="(device-width: 320px) and (device-height: 568px)">
<link rel="apple-touch-startup-image" href="/splash-750x1334.png" media="(device-width: 375px) and (device-height: 667px)">
<link rel="apple-touch-startup-image" href="/splash-1242x2208.png" media="(device-width: 414px) and (device-height: 736px)">
```

### 6. Configurar Vite para PWA

Instalar plugin:
```bash
npm install vite-plugin-pwa -D
```

Arquivo: `vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['coffee-cup-v5.png', 'icon-*.png'],
      manifest: {
        name: 'Agenda Terapia com Café',
        short_name: 'Agenda Terapia',
        description: 'Sistema de agendamento profissional',
        theme_color: '#8b5cf6',
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
```

---

## 📲 Como Instalar o App

### Android (Chrome)
1. Abrir https://agenda-beatriz-terapia.netlify.app
2. Menu (⋮) → "Adicionar à tela inicial"
3. Confirmar instalação
4. Ícone aparece na tela inicial

### iOS (Safari)
1. Abrir https://agenda-beatriz-terapia.netlify.app
2. Botão "Compartilhar" (□↑)
3. "Adicionar à Tela de Início"
4. Confirmar
5. Ícone aparece na tela inicial

### Desktop (Chrome/Edge)
1. Abrir https://agenda-beatriz-terapia.netlify.app
2. Ícone de instalação na barra de endereço (+)
3. Clicar em "Instalar"
4. App abre em janela própria

---

## 🎨 Design do Ícone

### Conceito Recomendado

**Opção 1: Xícara Minimalista**
- Xícara de café estilizada
- Gradiente violeta → ciano
- Fundo sólido escuro (#1e1b4b)
- Bordas arredondadas

**Opção 2: Inicial + Xícara**
- Letra "A" (Agenda) ou "T" (Terapia)
- Xícara integrada ao design
- Cores do tema

**Opção 3: Calendário + Café**
- Ícone de calendário
- Xícara sobreposta
- Cores vibrantes

### Especificações Técnicas
- **Formato:** PNG com transparência
- **Safe Zone:** 80% da área (20% de margem)
- **Maskable:** Considerar corte circular (Android)
- **Contraste:** Alto contraste para visibilidade

---

## ✅ Checklist de Implementação

- [ ] Criar ícones em todos os tamanhos
- [ ] Criar `manifest.json`
- [ ] Criar `sw.js` (Service Worker)
- [ ] Atualizar `index.html` com meta tags
- [ ] Registrar Service Worker em `main.tsx`
- [ ] Instalar e configurar `vite-plugin-pwa`
- [ ] Testar instalação no Android
- [ ] Testar instalação no iOS
- [ ] Testar instalação no Desktop
- [ ] Testar funcionamento offline
- [ ] Validar com Lighthouse (PWA score)

---

## 🧪 Testes

### Lighthouse PWA Audit
```bash
# Chrome DevTools
1. Abrir DevTools (F12)
2. Aba "Lighthouse"
3. Selecionar "Progressive Web App"
4. Clicar "Generate report"
5. Objetivo: Score 100/100
```

### Teste Manual
1. ✅ Instalar app no celular
2. ✅ Abrir app (tela cheia, sem barra do navegador)
3. ✅ Testar offline (modo avião)
4. ✅ Verificar ícone na tela inicial
5. ✅ Verificar splash screen (iOS)

---

## 📊 Benefícios da PWA

### Para o Usuário
- 🚀 Acesso rápido (ícone na tela inicial)
- 📱 Experiência nativa
- 🔌 Funciona offline
- 💾 Menos espaço que app nativo
- 🔄 Sempre atualizado

### Para o Negócio
- 💰 Sem taxa de App Store/Play Store
- 🌐 Um código para todas as plataformas
- 📈 Maior engajamento
- 🔔 Notificações push (futuro)
- 📊 Analytics integrado

---

## 🚀 Deploy

Após implementar, o deploy continua o mesmo:
```bash
npm run build
git add .
git commit -m "feat: add PWA support"
git push
netlify deploy --prod --dir=dist
```

O Netlify serve automaticamente o `manifest.json` e `sw.js`.

---

## 📚 Recursos Adicionais

### Ferramentas
- **PWA Builder:** https://www.pwabuilder.com/
- **Favicon Generator:** https://realfavicongenerator.net/
- **Maskable Icon Editor:** https://maskable.app/editor

### Documentação
- **MDN PWA Guide:** https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps
- **Web.dev PWA:** https://web.dev/progressive-web-apps/
- **Vite PWA Plugin:** https://vite-pwa-org.netlify.app/

### Validação
- **Lighthouse:** Chrome DevTools
- **PWA Checklist:** https://web.dev/pwa-checklist/

---

## 💡 Próximos Passos

1. **Criar ícones** - Usar Figma ou ferramenta online
2. **Implementar PWA** - Seguir checklist acima
3. **Testar** - Validar em diferentes dispositivos
4. **Deploy** - Publicar versão PWA
5. **Documentar** - Instruções para usuários instalarem

---

**Estimativa de Tempo:** 2-4 horas  
**Complexidade:** Média  
**Prioridade:** Alta (melhora muito a experiência do usuário)

---

**Última Atualização:** 22/01/2026
