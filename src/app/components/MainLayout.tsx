import { Outlet, useNavigate, useLocation } from "react-router";
import { Home, Upload, MessageSquare, Brain, User } from "lucide-react";

export function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/app", icon: Home, label: "Home" },
    { path: "/app/upload", icon: Upload, label: "Upload" },
    { path: "/app/chat", icon: MessageSquare, label: "AI Chat" },
    { path: "/app/quiz", icon: Brain, label: "Quiz" },
    { path: "/app/profile", icon: User, label: "Profile" },
  ];

  const isActive = (path: string) => {
    if (path === "/app") {
      return location.pathname === "/app";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="h-screen flex flex-col bg-[#0F0F14] max-w-md mx-auto">
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#1A1A22]/90 backdrop-blur-xl border-t border-white/10">
        <div className="flex items-center justify-around px-4 py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all ${
                  active
                    ? "text-white"
                    : "text-[#B8B8C7] hover:text-white"
                }`}
              >
                <div className={`p-2 rounded-xl transition-all ${
                  active ? "bg-[#6B5FFF]" : "bg-transparent"
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
