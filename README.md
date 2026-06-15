# 📊 ExcelDiagnóstico

> **Aplicación de autodiagnóstico de habilidades en Excel** — Evaluá tu nivel real y obtené recomendaciones personalizadas en español.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://excel-diagnostico.netlify.app)

## 🚀 Demo en vivo

**URL:** [https://excel-diagnostico.netlify.app](https://excel-diagnostico.netlify.app)

---

## ✨ Características

- 🔐 **Autenticación** con Firebase Auth (Email/Contraseña)
- 📝 **25 preguntas** en 5 niveles de dificultad (Inicial → Experto)
- 📊 **Barra de progreso** animada con indicadores por nivel
- 🏆 **Badge de nivel** con porcentaje de aciertos
- 💡 **Recomendaciones personalizadas** según el nivel alcanzado
- ☁️ **Persistencia en Firestore** — historial de intentos por usuario
- 📱 **Responsive** — funciona en celular, tablet y escritorio
- 🌙 **Modo oscuro** nativo con paleta premium

---

## 🗂 Estructura del proyecto

```
excel-diagnostico/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── LoginForm.jsx         # Formulario de login
│   │   │   └── RegisterForm.jsx      # Formulario de registro
│   │   ├── Quiz/
│   │   │   ├── QuizQuestion.jsx      # Pregunta individual
│   │   │   ├── ProgressBar.jsx       # Barra de progreso
│   │   │   └── LevelBadge.jsx        # Badge de nivel alcanzado
│   │   └── Results/
│   │       └── Recommendations.jsx   # Recomendaciones de mejora
│   ├── contexts/
│   │   └── AuthContext.jsx           # Contexto global de Auth
│   ├── data/
│   │   └── questions.js              # 25 preguntas + lógica de scoring
│   ├── firebase/
│   │   ├── config.js                 # Inicialización Firebase
│   │   ├── auth.js                   # Funciones de autenticación
│   │   └── firestore.js              # Operaciones CRUD en Firestore
│   ├── pages/
│   │   ├── Landing.jsx               # Página de inicio
│   │   ├── AuthPage.jsx              # Login / Registro
│   │   ├── QuizPage.jsx              # Quiz en progreso
│   │   └── ResultsPage.jsx           # Resultados y recomendaciones
│   ├── utils/
│   │   └── scoring.js                # Cálculo de puntaje y nivel
│   └── __tests__/
│       ├── scoring.test.js           # Tests de cálculo de puntaje
│       ├── auth.test.js              # Tests de flujo de autenticación
│       └── firestore.test.js         # Tests de operaciones Firestore
├── netlify.toml                      # Config de deploy en Netlify
├── tailwind.config.js
├── vite.config.js
└── vitest.config.js
```

---

## 🎯 Niveles del diagnóstico

| Nivel | Porcentaje | Temas evaluados |
|---|---|---|
| 🌱 Inicial | 0–19% | Interfaz, celdas, fórmulas básicas |
| 📘 Básico | 20–39% | Referencias, CONTAR, MAX, atajos |
| 📊 Intermedio | 40–59% | BUSCARV, tablas dinámicas, formato condicional |
| 🚀 Avanzado | 60–79% | Macros, ÍNDICE+COINCIDIR, Power Query, Solver |
| 🏆 Experto | 80–100% | VBA, DAX, funciones dinámicas 365 |

---

## 🗃 Modelo de datos (Firestore)

**Colección:** `resultados`

```json
{
  "uid": "string",
  "nombre": "string",
  "apellido": "string",
  "email": "string",
  "fecha": "Timestamp",
  "puntaje": "number (0–25)",
  "porcentaje": "number (0–100)",
  "nivelAlcanzado": "Inicial|Básico|Intermedio|Avanzado|Experto",
  "indicesCorrectos": "number[]",
  "indicesIncorrectos": "number[]"
}
```

---

## ⚙️ Instalación y desarrollo local

### 1. Clonar el repositorio

```bash
git clone https://github.com/morini-prog/excel-diagnostico.git
cd excel-diagnostico
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
```

Completar `.env` con las credenciales del proyecto Firebase:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

### 4. Ejecutar en modo desarrollo

```bash
npm run dev
```

### 5. Ejecutar tests

```bash
npm run test
```

### 6. Build de producción

```bash
npm run build
```

---

## 🔒 Reglas de Firestore recomendadas

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /resultados/{docId} {
      allow create: if request.auth != null
                    && request.auth.uid == request.resource.data.uid;
      allow read: if request.auth != null
                   && request.auth.uid == resource.data.uid;
      allow update, delete: if false;
    }
  }
}
```

---

## 🛠 Stack técnico

| Tecnología | Versión | Uso |
|---|---|---|
| React | 18.x | UI y componentes |
| Vite | 6.x | Build tool y dev server |
| Tailwind CSS | 3.x | Estilos utilitarios |
| Firebase Auth | 10.x | Autenticación de usuarios |
| Firestore | 10.x | Base de datos NoSQL en la nube |
| React Router | 6.x | Enrutamiento SPA |
| Vitest | 2.x | Testing unitario |

---

## 📄 Licencia

MIT — Libre uso para fines educativos.
