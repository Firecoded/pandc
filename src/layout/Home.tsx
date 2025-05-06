import { Link } from "react-router";

export default function Home() {
  return (
    <div className="p-4 font-bold h-screen flex justify-center">
      <div className="mt-[200px] flex items-center flex-col">
        <h1 className="text-3xl">Pros and Cons</h1>
        <Link
          to="/decision"
          className="inline-block rounded-full px-4 py-3 text-white font-semibold transition text-xl mt-3 bg-emerald-500 hover:bg-emerald-600"
        >
          Start New Decision
        </Link>
      </div>
    </div>
  );
}
