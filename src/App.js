import { useState } from "react";
import { parseCSV } from "./utils/files";
import {
  getPairsWorkingTogether,
  transformToProjects,
  findLongestWorkingPair,
} from "./utils/project";
import "./App.css";
import PairTable from "./Components/PairTable";

function App() {
  const [loading, setLoading] = useState(false);
  const [longestWorkingPair, setLongestWorkingPair] = useState(null);
  const [error, setError] = useState("");

  async function onFileUpload(e) {
    try {
      setLoading(true);
      setLongestWorkingPair(null);
      setError("");
      const newFile = e.target.files[0];
      const fileExtension = newFile.name.split(".").pop();
      if (fileExtension !== "csv") {
        throw new Error("Please upload a CSV file");
      }

      const parsedFile = await parseCSV(newFile);
      const projects = transformToProjects(parsedFile);
      const pairs = getPairsWorkingTogether(projects);
      const pairWorkingTogetherTheMost = findLongestWorkingPair(pairs);

      setLongestWorkingPair(pairWorkingTogetherTheMost);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="App">
      {/* Drag and drop div */}
      <div className="container">
        <h1>Longest working pair calculator</h1>
        <label htmlFor="file" className="file-label">
          <input type="file" name="file" id="file" onChange={onFileUpload} />
          {loading ? "Loading" : "Upload CSV file"}
        </label>
        {error && <p className="error">{error}</p>}

        {longestWorkingPair && <PairTable pair={longestWorkingPair} />}
      </div>
    </div>
  );
}

export default App;
