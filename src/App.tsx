import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./layout/Home";
import DecisionPage from "./layout/DecisionPage";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="decision" element={<DecisionPage />} />
    </Routes>
  );
}

export default App;
