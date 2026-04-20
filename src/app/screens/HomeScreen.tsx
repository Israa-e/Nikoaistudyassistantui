import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Upload, MessageSquare, Brain, Calendar, Sparkles, TrendingUp, Flame, Target, Layers } from "lucide-react";

export default function HomeScreen() {
  const navigate = useNavigate();

  const subjects = [
    { name: "Data Security", progress: 75, color: "#6B5FFF", lessons: 12, completed: 9 },
    { name: "Web Development", progress: 60, color: "#A855F7", lessons: 15, completed: 9 },
    { name: "Algorithms", progress: 45, color: "#FF4D9F", lessons: 20, completed: 9 },
  ];

  const quickActions = [
    { icon: Upload, label: "Upload PDF", path: "/app/upload", gradient: "from-[#6B5FFF] to-[#8B75FF]" },
    { icon: MessageSquare, label: "Ask AI", path: "/app/chat", gradient: "from-[#A855F7] to-[#C97DF8]" },
    { icon: Brain, label: "Take Quiz", path: "/app/quiz", gradient: "from-[#D946EF] to-[#E96BF3]" },
    { icon: Layers, label: "Flashcards", path: "/app/flashcards", gradient: "from-[#FF4D9F] to-[#FF7AB7]" },
  ];

  return (
    <div className="min-h-screen bg-[#0F0F14] px-6 pt-8 pb-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-1">Good morning, Alex! 👋</h1>
        <p className="text-[#B8B8C7]">Ready to learn something new today?</p>
      </motion.div>

      {/* AI Suggestion Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-[#6B5FFF] to-[#A855F7] rounded-3xl p-6 mb-6 shadow-2xl shadow-[#6B5FFF]/20 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
        
        <div className="relative flex items-start gap-4">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-semibold mb-1">AI Recommendation</h3>
            <p className="text-white/90 text-sm mb-4">
              Revise <span className="font-semibold">Data Security Lecture 2</span> - You're close to finishing this module!
            </p>
            <button
              onClick={() => navigate("/app/chat")}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-5 py-2 rounded-xl text-sm font-medium transition-all"
            >
              Start Review
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 gap-3 mb-6"
      >
        <div className="bg-[#1A1A22]/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-[#B8B8C7] text-xs">Streak</span>
          </div>
          <p className="text-2xl font-bold text-white">7</p>
          <p className="text-[#B8B8C7] text-xs">days</p>
        </div>

        <div className="bg-[#1A1A22]/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-[#B8B8C7] text-xs">Hours</span>
          </div>
          <p className="text-2xl font-bold text-white">24</p>
          <p className="text-[#B8B8C7] text-xs">this week</p>
        </div>

        <div className="bg-[#1A1A22]/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-blue-500" />
            <span className="text-[#B8B8C7] text-xs">Quizzes</span>
          </div>
          <p className="text-2xl font-bold text-white">12</p>
          <p className="text-[#B8B8C7] text-xs">passed</p>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.label}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(action.path)}
                className={`bg-gradient-to-br ${action.gradient} rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all`}
              >
                <Icon className="w-7 h-7 text-white mb-3" />
                <p className="text-white font-semibold text-sm text-left">{action.label}</p>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Subjects Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-bold text-white mb-4">Your Subjects</h2>
        <div className="space-y-3">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="bg-[#1A1A22]/50 backdrop-blur-xl border border-white/10 rounded-2xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-white font-semibold">{subject.name}</h3>
                  <p className="text-[#B8B8C7] text-sm">
                    {subject.completed} of {subject.lessons} lessons
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">{subject.progress}%</p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-[#232334] rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${subject.progress}%` }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: subject.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}