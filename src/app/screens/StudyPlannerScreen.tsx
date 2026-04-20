import { useState } from "react";
import { motion } from "motion/react";
import { Calendar as CalendarIcon, Clock, Brain, FileText, CheckCircle, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

type Task = {
  id: string;
  title: string;
  subject: string;
  time: string;
  duration: string;
  type: "study" | "quiz" | "review";
  completed: boolean;
};

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const currentDay = 2; // Wednesday

const tasks: Task[] = [
  {
    id: "1",
    title: "Review Data Security Lecture 5",
    subject: "Data Security",
    time: "09:00 AM",
    duration: "45 min",
    type: "review",
    completed: true,
  },
  {
    id: "2",
    title: "Practice Algorithms Problems",
    subject: "Algorithms",
    time: "11:00 AM",
    duration: "60 min",
    type: "study",
    completed: true,
  },
  {
    id: "3",
    title: "Take Web Dev Quiz",
    subject: "Web Development",
    time: "02:00 PM",
    duration: "30 min",
    type: "quiz",
    completed: false,
  },
  {
    id: "4",
    title: "Study Cryptography Chapter",
    subject: "Data Security",
    time: "04:00 PM",
    duration: "45 min",
    type: "study",
    completed: false,
  },
];

export default function StudyPlannerScreen() {
  const [selectedDay, setSelectedDay] = useState(currentDay);

  const getTaskIcon = (type: string) => {
    switch (type) {
      case "quiz":
        return Brain;
      case "review":
        return FileText;
      default:
        return Clock;
    }
  };

  const getTaskColor = (type: string) => {
    switch (type) {
      case "quiz":
        return { bg: "bg-purple-500/20", border: "border-purple-500/30", text: "text-purple-400" };
      case "review":
        return { bg: "bg-blue-500/20", border: "border-blue-500/30", text: "text-blue-400" };
      default:
        return { bg: "bg-[#6B5FFF]/20", border: "border-[#6B5FFF]/30", text: "text-[#6B5FFF]" };
    }
  };

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const progressPercent = (completedTasks / totalTasks) * 100;

  return (
    <div className="min-h-screen bg-[#0F0F14] px-6 pt-8 pb-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Study Planner</h1>
        <p className="text-[#B8B8C7]">Your AI-generated study schedule</p>
      </div>

      {/* AI Recommendation Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#6B5FFF] to-[#A855F7] rounded-3xl p-5 mb-6 shadow-lg shadow-[#6B5FFF]/20"
      >
        <div className="flex items-start gap-3">
          <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-semibold mb-1 text-sm">AI Study Tip</h3>
            <p className="text-white/90 text-xs leading-relaxed">
              You're on track! Focus on Web Dev Quiz at 2 PM to maintain your streak.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Progress Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#1A1A22]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-5 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[#B8B8C7] text-sm mb-1">Today's Progress</p>
            <p className="text-white text-2xl font-bold">
              {completedTasks}/{totalTasks} Tasks
            </p>
          </div>
          <div className="w-16 h-16 relative">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="6"
                fill="transparent"
                className="text-[#232334]"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 28}`}
                strokeDashoffset={`${2 * Math.PI * 28 * (1 - progressPercent / 100)}`}
                className="text-[#6B5FFF]"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-sm">{Math.round(progressPercent)}%</span>
            </div>
          </div>
        </div>
        <div className="w-full bg-[#232334] rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            className="h-full bg-gradient-to-r from-[#6B5FFF] to-[#A855F7] rounded-full"
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        </div>
      </motion.div>

      {/* Calendar Week View */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">April 2026</h2>
          <div className="flex gap-2">
            <button className="p-2 bg-[#1A1A22]/50 border border-white/10 rounded-xl hover:bg-[#232334] transition-all">
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button className="p-2 bg-[#1A1A22]/50 border border-white/10 rounded-xl hover:bg-[#232334] transition-all">
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day, index) => (
            <button
              key={day}
              onClick={() => setSelectedDay(index)}
              className={`relative flex flex-col items-center p-3 rounded-2xl transition-all ${
                index === selectedDay
                  ? "bg-[#6B5FFF] shadow-lg shadow-[#6B5FFF]/30"
                  : "bg-[#1A1A22]/50 border border-white/10 hover:bg-[#232334]"
              }`}
            >
              <span className={`text-xs mb-2 ${index === selectedDay ? "text-white" : "text-[#B8B8C7]"}`}>
                {day}
              </span>
              <span className={`text-lg font-bold ${index === selectedDay ? "text-white" : "text-white"}`}>
                {14 + index}
              </span>
              {index === currentDay && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Today's Schedule */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl font-bold text-white mb-4">Today's Schedule</h2>
        <div className="space-y-3">
          {tasks.map((task, index) => {
            const Icon = getTaskIcon(task.type);
            const colors = getTaskColor(task.type);
            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`bg-[#1A1A22]/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 ${
                  task.completed ? "opacity-60" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`${colors.bg} ${colors.border} border p-3 rounded-xl`}>
                    <Icon className={`w-5 h-5 ${colors.text}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className={`font-semibold mb-1 ${task.completed ? "line-through text-[#B8B8C7]" : "text-white"}`}>
                          {task.title}
                        </h3>
                        <p className="text-[#B8B8C7] text-xs">{task.subject}</p>
                      </div>
                      {task.completed && (
                        <div className="bg-green-500/20 border border-green-500/30 p-1 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-[#B8B8C7]">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{task.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-3 h-3" />
                        <span>{task.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {!task.completed && (
                  <button className="w-full mt-3 bg-[#6B5FFF]/10 hover:bg-[#6B5FFF]/20 border border-[#6B5FFF]/30 text-[#6B5FFF] py-2 rounded-xl text-sm font-medium transition-all">
                    Start Study Session
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
