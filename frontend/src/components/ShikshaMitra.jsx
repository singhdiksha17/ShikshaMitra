import React, { useState } from "react";

export default function ShikshaMitra() {
  const [topic, setTopic] = useState("");
  const [summary, setSummary] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [language, setLanguage] = useState("en"); // default: English

  // -------------------------
  // Fetch Summary
  // -------------------------
  const handleSummary = async () => {
    if (!topic.trim()) return;
    setLoadingSummary(true);
    try {
      const res = await fetch("http://localhost:5000/api/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, language }), // lang key is important
      });
      const data = await res.json();
      setSummary(data.summary || "No summary found");
      setQuiz([]);
    } catch (err) {
      console.error(err);
      setSummary("Failed to fetch summary");
    }
    setLoadingSummary(false);
  };

  // -------------------------
  // Fetch Quiz
  // -------------------------
  const handleQuiz = async () => {
    if (!topic.trim()) return;
    setLoadingQuiz(true);
    try {
      const res = await fetch("http://localhost:5000/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, language }), // send lang
      });
      const data = await res.json();
      setQuiz(data.quiz || []);
      setSummary(""); // optional: hide summary when quiz is fetched
    } catch (err) {
      console.error(err);
      setQuiz([]);
    }
    setLoadingQuiz(false);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl text-center">
      <h1 className="text-4xl font-bold text-indigo-700 mb-6 flex justify-center items-center gap-2">
        📘 Shiksha Mitra
      </h1>

      <input
        type="text"
        placeholder="Enter a topic..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      {/* Language Selector */}
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
      </select>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={handleSummary}
          className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Get Summary
        </button>
        <button
          onClick={handleQuiz}
          className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
        >
          Get Quiz
        </button>
      </div>

      {/* Loading indicators */}
      {loadingSummary && <p className="text-gray-500">⏳ Generating summary...</p>}
      {loadingQuiz && <p className="text-gray-500">⏳ Generating quiz...</p>}

      {/* Summary */}
      {summary && (
        <div className="mt-4 text-left bg-indigo-50 border border-indigo-200 p-4 rounded-lg">
          <h2 className="font-semibold text-indigo-700 mb-2">📖 Summary</h2>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Quiz */}
      {quiz.length > 0 && (
        <div className="mt-4 text-left bg-green-50 border border-green-200 p-4 rounded-lg">
          <h2 className="font-semibold text-green-700 mb-2">🧠 Quiz</h2>
          {quiz.map((q, index) => (
            <div key={index} className="mb-3">
              <p className="font-medium text-gray-800">
                Q{index + 1}. {q.question}
              </p>
              <ul className="list-disc list-inside text-gray-600">
                {q.options.map((opt, i) => (
                  <li key={i}>{opt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
