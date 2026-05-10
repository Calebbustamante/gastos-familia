# 💸 Control de Gastos Familiar — PWA

## 📦 Contenido de la carpeta
```
gastos-app/
├── index.html        ← La app completa
├── manifest.json     ← Configuración PWA
├── sw.js             ← Service Worker (offline)
├── icons/            ← Íconos de la app
│   ├── icon-72.png
│   ├── icon-96.png
│   ├── icon-128.png
│   ├── icon-144.png
│   ├── icon-152.png
│   ├── icon-192.png
│   ├── icon-384.png
│   └── icon-512.png
└── README.md         ← Este archivo
```

---

## 🚀 Cómo publicarla GRATIS en 30 segundos

### Opción 1: Netlify Drop (más fácil)
1. Ve a **https://app.netlify.com/drop**
2. Arrastra **toda la carpeta** `gastos-app` a la página
3. Netlify te da una URL como `https://tu-app-abc123.netlify.app`
4. ¡Listo! Comparte esa URL con tu familia

### Opción 2: Vercel
1. Ve a **https://vercel.com**
2. Crea cuenta gratis con Google
3. Sube la carpeta con el CLI o el dashboard
4. Te da una URL permanente gratis

---

## 📱 Cómo instalarla en el celular

### Android (Chrome)
1. Abre la URL en Chrome
2. Aparece un banner abajo: **"Instalar app en tu celular"**
3. Toca el banner → Instalar
4. Ya tienes el ícono en tu pantalla de inicio 🎉

### iPhone (Safari)
1. Abre la URL en Safari
2. Toca el botón **Compartir** (cuadrado con flecha)
3. Selecciona **"Agregar a la pantalla de inicio"**
4. Confirma → Instalar

---

## 🔧 Configurar EmailJS (recuperación de contraseña)

Para que el envío de correos funcione:
1. Crea cuenta gratis en **https://www.emailjs.com**
2. Crea un Email Service (Gmail, Outlook, etc.)
3. Crea un Email Template con estas variables:
   - `{{to_email}}` — destinatario
   - `{{recovery_code}}` — código de 6 dígitos
   - `{{user_name}}` — nombre del usuario
4. Abre `index.html` con un editor de texto y reemplaza:
```javascript
const EJ_KEY  = "TU_PUBLIC_KEY";   // Account → API Keys
const EJ_SVC  = "TU_SERVICE_ID";   // Email Services → Service ID
const EJ_TPL  = "TU_TEMPLATE_ID";  // Email Templates → Template ID
```

---

## 💾 Sobre los datos
- Los datos se guardan en el **localStorage** del navegador
- Cada dispositivo tiene sus propios datos
- Para compartir datos entre dispositivos → necesita Firebase (próxima versión)

---

## 🛠️ Versiones
- v5.0 — Login independiente por usuario + PWA
