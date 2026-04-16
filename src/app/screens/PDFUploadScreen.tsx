import { useState } from "react";
import { motion } from "motion/react";
import { Upload, FileText, CheckCircle, Sparkles } from "lucide-react";

type UploadState = "idle" | "processing" | "complete";

export default function PDFUploadScreen() {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [fileName, setFileName] = useState("");

  const handleFileUpload = () => {
    setFileName("Data_Security_Lecture_5.pdf");
    setUploadState("processing");
    
    setTimeout(() => {
      setUploadState("complete");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#0F0F14] px-6 pt-8 pb-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Upload PDF</h1>
        <p className="text-[#B8B8C7]">Upload your lecture notes or study materials</p>
      </div>

      {uploadState === "idle" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Upload Area */}
          <div
            onClick={handleFileUpload}
            className="border-2 border-dashed border-white/20 rounded-3xl p-12 flex flex-col items-center justify-center cursor-pointer hover:border-[#5F33E1] hover:bg-[#1A1A22]/30 transition-all min-h-[300px]"
          >
            <div className="w-20 h-20 bg-[#5F33E1]/20 rounded-2xl flex items-center justify-center mb-6">
              <Upload className="w-10 h-10 text-[#5F33E1]" />
            </div>
            <h3 className="text-white font-semibold text-xl mb-2">Drop your PDF here</h3>
            <p className="text-[#B8B8C7] text-center mb-6">
              or click to browse files
            </p>
            <button className="bg-[#5F33E1] hover:bg-[#7047E8] text-white px-6 py-3 rounded-xl font-medium transition-all">
              Choose File
            </button>
          </div>

          {/* Recent Uploads */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Recent Uploads</h2>
            <div className="space-y-3">
              {[
                { name: "Data Security Lecture 4.pdf", date: "2 days ago", pages: 24 },
                { name: "Web Dev Notes.pdf", date: "1 week ago", pages: 18 },
                { name: "Algorithms Chapter 3.pdf", date: "2 weeks ago", pages: 32 },
              ].map((file, index) => (
                <motion.div
                  key={file.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#1A1A22]/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-[#232334] rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#5F33E1]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium text-sm">{file.name}</h3>
                    <p className="text-[#B8B8C7] text-xs">
                      {file.pages} pages • {file.date}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {uploadState === "processing" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#1A1A22]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center min-h-[400px]"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-[#5F33E1] to-[#8B5CF6] rounded-2xl flex items-center justify-center mb-6 relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-4 border-transparent border-t-white/30 rounded-2xl"
            />
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          
          <h3 className="text-white font-semibold text-xl mb-2">Processing PDF...</h3>
          <p className="text-[#B8B8C7] text-center mb-6 max-w-xs">
            AI is analyzing your document and extracting key information
          </p>
          
          <div className="w-full max-w-xs space-y-3">
            {["Extracting text", "Identifying topics", "Generating summary"].map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.5 }}
                className="flex items-center gap-3"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.5 + 0.2 }}
                  className="w-5 h-5 bg-[#5F33E1] rounded-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-white rounded-full" />
                </motion.div>
                <span className="text-[#B8B8C7] text-sm">{step}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {uploadState === "complete" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          {/* Success Card */}
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-3xl p-8 flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6"
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>
            
            <h3 className="text-white font-semibold text-xl mb-2">Upload Complete!</h3>
            <p className="text-[#B8B8C7] mb-1">{fileName}</p>
            <p className="text-green-400 text-sm">Successfully processed</p>
          </div>

          {/* AI Summary Card */}
          <div className="bg-[#1A1A22]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#5F33E1]/20 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#5F33E1]" />
              </div>
              <h3 className="text-white font-semibold">AI Summary</h3>
            </div>
            <p className="text-[#B8B8C7] text-sm leading-relaxed mb-6">
              This lecture covers advanced encryption methods including AES, RSA, and modern cryptographic protocols. Key topics include symmetric vs asymmetric encryption, digital signatures, and practical security implementations.
            </p>
            
            <div className="space-y-2">
              <h4 className="text-white font-medium text-sm mb-3">Key Topics Identified:</h4>
              {["Encryption Algorithms", "Digital Signatures", "Public Key Infrastructure", "Hash Functions"].map((topic, index) => (
                <div
                  key={topic}
                  className="bg-[#232334] rounded-xl px-4 py-2 text-sm text-[#B8B8C7] border border-white/5"
                >
                  {topic}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-[#5F33E1] hover:bg-[#7047E8] text-white py-4 rounded-2xl font-semibold transition-all">
              Generate Quiz
            </button>
            <button className="bg-[#232334] hover:bg-[#2A2A3C] border border-white/10 text-white py-4 rounded-2xl font-semibold transition-all">
              Chat About It
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
