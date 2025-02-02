// export interface GeneticAnalysisInput {
//   geneCode: string;
//   chromosomeCount: number;
// }

// export interface AnalysisResult {
//   Guidelines: string;
//   emergencyMedicine: string;
//   condition: string;
//   riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
//   medicine: string;
//   guidelines: string;
// }

// export interface ApiResponse {
//   success: boolean;
//   data: AnalysisResult;
// }

export interface GeneticAnalysisInput {
  geneCode: string;
  chromosomeCount: number;
}

export interface AnalysisResult {
  riskCondition: string;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  emergencyMedicine: string;  // Keep this, remove "medicine"
  guidelines: string;  // Fix capitalization if API sends lowercase
}

export interface ApiResponse {
  success: boolean;
  data: AnalysisResult;
}
