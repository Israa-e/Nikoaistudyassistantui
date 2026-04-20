import { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { NikoLogo } from "../components/NikoLogo";

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen bg-gradient-to-b from-[#0F0F14] to-[#1A1A22] flex flex-col items-center justify-center max-w-md mx-auto p-8">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-8"
      >
        {/* Neural Network Logo */}
        <div className="relative">
          <motion.div
            className="w-40 h-40 rounded-[32px] bg-[#1A1A22]/50 backdrop-blur-sm border border-[#232334] flex items-center justify-center shadow-2xl shadow-[#6B5FFF]/30"
            animate={{
              boxShadow: [
                "0 20px 60px rgba(107, 95, 255, 0.3)",
                "0 20px 80px rgba(107, 95, 255, 0.5)",
                "0 20px 60px rgba(107, 95, 255, 0.3)",
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <NikoLogo size={100} />
            </motion.div>
          </motion.div>

          {/* AI pulse animation */}
          <div className="absolute -right-12 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1 bg-gradient-to-b from-[#6B5FFF] to-[#FF4D9F] rounded-full"
                animate={{
                  height: [12, 24, 12],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>

        {/* App Name */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Niko</h1>
          <p className="text-[#B8B8C7]">Learn. Understand. Remember.</p>
        </motion.div>

        {/* Loading indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex gap-2 mt-8"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-[#6B5FFF] rounded-full"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
