// import React from "react";
// import { AlertTriangle, Pill, FileText } from "lucide-react";
// import type { AnalysisResult } from "../types";

// interface ResultCardProps {
//   result: AnalysisResult;
// }

// const getRiskColor = (risk: string) => {
//   const colors = {
//     Low: "bg-green-500",
//     Medium: "bg-yellow-500",
//     High: "bg-orange-500",
//     Critical: "bg-red-500",
//   };
//   return colors[risk as keyof typeof colors] || "bg-gray-500";
// };

// export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
//   return (
//     <div className="w-full max-w-2xl animate-fadeIn rounded-xl bg-white/10 p-6 backdrop-blur-lg">
//       <div className="mb-4 flex items-center justify-between">
//         <h3 className="text-xl font-bold text-white">
//           {result?.condition || "Unknown Condition"}
//         </h3>
//         <span
//           className={`rounded-full ${getRiskColor(
//             result?.riskLevel || "Unknown"
//           )} px-3 py-1 text-sm font-semibold text-white`}
//         >
//           {result?.riskLevel || "N/A"} Risk
//         </span>
//       </div>

//       <div className="space-y-4">
//         <div className="flex items-start gap-3">
//           <Pill className="h-5 w-5 text-blue-400" />
//           <div>
//             <h4 className="font-semibold text-blue-400">Emergency Medicine</h4>
//             <p className="text-gray-300">
//               {result?.emergencyMedicine || "No data available"}
//             </p>
//           </div>
//         </div>

//         <div className="flex items-start gap-3">
//           <FileText className="h-5 w-5 text-blue-400" />
//           <div>
//             <h4 className="font-semibold text-blue-400">Guidelines</h4>
//             <p className="text-gray-300">
//               {result?.guidelines || "No guidelines available"}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


import React from "react";
import { AlertTriangle, Pill, FileText } from "lucide-react";
import type { AnalysisResult } from "../types";

interface ResultCardProps {
  result: AnalysisResult;
}

const getRiskColor = (risk: string) => {
  const colors = {
    Low: "bg-green-500",
    Medium: "bg-yellow-500",
    High: "bg-orange-500",
    Critical: "bg-red-500",
  };
  return colors[risk as keyof typeof colors] || "bg-gray-500";
};

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  return (
    <div className="w-full max-w-2xl animate-fadeIn rounded-xl bg-white/10 p-6 backdrop-blur-lg">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">
          {result?.riskCondition || "Unknown Condition"}
        </h3>
        <span
          className={`rounded-full ${getRiskColor(
            result?.riskLevel || "N/A"
          )} px-3 py-1 text-sm font-semibold text-white`}
        >
          {result?.riskLevel || "N/A"} Risk
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Pill className="h-5 w-5 text-blue-400" />
          <div>
            <h4 className="font-semibold text-blue-400">Emergency Medicine</h4>
            <p className="text-gray-300">
              {result?.emergencyMedicine || "No data available"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <FileText className="h-5 w-5 text-blue-400" />
          <div>
            <h4 className="font-semibold text-blue-400">Guidelines</h4>
            <p className="text-gray-300">
              {result?.guidelines || "No guidelines available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
