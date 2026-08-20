import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/auth";
import { LogOut, User as UserIcon } from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo — só texto */}
        <Link to="/" className="font-bold text-lg text-slate-100 tracking-tight hover:text-white transition-colors">
          Minicurso Firebase
        </Link>

        {/* User Info & Logout */}
        {user && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "Avatar"}
                  className="w-8 h-8 rounded-full border-2 border-amber-500 object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
                  <UserIcon size={16} />
                </div>
              )}
              <span className="text-sm font-medium text-slate-200 hidden sm:inline-block">
                {user.displayName || user.email?.split("@")[0]}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 hover:text-rose-300 transition-colors cursor-pointer"
            >
              <LogOut size={15} />
              <span>Sair</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
