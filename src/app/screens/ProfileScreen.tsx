import { motion } from "motion/react";
import { User, Settings, Flame, TrendingUp, Trophy, Bell, Moon, Download, LogOut, ChevronRight, Award } from "lucide-react";

export default function ProfileScreen() {
  const stats = [
    { label: "Study Streak", value: "7 days", icon: Flame, color: "text-orange-500" },
    { label: "Total Hours", value: "142h", icon: TrendingUp, color: "text-green-500" },
    { label: "Quizzes Passed", value: "48", icon: Trophy, color: "text-yellow-500" },
    { label: "Achievements", value: "12", icon: Award, color: "text-purple-500" },
  ];

  const settingsOptions = [
    { icon: Bell, label: "Notifications", value: "On" },
    { icon: Moon, label: "Dark Mode", value: "On" },
    { icon: Settings, label: "AI Settings", value: "" },
    { icon: Download, label: "Export Data", value: "" },
  ];

  return (
    <div className="min-h-screen bg-[#0F0F14] px-6 pt-8 pb-6">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center mb-8"
      >
        <div className="relative mb-4">
          <div className="w-24 h-24 bg-gradient-to-br from-[#5F33E1] to-[#8B5CF6] rounded-3xl flex items-center justify-center shadow-xl shadow-[#5F33E1]/30">
            <User className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-green-500 border-4 border-[#0F0F14] w-8 h-8 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white mb-1">Alex Johnson</h1>
        <p className="text-[#B8B8C7]">alex.johnson@university.edu</p>
        <button className="mt-4 bg-[#1A1A22]/50 border border-white/10 text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-[#232334] transition-all">
          Edit Profile
        </button>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 gap-3 mb-8"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="bg-[#1A1A22]/50 backdrop-blur-xl border border-white/10 rounded-2xl p-5"
            >
              <Icon className={`w-6 h-6 ${stat.color} mb-3`} />
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-[#B8B8C7] text-xs">{stat.label}</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Recent Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-xl font-bold text-white mb-4">Recent Achievements</h2>
        <div className="space-y-3">
          {[
            { icon: "🔥", title: "Week Warrior", desc: "7-day study streak", color: "from-orange-500 to-red-500" },
            { icon: "🎯", title: "Quiz Master", desc: "Passed 10 quizzes", color: "from-purple-500 to-pink-500" },
            { icon: "📚", title: "Bookworm", desc: "100 hours studied", color: "from-blue-500 to-cyan-500" },
          ].map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-[#1A1A22]/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center gap-4"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${achievement.color} rounded-2xl flex items-center justify-center text-2xl`}>
                {achievement.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold">{achievement.title}</h3>
                <p className="text-[#B8B8C7] text-sm">{achievement.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-xl font-bold text-white mb-4">Settings</h2>
        <div className="bg-[#1A1A22]/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          {settingsOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <button
                key={option.label}
                className={`w-full flex items-center justify-between p-5 hover:bg-[#232334] transition-all ${
                  index !== settingsOptions.length - 1 ? "border-b border-white/10" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <Icon className="w-5 h-5 text-[#B8B8C7]" />
                  <span className="text-white font-medium">{option.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {option.value && (
                    <span className="text-[#B8B8C7] text-sm">{option.value}</span>
                  )}
                  <ChevronRight className="w-5 h-5 text-[#B8B8C7]" />
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Subject Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-8"
      >
        <h2 className="text-xl font-bold text-white mb-4">Learning Progress</h2>
        <div className="space-y-4">
          {[
            { name: "Data Security", progress: 75, color: "#5F33E1" },
            { name: "Web Development", progress: 60, color: "#8B5CF6" },
            { name: "Algorithms", progress: 45, color: "#A78BFA" },
          ].map((subject, index) => (
            <motion.div
              key={subject.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="bg-[#1A1A22]/50 backdrop-blur-xl border border-white/10 rounded-2xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-medium">{subject.name}</span>
                <span className="text-[#B8B8C7] text-sm">{subject.progress}%</span>
              </div>
              <div className="w-full bg-[#232334] rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${subject.progress}%` }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: subject.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Logout Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 py-4 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2"
      >
        <LogOut className="w-5 h-5" />
        Sign Out
      </motion.button>
    </div>
  );
}
