import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithEmail, registerWithEmail, loginWithGoogle } from "../services/auth";
import { isFirebaseConfigured } from "../services/firebase";
import { ArrowLeft } from "lucide-react";

export const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isFirebaseConfigured) {
      setError("Configure o arquivo .env com suas chaves do Firebase para habilitar o login.");
      return;
    }

    setLoading(true);
    
    try {
      if (isRegistering) {
        await registerWithEmail(email, password);
      } else {
        await loginWithEmail(email, password);
      }
      navigate("/dashboard");

    } catch (err: any) {
      setError(
        err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password"
          ? "E-mail ou senha incorretos."
          : err.code === "auth/email-already-in-use"
          ? "Este e-mail já está cadastrado."
          : err.code === "auth/weak-password"
          ? "A senha deve ter pelo menos 6 caracteres."
          : "Erro ao autenticar. Verifique seus dados."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");

    if (!isFirebaseConfigured) {
      setError("Configure o arquivo .env com suas chaves do Firebase para habilitar o login.");
      return;
    }

    setLoading(true);
    try {
      await loginWithGoogle();
      navigate("/dashboard");
    } catch (err: any) {
      setError("Falha ao entrar com o Google. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-4 sm:py-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="w-full max-w-md sm:max-w-lg">

        {/* Botão Voltar */}
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 hover:text-slate-200 transition-colors mb-3 cursor-pointer group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          Voltar
        </button>

        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/60">

          {/* Header */}
          <div className="mb-5">
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              {isRegistering ? "Criar conta" : "Entrar na sua conta"}
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              {isRegistering
                ? "Preencha os dados abaixo para se cadastrar"
                : "Bem-vindo de volta ao Minicurso Firebase"}
            </p>
          </div>

          {/* Aviso sem .env */}
          {!isFirebaseConfigured && (
            <div className="mb-4 p-3 rounded-lg bg-amber-500/8 border border-amber-500/20 text-xs">
              <p className="font-semibold text-amber-200 mb-0.5">Firebase não configurado</p>
              <p className="text-amber-300/70">
                Preencha o <code className="font-mono bg-amber-500/15 px-1 rounded">.env</code> com as chaves do Firebase Console.
              </p>
            </div>
          )}

          {/* Erro */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-rose-500/8 border border-rose-500/20 text-rose-300 text-xs">
              {error}
            </div>
          )}

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-400">E-mail</label>
              <input
                type="email"
                placeholder="seu@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-700/60 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500/30 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-400">Senha</label>
              <input
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-700/60 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500/30 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-1 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 hover:opacity-90 text-white font-semibold text-sm transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-amber-500/20"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block"></span>
                  Aguarde...
                </span>
              ) : isRegistering ? "Criar conta" : "Entrar"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-slate-800"></div>
            <span className="text-xs text-slate-600">ou continue com</span>
            <div className="flex-1 h-px bg-slate-800"></div>
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-800 font-medium text-sm rounded-lg flex items-center justify-center gap-2.5 transition-all border border-slate-200 disabled:opacity-50 cursor-pointer shadow-sm"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.15z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
            </svg>
            Google
          </button>

          {/* Toggle */}
          <p className="mt-4 text-center text-xs text-slate-500">
            {isRegistering ? "Já tem uma conta? " : "Não tem conta? "}
            <button
              type="button"
              onClick={() => { setIsRegistering(!isRegistering); setError(""); }}
              className="text-amber-400 hover:text-amber-300 font-medium transition-colors cursor-pointer"
            >
              {isRegistering ? "Fazer login" : "Cadastre-se"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
