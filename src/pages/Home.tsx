import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import heroImg from "../assets/hero.jpg";

export const Home = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Se já estiver logado, manda direto pro dashboard
  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  return (
    <div className="relative flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-64px)] overflow-hidden">
      {/* Foto de Fundo */}
      <img
        src={heroImg}
        alt="Foto da turma"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Overlay escuro para legibilidade */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl mx-auto gap-6">
        {/* Badge */}
        <div className="inline-flex items-center bg-amber-500/15 border border-amber-500/30 rounded-full px-4 py-1.5 text-amber-300 text-xs font-semibold tracking-wide uppercase">
          SEMINC 2026
        </div>

        {/* Título */}
        <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight tracking-tight">
          Minicurso{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
            Firebase
          </span>
        </h1>

        {/* Subtítulo */}
        <p className="text-base sm:text-lg text-slate-300 max-w-md leading-relaxed">
          Aprenda a integrar autenticação e banco de dados em tempo real com{" "}
          <span className="text-amber-400 font-semibold">Firebase + Vite + React</span>.
        </p>

        {/* CTA */}
        <button
          onClick={() => navigate("/login")}
          className="mt-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-base shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
        >
          Começar agora
        </button>

        {/* Nota */}
        <p className="text-xs text-slate-500">
          Faça login ou crie uma conta para acessar o painel
        </p>
      </div>
    </div>
  );
};
