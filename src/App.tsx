// import React, { useState } from "react";
// import { Dna, AlertCircle } from "lucide-react";
// import { Background } from "./components/Background";
// import { LoadingSpinner } from "./components/LoadingSpinner";
// import { ResultCard } from "./components/ResultCard";
// import type { AnalysisResult, GeneticAnalysisInput } from "./types";

// function App() {
//   const [input, setInput] = useState<GeneticAnalysisInput>({
//     geneCode: "",
//     chromosomeCount: 0,
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [result, setResult] = useState<AnalysisResult | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//   //   try {
//   //     const response = await fetch("http://127.0.0.1:5001/predict", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify(input),
//   //     });

//   //     if (!response.ok) {
//   //       throw new Error("Analysis failed. Please try again.");
//   //     }

//   //     const data = await response.json();
//   //     setResult(data.data);
//   //   } catch (err) {
//   //     setError(
//   //       err instanceof Error ? err.message : "An unexpected error occurred"
//   //     );
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   try {
//     const response = await fetch("http://127.0.0.1:5001/predict", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         gene_code: input.geneCode, // Updated key names to match backend
//         number_of_chromosomes: input.chromosomeCount,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error("Analysis failed. Please try again.");
//     }

//     const data = await response.json();
//     setResult(data); // Fixed result parsing
//   } catch (err) {
//     setError(
//       err instanceof Error ? err.message : "An unexpected error occurred"
//     );
//   } finally {
//     setLoading(false);
//   }
// };


//   return (
//     <>
//       <Background />

//       <div className="min-h-screen w-full p-4">
//         <div className="mx-auto max-w-4xl">
//           <div className="mb-8 text-center">
//             <div className="mb-4 flex items-center justify-center">
//               <Dna className="h-12 w-12 animate-pulse text-blue-400" />
//             </div>
//             <h1 className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-4xl font-bold text-transparent">
//               Genetic Risk Analysis
//             </h1>
//             <p className="mt-2 text-gray-400">
//               Advanced AI-powered genetic risk assessment system
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="mb-8 space-y-4">
//             <div className="space-y-2">
//               <label
//                 htmlFor="geneCode"
//                 className="block text-sm font-medium text-gray-300"
//               >
//                 Gene Code
//               </label>
//               <input
//                 type="text"
//                 id="geneCode"
//                 value={input.geneCode}
//                 onChange={(e) =>
//                   setInput({ ...input, geneCode: e.target.value })
//                 }
//                 className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
//                 placeholder="Enter gene code..."
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <label
//                 htmlFor="chromosomeCount"
//                 className="block text-sm font-medium text-gray-300"
//               >
//                 Number of Chromosomes
//               </label>
//               <input
//                 type="number"
//                 id="chromosomeCount"
//                 value={input.chromosomeCount || ""}
//                 onChange={(e) =>
//                   setInput({
//                     ...input,
//                     chromosomeCount: parseInt(e.target.value) || 0,
//                   })
//                 }
//                 className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
//                 placeholder="Enter chromosome count..."
//                 required
//                 min="1"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="group relative w-full overflow-hidden rounded-lg bg-blue-600 px-4 py-2 text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               <span className="relative z-10">
//                 {loading ? "Analyzing..." : "Analyze Genetic Data"}
//               </span>
//               <div className="absolute inset-0 -z-10 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-500 group-hover:translate-x-[100%]" />
//             </button>
//           </form>

//           {error && (
//             <div className="mb-8 flex items-center gap-2 rounded-lg bg-red-500/10 p-4 text-red-400">
//               <AlertCircle className="h-5 w-5" />
//               <p>{error}</p>
//             </div>
//           )}

//           <div className="space-y-4">
//             {loading && <LoadingSpinner />}
//             {result && <ResultCard result={result} />}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;

import React, { useState } from "react";
import { Dna, AlertCircle } from "lucide-react";
import { Background } from "./components/Background";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { ResultCard } from "./components/ResultCard";
import type { AnalysisResult, GeneticAnalysisInput } from "./types";

function App() {
  const [input, setInput] = useState<GeneticAnalysisInput>({
    geneCode: "",
    chromosomeCount: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:5001/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gene_code: input.geneCode, // Ensure key names match backend
          number_of_chromosomes: input.chromosomeCount,
        }),
      });

      if (!response.ok) {
        throw new Error("Analysis failed. Please try again.");
      }

      const data = await response.json();
      console.log("API Response:", data); // Debugging log

      if (data) {
        setResult({
          riskCondition: data.data.riskCondition || "Unknown Condition",
          riskLevel: data.data.riskLevel || "N/A",
          emergencyMedicine: data.data.emergencyMedicine || "No data available",
          guidelines: data.data.guidelines || "No guidelines available",
        });
      } else {
        console.error("Invalid API response:", data);
        setError("Unexpected response format.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Background />

      <div className="min-h-screen w-full p-4">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <div className="mb-4 flex items-center justify-center">
              <Dna className="h-12 w-12 animate-pulse text-blue-400" />
            </div>
            <h1 className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-4xl font-bold text-transparent">
              Genetic Risk Analysis
            </h1>
            <p className="mt-2 text-gray-400">
              Advanced AI-powered genetic risk assessment system
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mb-8 space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="geneCode"
                className="block text-sm font-medium text-gray-300"
              >
                Gene Code
              </label>
              <input
                type="text"
                id="geneCode"
                value={input.geneCode}
                onChange={(e) =>
                  setInput({ ...input, geneCode: e.target.value })
                }
                className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="Enter gene code..."
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="chromosomeCount"
                className="block text-sm font-medium text-gray-300"
              >
                Number of Chromosomes
              </label>
              <input
                type="number"
                id="chromosomeCount"
                value={input.chromosomeCount || ""}
                onChange={(e) =>
                  setInput({
                    ...input,
                    chromosomeCount: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="Enter chromosome count..."
                required
                min="1"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-lg bg-blue-600 px-4 py-2 text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="relative z-10">
                {loading ? "Analyzing..." : "Analyze Genetic Data"}
              </span>
              <div className="absolute inset-0 -z-10 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-500 group-hover:translate-x-[100%]" />
            </button>
          </form>

          {error && (
            <div className="mb-8 flex items-center gap-2 rounded-lg bg-red-500/10 p-4 text-red-400">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          )}

          <div className="space-y-4">
            {loading && <LoadingSpinner />}
            {result && <ResultCard result={result} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;


// import React, { useState } from "react";
// import { Dna, AlertCircle } from "lucide-react";
// import { Background } from "./components/Background";
// import { LoadingSpinner } from "./components/LoadingSpinner";
// import { ResultCard } from "./components/ResultCard";
// import type { AnalysisResult, GeneticAnalysisInput } from "./types";

// function App() {
//   const [input, setInput] = useState<GeneticAnalysisInput>({
//     geneCode: "",
//     chromosomeCount: 0,
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [result, setResult] = useState<AnalysisResult | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch("http://127.0.0.1:5001/predict", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           gene_code: input.geneCode, // Updated key names to match backend
//           number_of_chromosomes: input.chromosomeCount,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Analysis failed. Please try again.");
//       }

//       const data = await response.json();
//       setResult(data); // Fixed result parsing
//     } catch (err) {
//       setError(
//         err instanceof Error ? err.message : "An unexpected error occurred"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Background />

//       <div className="min-h-screen w-full p-4">
//         <div className="mx-auto max-w-4xl">
//           <div className="mb-8 text-center">
//             <div className="mb-4 flex items-center justify-center">
//               <Dna className="h-12 w-12 animate-pulse text-blue-400" />
//             </div>
//             <h1 className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-4xl font-bold text-transparent">
//               Genetic Risk Analysis
//             </h1>
//             <p className="mt-2 text-gray-400">
//               Advanced AI-powered genetic risk assessment system
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="mb-8 space-y-4">
//             <div className="space-y-2">
//               <label
//                 htmlFor="geneCode"
//                 className="block text-sm font-medium text-gray-300"
//               >
//                 Gene Code
//               </label>
//               <input
//                 type="text"
//                 id="geneCode"
//                 value={input.geneCode}
//                 onChange={(e) =>
//                   setInput({ ...input, geneCode: e.target.value })
//                 }
//                 className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
//                 placeholder="Enter gene code..."
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <label
//                 htmlFor="chromosomeCount"
//                 className="block text-sm font-medium text-gray-300"
//               >
//                 Number of Chromosomes
//               </label>
//               <input
//                 type="number"
//                 id="chromosomeCount"
//                 value={input.chromosomeCount || ""}
//                 onChange={(e) =>
//                   setInput({
//                     ...input,
//                     chromosomeCount: parseInt(e.target.value) || 0,
//                   })
//                 }
//                 className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
//                 placeholder="Enter chromosome count..."
//                 required
//                 min="1"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="group relative w-full overflow-hidden rounded-lg bg-blue-600 px-4 py-2 text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               <span className="relative z-10">
//                 {loading ? "Analyzing..." : "Analyze Genetic Data"}
//               </span>
//               <div className="absolute inset-0 -z-10 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-500 group-hover:translate-x-[100%]" />
//             </button>
//           </form>

//           {error && (
//             <div className="mb-8 flex items-center gap-2 rounded-lg bg-red-500/10 p-4 text-red-400">
//               <AlertCircle className="h-5 w-5" />
//               <p>{error}</p>
//             </div>
//           )}

//           <div className="space-y-4">
//             {loading && <LoadingSpinner />}
//             {result && <ResultCard result={result} />}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;
