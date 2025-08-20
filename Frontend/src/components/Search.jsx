import { useState } from "react";
import API from "../api"; 

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);

  const handleSearch = async () => {
    try {
      const res = await API.get(`/search?concern=${query}`);
      setResults(res.data);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-pink-50">
      <div className="w-full max-w-2xl p-8 bg-white shadow-lg rounded-xl">
        <h2 className="mb-6 text-3xl font-bold text-center text-pink-700">
          Find Your Perfect Treatment
        </h2>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <input
            type="text"
            className="w-full p-3 border rounded-lg outline-none sm:w-3/4 focus:ring-2 focus:ring-pink-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your skin/hair concern…"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-3 text-white transition bg-pink-600 rounded-lg hover:bg-pink-700"
          >
            Search
          </button>
        </div>

        {results && (
          <div className="mt-8">
            <h3 className="mb-4 text-xl font-semibold text-center text-gray-800">
              Concern: <span className="text-pink-600">{results.concern}</span>
            </h3>

            <div className="mt-6">
              <h4 className="mb-2 text-lg font-medium text-gray-700">
                Treatments:
              </h4>
              <ul className="pl-6 space-y-2 list-disc">
                {results.treatments.length > 0 ? (
                  results.treatments.map((t) => (
                    <li
                      key={t._id}
                      className="p-2 bg-pink-100 rounded-md"
                    >
                      {t.name}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No treatments found</li>
                )}
              </ul>
            </div>

            <div className="mt-6">
              <h4 className="mb-2 text-lg font-medium text-gray-700">
                Packages:
              </h4>
              <ul className="pl-6 space-y-2 list-disc">
                {results.packages.length > 0 ? (
                  results.packages.map((p) => (
                    <li
                      key={p._id}
                      className="p-2 bg-pink-100 rounded-md"
                    >
                      {p.package_name || "Unnamed Package"}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No packages found</li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
