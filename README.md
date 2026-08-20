# 🚀 Minicurso Vite + Firebase + Deploy

Aplicação desenvolvida para o minicurso prático sobre **Vite + React + TypeScript + Tailwind CSS + Firebase (Auth & Firestore) + Deploy**.

---

## ⚡ Como Rodar o Projeto Localmente

### 1. Clonar o repositório
```bash
git clone <URL_DO_REPOSITORIO>
cd minicurso-firebase
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar as Variáveis de Ambiente (Opcional para iniciar)
O projeto já abre e roda mesmo antes de configurar o Firebase.  
Para conectar com seu console do Firebase, copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Preencha o `.env` com as chaves geradas no seu **Firebase Console**:
```env
VITE_FIREBASE_API_KEY=sua_api_key
VITE_FIREBASE_AUTH_DOMAIN=seu_auth_domain
VITE_FIREBASE_PROJECT_ID=seu_project_id
VITE_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_messaging_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
```

### 4. Executar em modo de desenvolvimento
```bash
npm run dev
```

---

## 📁 Estrutura do Projeto

```text
minicurso-firebase/
├── .env.example          # Modelo de variáveis de ambiente
├── .env                  # Chaves do Firebase (não subir no Git!)
├── SOLUCAO.md            # Gabarito de código completo para consulta
├── package.json          # Dependências do projeto
├── tsconfig.json         # Configuração TypeScript
├── vite.config.ts        # Configuração do Vite + Tailwind
└── src/
    ├── @types/           # Interfaces e tipos do TypeScript
    │   └── index.ts
    ├── assets/           # Imagens e mídias
    │   └── hero.jpg
    ├── components/       # Componentes reutilizáveis
    │   ├── Navbar.tsx    # Barra de navegação
    │   └── ProtectedRoute.tsx # Proteção de rotas privadas
    ├── context/          # Provedor global de autenticação
    │   └── AuthContext.tsx # Contexto com onAuthStateChanged
    ├── pages/            # Telas da aplicação
    │   ├── Home.tsx      # Landing page inicial
    │   ├── Login.tsx     # Tela de login/cadastro
    │   └── Dashboard.tsx # Painel com CRUD de tarefas
    ├── services/         # Funções de integração do Firebase (TODOs do minicurso)
    │   ├── firebase.ts   # Inicialização do Firebase App, Auth e Firestore
    │   ├── auth.ts       # Funções de login, registro e Google Auth
    │   └── firestore.ts  # Funções de CRUD e Realtime com Firestore
    ├── App.tsx           # Roteamento da aplicação
    ├── index.css         # Import do Tailwind CSS e estilos globais
    ├── main.tsx          # Ponto de entrada
    └── vite-env.d.ts     # Tipagem das variáveis de ambiente
```

---

## 🛠️ Tecnologias Utilizadas
- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Firebase v11** (Authentication & Cloud Firestore)
- **React Router DOM v7**
- **Lucide React**
