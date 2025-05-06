# 🧠 Pros & Cons AI

A simple decision-making tool powered by OpenAI.  
Users list pros and cons, then click “Analyze” to get an AI-generated summary and recommendation.

---

## ✨ Features

- Add and edit bullet-style pros & cons
- Analyze decisions using GPT-3.5
- Clean, responsive UI with Tailwind
- Backend proxy protects API key and includes rate limiting

---

## 🛠 Built With

- React + Vite
- Tailwind CSS
- Node.js + Express (backend)
- OpenAI API (`gpt-3.5-turbo`)

---

## 🚀 Local Setup

```bash
# frontend
npm install
npm run dev

# backend
cd backend
npm install
cp .env.example .env # add your OpenAI key
node index.js
```
