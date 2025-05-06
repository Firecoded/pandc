import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Too many requests from this IP, please try again later.",
});

app.post("/analyze", limiter, async (req, res) => {
  const { decision, pros, cons } = req.body;

  const prompt = `
You're helping someone decide:

Decision: ${decision}

Pros:
${pros
  .filter(Boolean)
  .map((p) => `- ${p}`)
  .join("\n")}

Cons:
${cons
  .filter(Boolean)
  .map((c) => `- ${c}`)
  .join("\n")}

Summarize this, suggest a recommendation, and point out any missing considerations.
  `.trim();

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    res.json({ result: data.choices?.[0]?.message?.content ?? "No response" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch AI response" });
  }
});

app.listen(3001, () =>
  console.log("🐣 Backend running on http://localhost:3001")
);
