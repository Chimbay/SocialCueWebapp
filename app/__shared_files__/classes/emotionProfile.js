// To import, use -- import cam from "./emotionProfile.js"; --

class EmotionProfiles {
    #profiles = {
        happiness: {
            mouthSmileRight: 0.7892182916,
            mouthSmileLeft: 0.785819155,
            mouthUpperUpRight: 0.6961585969,
            mouthUpperUpLeft: 0.6667970479,
            mouthLowerDownRight: 0.4772540823,
            eyeSquintLeft: 0.3965499461
        }
    };
    #featureValues = null;

    calculateEmotionScores() {
        if (this.checkFeatureValues) {
            const emotionScores = {};
            // Iterate over emotion profiles
            for (const [emotion, profile] of Object.entries(this.#profiles)) {
                let score = 0;
                // Iterate over features and calculate weighted sum
                for (const [feature, weight] of Object.entries(profile)) {
                    if (feature in this.#featureValues) {
                        score += weight * this.#featureValues[feature];
                    }
                }
                emotionScores[emotion] = score;
            }
            return emotionScores;
        }
    }

    predictEmotions() {
        if (this.checkFeatureValues) {
            const emotionScores = this.calculateEmotionScores(this.#featureValues);
            // Find emotion with highest score
            let predictedEmotion = null;
            let maxScore = -Infinity;
            for (const [emotion, score] of Object.entries(emotionScores)) {
                if (score > maxScore) {
                    maxScore = score;
                    predictedEmotion = emotion;
                }
            }
            return predictedEmotion;
        }
    }

    setFeatureValues(featureValues) {
        this.#featureValues = featureValues
    }
    checkFeatureValues() {
        if (this.#featureValues == null) {
            console.log("ERROR: No feature values")
            return false;
        }
    }
    getFeatureValues() {
        return this.#featureValues;
    }
}