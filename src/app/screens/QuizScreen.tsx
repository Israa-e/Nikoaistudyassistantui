import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Brain, Clock, ChevronRight, CheckCircle, XCircle, Trophy, RotateCcw } from "lucide-react";

type QuizState = "setup" | "quiz" | "results";

const quizQuestions = [
  {
    id: 1,
    question: "What type of encryption uses the same key for both encryption and decryption?",
    options: [
      "Asymmetric encryption",
      "Symmetric encryption",
      "Hash encryption",
      "Public key encryption",
    ],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "Which algorithm is commonly used for asymmetric encryption?",
    options: ["AES", "DES", "RSA", "MD5"],
    correctAnswer: 2,
  },
  {
    id: 3,
    question: "What is the primary purpose of a digital signature?",
    options: [
      "Data compression",
      "Authentication and integrity",
      "Data encryption",
      "Password hashing",
    ],
    correctAnswer: 1,
  },
];

export default function QuizScreen() {
  const [quizState, setQuizState] = useState<QuizState>("setup");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(180);

  const subjects = ["Data Security", "Web Development", "Algorithms", "Machine Learning"];
  const difficulties = ["Easy", "Medium", "Hard"];

  const handleStartQuiz = () => {
    if (selectedSubject && selectedDifficulty) {
      setQuizState("quiz");
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizState("results");
    }
  };

  const calculateScore = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === quizQuestions[index].correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / quizQuestions.length) * 100);
  };

  const restartQuiz = () => {
    setQuizState("setup");
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setSelectedSubject("");
    setSelectedDifficulty("");
  };

  return (
    <div className="min-h-screen bg-[#0F0F14] px-6 pt-8 pb-6">
      <AnimatePresence mode="wait">
        {/* Setup Screen */}
        {quizState === "setup" && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Generate Quiz</h1>
              <p className="text-[#B8B8C7]">Test your knowledge with AI-generated questions</p>
            </div>

            {/* Subject Selection */}
            <div className="mb-6">
              <label className="text-white font-medium mb-3 block">Select Subject</label>
              <div className="grid grid-cols-2 gap-3">
                {subjects.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => setSelectedSubject(subject)}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      selectedSubject === subject
                        ? "border-[#5F33E1] bg-[#5F33E1]/20"
                        : "border-white/10 bg-[#1A1A22]/50"
                    }`}
                  >
                    <span className="text-white font-medium text-sm">{subject}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Selection */}
            <div className="mb-8">
              <label className="text-white font-medium mb-3 block">Difficulty Level</label>
              <div className="flex gap-3">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`flex-1 p-4 rounded-2xl border-2 transition-all ${
                      selectedDifficulty === difficulty
                        ? "border-[#5F33E1] bg-[#5F33E1]/20"
                        : "border-white/10 bg-[#1A1A22]/50"
                    }`}
                  >
                    <span className="text-white font-medium text-sm">{difficulty}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quiz Settings Card */}
            <div className="bg-[#1A1A22]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-6">
              <h3 className="text-white font-semibold mb-4">Quiz Settings</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#B8B8C7]">Questions</span>
                  <span className="text-white font-medium">10 questions</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#B8B8C7]">Time Limit</span>
                  <span className="text-white font-medium">3 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#B8B8C7]">Points per question</span>
                  <span className="text-white font-medium">10 points</span>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <button
              onClick={handleStartQuiz}
              disabled={!selectedSubject || !selectedDifficulty}
              className={`w-full py-4 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 ${
                selectedSubject && selectedDifficulty
                  ? "bg-[#5F33E1] hover:bg-[#7047E8] text-white shadow-lg shadow-[#5F33E1]/30"
                  : "bg-[#232334] text-[#B8B8C7] cursor-not-allowed"
              }`}
            >
              Start Quiz
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {/* Quiz Screen */}
        {quizState === "quiz" && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Quiz Header */}
            <div className="bg-[#1A1A22]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-5 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-[#5F33E1]" />
                  <span className="text-white font-medium">
                    Question {currentQuestion + 1}/{quizQuestions.length}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-[#232334] px-4 py-2 rounded-xl">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span className="text-white font-medium">
                    {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#232334] rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                  className="h-full bg-[#5F33E1] rounded-full"
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="bg-[#1A1A22]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-6">
              <h2 className="text-white text-xl font-semibold leading-relaxed">
                {quizQuestions[currentQuestion].question}
              </h2>
            </div>

            {/* Answer Options */}
            <div className="space-y-3 mb-6">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-5 rounded-2xl border-2 transition-all text-left ${
                    selectedAnswers[currentQuestion] === index
                      ? "border-[#5F33E1] bg-[#5F33E1]/20"
                      : "border-white/10 bg-[#232334] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswers[currentQuestion] === index
                          ? "border-[#5F33E1] bg-[#5F33E1]"
                          : "border-white/30"
                      }`}
                    >
                      {selectedAnswers[currentQuestion] === index && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-white font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestion] === undefined}
              className={`w-full py-4 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 ${
                selectedAnswers[currentQuestion] !== undefined
                  ? "bg-[#5F33E1] hover:bg-[#7047E8] text-white shadow-lg shadow-[#5F33E1]/30"
                  : "bg-[#232334] text-[#B8B8C7] cursor-not-allowed"
              }`}
            >
              {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {/* Results Screen */}
        {quizState === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            {/* Score Card */}
            <div className="bg-gradient-to-br from-[#5F33E1] to-[#8B5CF6] rounded-3xl p-8 mb-6 text-center shadow-2xl shadow-[#5F33E1]/30">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6"
              >
                <Trophy className="w-14 h-14 text-white" />
              </motion.div>
              <h1 className="text-4xl font-bold text-white mb-2">{calculateScore()}%</h1>
              <p className="text-white/90 text-lg">Great job! Keep it up!</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-[#1A1A22]/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-white mb-1">
                  {selectedAnswers.filter((a, i) => a === quizQuestions[i].correctAnswer).length}
                </p>
                <p className="text-[#B8B8C7] text-xs">Correct</p>
              </div>
              <div className="bg-[#1A1A22]/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-white mb-1">
                  {selectedAnswers.filter((a, i) => a !== quizQuestions[i].correctAnswer).length}
                </p>
                <p className="text-[#B8B8C7] text-xs">Wrong</p>
              </div>
              <div className="bg-[#1A1A22]/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-white mb-1">{quizQuestions.length}</p>
                <p className="text-[#B8B8C7] text-xs">Total</p>
              </div>
            </div>

            {/* Review Answers */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-4">Review Answers</h2>
              <div className="space-y-3">
                {quizQuestions.map((question, index) => {
                  const isCorrect = selectedAnswers[index] === question.correctAnswer;
                  return (
                    <div
                      key={question.id}
                      className={`bg-[#1A1A22]/50 backdrop-blur-xl border rounded-2xl p-5 ${
                        isCorrect ? "border-green-500/30" : "border-red-500/30"
                      }`}
                    >
                      <div className="flex items-start gap-3 mb-2">
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                        )}
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium mb-2">
                            Question {index + 1}
                          </p>
                          <p className="text-[#B8B8C7] text-xs">
                            {isCorrect ? "Correct" : "Incorrect"} •{" "}
                            {question.options[question.correctAnswer]}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={restartQuiz}
                className="bg-[#232334] hover:bg-[#2A2A3C] border border-white/10 text-white py-4 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Retry
              </button>
              <button className="bg-[#5F33E1] hover:bg-[#7047E8] text-white py-4 rounded-2xl font-semibold transition-all shadow-lg shadow-[#5F33E1]/30">
                Continue Learning
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
