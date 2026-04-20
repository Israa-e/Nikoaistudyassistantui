import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Bot, FileText, Brain, ChevronRight } from "lucide-react";

const slides = [
  {
    icon: Bot,
    title: "Your AI Study Companion",
    description: "Chat with an intelligent AI tutor that understands your learning materials and answers questions 24/7.",
    gradient: "from-[#6B5FFF] to-[#A855F7]",
  },
  {
    icon: FileText,
    title: "Smart PDF Analysis",
    description: "Upload lecture notes and PDFs. Get instant summaries, key points, and personalized study guides.",
    gradient: "from-[#A855F7] to-[#D946EF]",
  },
  {
    icon: Brain,
    title: "Quizzes & Flashcards",
    description: "Generate custom quizzes and flashcards from your materials. Track progress and improve retention.",
    gradient: "from-[#D946EF] to-[#FF7AB7]",
  },
];

export default function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate("/login");
    }
  };

  const skipOnboarding = () => {
    navigate("/login");
  };

  return (
    <div className="h-screen bg-[#0F0F14] flex flex-col max-w-md mx-auto">
      {/* Skip button */}
      <div className="flex justify-end p-6">
        <button
          onClick={skipOnboarding}
          className="text-[#B8B8C7] hover:text-white transition-colors text-sm font-medium"
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center"
          >
            {/* Icon */}
            <motion.div
              className={`w-32 h-32 rounded-[32px] bg-gradient-to-br ${slides[currentSlide].gradient} flex items-center justify-center mb-12 shadow-2xl shadow-[#6B5FFF]/20`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {(() => {
                const Icon = slides[currentSlide].icon;
                return <Icon className="w-16 h-16 text-white" />;
              })()}
            </motion.div>

            {/* Text */}
            <h2 className="text-3xl font-bold text-white mb-4">
              {slides[currentSlide].title}
            </h2>
            <p className="text-[#B8B8C7] leading-relaxed max-w-sm text-[16px]">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Section */}
      <div className="px-8 pb-12">
        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "w-8 bg-[#6B5FFF]"
                  : "w-2 bg-[#232334]"
              }`}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={nextSlide}
          className="w-full bg-[#6B5FFF] hover:bg-[#8B75FF] text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#6B5FFF]/30 hover:shadow-[#6B5FFF]/50"
        >
          {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
