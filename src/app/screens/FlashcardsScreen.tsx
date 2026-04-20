import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, RotateCw, Check, X, Sparkles } from "lucide-react";

const flashcards = [
  {
    id: 1,
    question: "What is symmetric encryption?",
    answer: "A type of encryption where the same key is used for both encryption and decryption. Examples include AES and DES algorithms.",
  },
  {
    id: 2,
    question: "What is RSA?",
    answer: "An asymmetric encryption algorithm that uses a public key for encryption and a private key for decryption, widely used for secure data transmission.",
  },
  {
    id: 3,
    question: "What is a digital signature?",
    answer: "A cryptographic technique used to verify the authenticity and integrity of digital documents, ensuring they haven't been tampered with.",
  },
  {
    id: 4,
    question: "What is hashing?",
    answer: "A one-way cryptographic function that converts data of any size into a fixed-size string of characters, commonly used for password storage.",
  },
  {
    id: 5,
    question: "What is AES?",
    answer: "Advanced Encryption Standard - a symmetric encryption algorithm that is widely adopted as the standard for encrypting sensitive data.",
  },
];

export default function FlashcardsScreen() {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<number[]>([]);
  const [unknownCards, setUnknownCards] = useState<number[]>([]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKnow = () => {
    if (!knownCards.includes(currentCard)) {
      setKnownCards([...knownCards, currentCard]);
    }
    nextCard();
  };

  const handleDontKnow = () => {
    if (!unknownCards.includes(currentCard)) {
      setUnknownCards([...unknownCards, currentCard]);
    }
    nextCard();
  };

  const nextCard = () => {
    setIsFlipped(false);
    if (currentCard < flashcards.length - 1) {
      setTimeout(() => setCurrentCard(currentCard + 1), 300);
    }
  };

  const prevCard = () => {
    setIsFlipped(false);
    if (currentCard > 0) {
      setTimeout(() => setCurrentCard(currentCard - 1), 300);
    }
  };

  const resetCards = () => {
    setCurrentCard(0);
    setIsFlipped(false);
    setKnownCards([]);
    setUnknownCards([]);
  };

  const isComplete = currentCard === flashcards.length - 1 && (knownCards.includes(currentCard) || unknownCards.includes(currentCard));

  return (
    <div className="min-h-screen bg-[#0F0F14] px-6 pt-8 pb-6 flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Flashcards</h1>
        <p className="text-[#B8B8C7]">Data Security • 5 cards</p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[#B8B8C7] text-sm">
            Card {Math.min(currentCard + 1, flashcards.length)} of {flashcards.length}
          </span>
          <button
            onClick={resetCards}
            className="text-[#6B5FFF] hover:text-[#8B75FF] transition-colors flex items-center gap-2 text-sm"
          >
            <RotateCw className="w-4 h-4" />
            Reset
          </button>
        </div>
        <div className="w-full bg-[#232334] rounded-full h-2 overflow-hidden">
          <motion.div
            animate={{ width: `${((currentCard + 1) / flashcards.length) * 100}%` }}
            className="h-full bg-gradient-to-r from-[#6B5FFF] to-[#A855F7] rounded-full"
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {!isComplete ? (
        <>
          {/* Flashcard */}
          <div className="flex-1 flex items-center justify-center mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCard}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-sm"
              >
                <div
                  onClick={handleFlip}
                  className="relative cursor-pointer"
                  style={{ perspective: "1000px" }}
                >
                  <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ transformStyle: "preserve-3d" }}
                    className="relative w-full aspect-[4/5] rounded-3xl"
                  >
                    {/* Front */}
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-[#6B5FFF] to-[#A855F7] rounded-3xl p-8 flex flex-col items-center justify-center shadow-2xl shadow-[#6B5FFF]/30"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                    >
                      <Sparkles className="w-12 h-12 text-white/40 mb-6" />
                      <h2 className="text-white text-2xl font-bold text-center leading-relaxed">
                        {flashcards[currentCard].question}
                      </h2>
                      <p className="text-white/60 text-sm mt-8">Tap to reveal answer</p>
                    </div>

                    {/* Back */}
                    <div
                      className="absolute inset-0 bg-[#1A1A22] border-2 border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center shadow-2xl"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <div className="w-12 h-12 bg-[#6B5FFF]/20 rounded-2xl flex items-center justify-center mb-6">
                        <Check className="w-6 h-6 text-[#6B5FFF]" />
                      </div>
                      <p className="text-white text-lg text-center leading-relaxed">
                        {flashcards[currentCard].answer}
                      </p>
                      <p className="text-[#B8B8C7] text-sm mt-8">Tap to see question</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={prevCard}
              disabled={currentCard === 0}
              className={`p-4 rounded-2xl transition-all ${
                currentCard === 0
                  ? "bg-[#232334] text-[#B8B8C7] cursor-not-allowed"
                  : "bg-[#1A1A22]/50 border border-white/10 text-white hover:bg-[#232334]"
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex gap-2">
              {flashcards.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentCard
                      ? "bg-[#6B5FFF] w-6"
                      : knownCards.includes(index)
                      ? "bg-green-500"
                      : unknownCards.includes(index)
                      ? "bg-red-500"
                      : "bg-[#232334]"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextCard}
              disabled={currentCard === flashcards.length - 1}
              className={`p-4 rounded-2xl transition-all ${
                currentCard === flashcards.length - 1
                  ? "bg-[#232334] text-[#B8B8C7] cursor-not-allowed"
                  : "bg-[#1A1A22]/50 border border-white/10 text-white hover:bg-[#232334]"
              }`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Action Buttons */}
          {isFlipped && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 gap-3"
            >
              <button
                onClick={handleDontKnow}
                className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 py-4 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2"
              >
                <X className="w-5 h-5" />
                Don't Know
              </button>
              <button
                onClick={handleKnow}
                className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 py-4 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                I Know This
              </button>
            </motion.div>
          )}
        </>
      ) : (
        /* Complete Screen */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 flex flex-col items-center justify-center"
        >
          <div className="bg-gradient-to-br from-[#6B5FFF] to-[#A855F7] rounded-3xl p-8 mb-6 text-center shadow-2xl shadow-[#6B5FFF]/30 w-full">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6"
            >
              <Check className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-2">Complete!</h2>
            <p className="text-white/90">You've reviewed all flashcards</p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full mb-6">
            <div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-6 text-center">
              <p className="text-4xl font-bold text-green-400 mb-2">{knownCards.length}</p>
              <p className="text-green-300 text-sm">Known</p>
            </div>
            <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-6 text-center">
              <p className="text-4xl font-bold text-red-400 mb-2">{unknownCards.length}</p>
              <p className="text-red-300 text-sm">Need Review</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full">
            <button
              onClick={resetCards}
              className="bg-[#232334] hover:bg-[#2A2A3C] border border-white/10 text-white py-4 rounded-2xl font-semibold transition-all"
            >
              Study Again
            </button>
            <button className="bg-[#6B5FFF] hover:bg-[#8B75FF] text-white py-4 rounded-2xl font-semibold transition-all shadow-lg shadow-[#6B5FFF]/30">
              Continue
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
