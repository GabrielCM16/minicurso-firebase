import { auth } from "./firebase";

// TODO (Passo 2.1): Instanciar o provedor de autenticação do Google

// TODO (Passo 2.2): Criar função para cadastrar usuário com email e senha
export const registerWithEmail = async (email: string, pass: string) => {
  console.log("TODO: Implementar cadastro com email e senha", email, pass, auth);
  throw new Error("registerWithEmail não implementado");
};

// TODO (Passo 2.3): Criar função para login com email e senha
export const loginWithEmail = async (email: string, pass: string) => {
  console.log("TODO: Implementar login com email e senha", email, pass, auth);
  throw new Error("loginWithEmail não implementado");
};

// TODO (Passo 2.4): Criar função para login social com Google
export const loginWithGoogle = async () => {
  console.log("TODO: Implementar login com popup do Google", auth);
  throw new Error("loginWithGoogle não implementado");
};

// TODO (Passo 2.5): Criar função para deslogar usuário (logout)
export const logoutUser = async () => {
  console.log("TODO: Implementar logout", auth);
};
