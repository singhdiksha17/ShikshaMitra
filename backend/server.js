import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import translate from "google-translate-api-x";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// ✅ Summary endpoint
app.post("/api/summary", async (req, res) => {
  try {
    const { topic, language } = req.body;
    if (!topic) return res.status(400).json({ error: "Topic is required" });

    // Use Wikipedia API for summary
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`
    );
    const data = await response.json();
    let summary =
      data.extract ||
      `Sorry, I couldn't find a summary for ${topic}. Try another topic.`;

    // Translate summary
    if (language && language !== "en") {
      const translated = await translate(summary, { to: language });
      summary = translated.text;
    }

    res.json({ summary });
  } catch (error) {
    console.error("Error generating summary:", error);
    res.status(500).json({ error: "Error generating summary" });
  }
});

// ✅ Quiz endpoint with realistic options
app.post("/api/quiz", async (req, res) => {
  try {
    const { topic, language } = req.body;
    if (!topic) return res.status(400).json({ error: "Topic is required" });

    // Use Wikipedia API for content
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`
    );
    const data = await response.json();
    const summary = data.extract || "";

    // Simple question generation logic
    const quiz = [
      {
        question: `What is ${topic} mainly known for?`,
        options: [
          `${topic} is related to science.`,
          `${topic} is a historical event.`,
          `${topic} is a geographical location.`,
          `${topic} is a type of food.`,
        ],
        answer: `${topic} is a historical event.`,
      },
      {
        question: `In which context is ${topic} often mentioned?`,
        options: [
          "Sports",
          "Technology",
          "Culture",
          "Environment",
        ],
        answer: "Culture",
      },
      {
        question: `Which of the following best describes ${topic}?`,
        options: [
          "A person",
          "A place",
          "An idea",
          "An object",
        ],
        answer: "A place",
      },
    ];

    // ✅ Translate questions + options + answers if needed
    let translatedQuiz = quiz;
    if (language && language !== "en") {
      translatedQuiz = await Promise.all(
        quiz.map(async (q) => {
          const translatedQuestion = await translate(q.question, { to: language });
          const translatedOptions = await Promise.all(
            q.options.map(async (opt) => {
              const translatedOpt = await translate(opt, { to: language });
              return translatedOpt.text;
            })
          );
          const translatedAnswer = await translate(q.answer, { to: language });

          return {
            question: translatedQuestion.text,
            options: translatedOptions,
            answer: translatedAnswer.text,
          };
        })
      );
    }

    res.json({ quiz: translatedQuiz });
  } catch (error) {
    console.error("Error generating quiz:", error);
    res.status(500).json({ error: "Error generating quiz" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
