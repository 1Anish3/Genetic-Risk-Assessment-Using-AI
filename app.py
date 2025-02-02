# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pandas as pd
# import numpy as np
# from sklearn.model_selection import train_test_split
# from sklearn.preprocessing import LabelEncoder, StandardScaler
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.multioutput import MultiOutputClassifier
#
# # Load dataset
# df = pd.read_csv("genetic_health_risk_assessment_updated.csv")
#
# # Encode categorical variables
# label_encoders = {}
# for col in ["Gene", "SNP", "Genotype", "Risk Associated Condition", "Risk Level", "Emergency Medicine", "Guidelines"]:
#     le = LabelEncoder()
#     df[col] = le.fit_transform(df[col])
#     label_encoders[col] = le
#
# # Define features and targets
# X = df[["Gene", "SNP", "Chromosome", "Position", "Genotype"]].copy()  # Ensuring it's a fresh DataFrame
# y = df[["Risk Associated Condition", "Risk Level", "Emergency Medicine", "Guidelines"]]
#
# # Standardize numerical features
# scaler = StandardScaler()
# X.loc[:, ["Chromosome", "Position"]] = scaler.fit_transform(X[["Chromosome", "Position"]])
#
# # Train-test split
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
#
# # Train model
# base_model = RandomForestClassifier(n_estimators=200, random_state=42, max_depth=20)
# multi_output_model = MultiOutputClassifier(base_model)
# multi_output_model.fit(X_train, y_train)
#
# # Flask app
# app = Flask(__name__)
# CORS(app, origins=["http://localhost:5173"])  # Allow frontend access
#
#
# @app.route("/predict", methods=["POST"])
# def predict():
#     try:
#         data = request.get_json()
#         print("Received data:", data)  # Debugging input data
#
#         gene = data.get("gene_code")
#         chromosome = data.get("number_of_chromosomes")
#
#         if gene is None or chromosome is None:
#             return jsonify({"error": "Missing required fields: 'gene_code' and 'number_of_chromosomes'"}), 400
#
#         chromosome = int(chromosome)
#
#         # Encode categorical input
#         if gene not in label_encoders["Gene"].classes_:
#             return jsonify({"error": f"Invalid gene_code: {gene}"}), 400
#
#         gene_encoded = label_encoders["Gene"].transform([gene])[0]
#
#         # Prepare input (SNP & Genotype set to 0 for simplicity)
#         input_data = pd.DataFrame([[gene_encoded, 0, chromosome, 0, 0]],
#                                   columns=["Gene", "SNP", "Chromosome", "Position", "Genotype"])
#
#         # Standardize numerical features
#         input_data.loc[:, ["Chromosome", "Position"]] = scaler.transform(input_data[["Chromosome", "Position"]])
#
#         # Make predictions
#         predictions = multi_output_model.predict(input_data)[0]
#
#         # Decode predictions
#         result = {
#             "riskCondition": label_encoders["Risk Associated Condition"].inverse_transform([predictions[0]])[0],
#             "riskLevel": label_encoders["Risk Level"].inverse_transform([predictions[1]])[0],
#             "emergencyMedicine": label_encoders["Emergency Medicine"].inverse_transform([predictions[2]])[0],
#             "guidelines": label_encoders["Guidelines"].inverse_transform([predictions[3]])[0]
#         }
#
#         print("Prediction result:", result)  # Debugging output data
#         return jsonify({"data": result})  # Ensuring response format matches frontend
#
#     except Exception as e:
#         print("Error:", str(e))  # Log the error for debugging
#         return jsonify({"error": str(e)}), 500
#
#
# if __name__ == "__main__":
#     app.run(debug=True, port=5001)

import os
import numpy as np
import pandas as pd
import joblib
import logging
from typing import Dict, Any

# Machine Learning Libraries
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.multioutput import MultiOutputClassifier
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer

# Web Framework
from flask import Flask, request, jsonify
from flask_cors import CORS

# Logging Configuration
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger(__name__)


class GeneticRiskPredictor:
    def __init__(self, dataset_path: str):
        self.dataset_path = dataset_path
        self.model_path = 'genetic_risk_model.pkl'
        self.encoders_path = 'label_encoders.pkl'

        self.label_encoders: Dict[str, LabelEncoder] = {}
        self.model = None

        self._initialize_model()

    def _initialize_model(self):
        try:
            if os.path.exists(self.model_path) and os.path.exists(self.encoders_path):
                self._load_existing_model()
            else:
                self._train_new_model()
        except Exception as e:
            logger.error(f"Model initialization error: {e}")
            raise

    def _load_existing_model(self):
        try:
            self.model = joblib.load(self.model_path)
            self.label_encoders = joblib.load(self.encoders_path)
            logger.info("Existing model loaded successfully")
        except Exception as e:
            logger.warning(f"Failed to load existing model: {e}")
            self._train_new_model()

    def _train_new_model(self):
        try:
            # Load Dataset
            df = pd.read_csv(self.dataset_path)

            # Categorical Columns for Encoding
            categorical_columns = [
                "Gene", "SNP", "Genotype",
                "Risk Associated Condition",
                "Risk Level",
                "Emergency Medicine",
                "Guidelines"
            ]

            # Encode Categorical Variables
            for col in categorical_columns:
                le = LabelEncoder()
                df[col] = le.fit_transform(df[col].astype(str))
                self.label_encoders[col] = le

            # Features and Targets
            X = df[["Gene", "SNP", "Chromosome", "Position", "Genotype"]]
            y = df[["Risk Associated Condition", "Risk Level", "Emergency Medicine", "Guidelines"]]

            # Preprocessing Pipeline
            preprocessor = ColumnTransformer(
                transformers=[
                    ('num', Pipeline([
                        ('imputer', SimpleImputer(strategy='median')),
                        ('scaler', StandardScaler())
                    ]), ['Chromosome', 'Position']),
                    ('cat', Pipeline([
                        ('imputer', SimpleImputer(strategy='constant', fill_value=0))
                    ]), ['Gene', 'SNP', 'Genotype'])
                ])

            # Model Pipeline
            model_pipeline = Pipeline([
                ('preprocessor', preprocessor),
                ('classifier', MultiOutputClassifier(
                    RandomForestClassifier(
                        n_estimators=300,
                        max_depth=25,
                        min_samples_split=5,
                        n_jobs=-1
                    )
                ))
            ])

            # Train-Test Split
            X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

            # Fit Model
            model_pipeline.fit(X_train, y_train)
            self.model = model_pipeline

            # Save Model and Encoders
            joblib.dump(self.model, self.model_path)
            joblib.dump(self.label_encoders, self.encoders_path)

            logger.info("New model trained and saved successfully")

        except Exception as e:
            logger.error(f"Model training failed: {e}")
            raise

    def predict(self, gene_code: str, chromosome: int) -> Dict[str, str]:
        try:
            # Validate Input
            if gene_code not in self.label_encoders["Gene"].classes_:
                raise ValueError(f"Invalid gene code: {gene_code}")

            gene_encoded = self.label_encoders["Gene"].transform([gene_code])[0]

            # Prepare Input Data
            input_data = pd.DataFrame([
                [gene_encoded, 0, chromosome, 0, 0]
            ], columns=["Gene", "SNP", "Chromosome", "Position", "Genotype"])

            # Predict
            predictions = self.model.predict(input_data)[0]

            # Decode Predictions
            result = {
                "riskCondition": self.label_encoders["Risk Associated Condition"].inverse_transform([predictions[0]])[
                    0],
                "riskLevel": self.label_encoders["Risk Level"].inverse_transform([predictions[1]])[0],
                "emergencyMedicine": self.label_encoders["Emergency Medicine"].inverse_transform([predictions[2]])[0],
                "guidelines": self.label_encoders["Guidelines"].inverse_transform([predictions[3]])[0]
            }


            return result

        except Exception as e:
            logger.error(f"Prediction error: {e}")
            raise


def create_app(dataset_path: str) -> Flask:
    app = Flask(__name__)
    CORS(app, origins=["http://localhost:5173"])

    # Global Predictor
    predictor = GeneticRiskPredictor(dataset_path)

    @app.route("/predict", methods=["POST"])
    def predict_endpoint():
        try:
            data = request.get_json()
            gene_code = data.get("gene_code")
            chromosome = int(data.get("number_of_chromosomes"))

            result = predictor.predict(gene_code, chromosome)
            return jsonify({"data": result})

        except ValueError as ve:
            return jsonify({"error": str(ve)}), 400
        except Exception as e:
            logger.error(f"Unexpected error: {e}")
            return jsonify({"error": "Unexpected server error"}), 500

    return app


def main():
    dataset_path = "genetic_health_risk_assessment_updated.csv"
    app = create_app(dataset_path)
    app.run(debug=False, port=5001)


if __name__ == "__main__":
    main()