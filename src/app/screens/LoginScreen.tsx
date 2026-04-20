import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Mail, Lock, Chrome } from "lucide-react";
import { NikoLogo } from "../components/NikoLogo";

export default function LoginScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-[#0F0F14] flex flex-col items-center justify-center max-w-md mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-24 h-24 rounded-[24px] bg-[#1A1A22]/50 backdrop-blur-sm border border-[#232334] flex items-center justify-center mb-4 shadow-lg shadow-[#6B5FFF]/30">
            <NikoLogo size={70} />
          </div>
          <h1 className="text-3xl font-bold text-white">Welcome to Niko</h1>
          <p className="text-[#B8B8C7] mt-2">
            {isLogin ? "Sign in to continue" : "Create your account"}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-[#1A1A22]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm text-[#B8B8C7] block">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B8B8C7]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full bg-[#232334] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-[#B8B8C7]/50 focus:outline-none focus:ring-2 focus:ring-[#6B5FFF] transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm text-[#B8B8C7] block">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B8B8C7]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#232334] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-[#B8B8C7]/50 focus:outline-none focus:ring-2 focus:ring-[#6B5FFF] transition-all"
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-[#6B5FFF] hover:text-[#8B75FF] transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#6B5FFF] hover:bg-[#8B75FF] text-white py-4 rounded-2xl font-semibold transition-all shadow-lg shadow-[#6B5FFF]/30 hover:shadow-[#6B5FFF]/50 mt-6"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#1A1A22] text-[#B8B8C7]">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Login */}
            <button
              type="button"
              className="w-full bg-[#232334] hover:bg-[#2A2A3C] border border-white/10 text-white py-4 rounded-2xl font-semibold transition-all flex items-center justify-center gap-3"
            >
              <Chrome className="w-5 h-5" />
              Google
            </button>
          </form>
        </div>

        {/* Toggle Login/Register */}
        <div className="text-center mt-8">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#B8B8C7] hover:text-white transition-colors"
          >
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <span className="text-[#6B5FFF] font-semibold">Sign Up</span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span className="text-[#6B5FFF] font-semibold">Sign In</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
