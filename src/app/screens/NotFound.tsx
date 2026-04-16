import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Home } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-[#0F0F14] flex flex-col items-center justify-center max-w-md mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="text-8xl font-bold text-[#5F33E1] mb-4">404</div>
        <h1 className="text-3xl font-bold text-white mb-2">Page Not Found</h1>
        <p className="text-[#B8B8C7] mb-8">
          The page you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate("/app")}
          className="bg-[#5F33E1] hover:bg-[#7047E8] text-white px-8 py-4 rounded-2xl font-semibold transition-all shadow-lg shadow-[#5F33E1]/30 flex items-center gap-2 mx-auto"
        >
          <Home className="w-5 h-5" />
          Go Home
        </button>
      </motion.div>
    </div>
  );
}
