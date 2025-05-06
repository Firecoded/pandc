import { useState } from "react";
import BulletListInput from "../components/BulletListInput";

export default function DecisionPage() {
  const [whatDecision, setWhatDecision] = useState("");
  const [pros, setPros] = useState<string[]>([""]);
  const [cons, setCons] = useState<string[]>([""]);
  const [loading, setLoading] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<string>("");

  const handleAnalyze = async () => {
    setLoading(true);
    setAnalysis("");

    try {
      const res = await fetch("http://localhost:3001/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          decision: whatDecision,
          pros,
          cons,
        }),
      });

      const data = await res.json();
      setAnalysis(data.result);
    } catch (err) {
      console.error(err);
      setAnalysis("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center flex-col px-4">
      <div className="w-full max-w-xl mt-2">
        <label
          htmlFor="decision"
          className="block text-3xl font-medium text-white mb-4 text-center"
        >
          What decision are you trying to make?
        </label>
        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
          <input
            type="text"
            name="decision"
            id="decision"
            className="block min-w-0 grow py-2 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
            placeholder="Should I do X or Y?"
            onChange={(e) => setWhatDecision(e.target.value)}
            value={whatDecision}
          />
        </div>
      </div>
      <div className="mt-8 w-full max-w-7xl grid grid-cols-1 gap-6 md:grid-cols-2">
        <BulletListInput
          label="Pros"
          items={pros}
          onChange={setPros}
          color="emerald"
        />
        <BulletListInput
          label="Cons"
          items={cons}
          onChange={setCons}
          color="rose"
        />
      </div>
      {pros.some((p) => p.trim()) && cons.some((c) => c.trim()) && (
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="mt-6 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-2 transition disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze with AI"}
        </button>
      )}
      {analysis && (
        <div className="mt-8 max-w-3xl bg-gray-800 text-white rounded-lg p-6 whitespace-pre-wrap leading-relaxed">
          {analysis}
        </div>
      )}
    </div>
  );
}
