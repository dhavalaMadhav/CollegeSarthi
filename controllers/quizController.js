const University = require('../models/University');
const Lead = require('../models/Lead');

// Recommendation Algorithm
const calculateRecommendations = async (stream, answers, scores) => {
    try {
        // Get all universities for the stream
        const universities = await University.find({ 
            streams: stream 
        });

        const recommendations = [];

        for (const university of universities) {
            let matchScore = 0;
            let maxPossibleScore = 0;

            // Calculate match based on university weights and user scores
            const weights = university.weights;

            // Stream match (most important - 40% weight)
            if (weights[stream]) {
                matchScore += weights[stream] * 0.4 * (scores[stream] || 50);
                maxPossibleScore += weights[stream] * 0.4 * 100;
            }

            // Budget match (20% weight)
            if (scores.budget) {
                const budgetMatch = weights.budget === scores.budget ? 100 : 50;
                matchScore += budgetMatch * 0.2;
                maxPossibleScore += 100 * 0.2;
            }

            // Research orientation (20% weight)
            if (scores.research !== undefined && weights.research) {
                matchScore += weights.research * 0.2 * scores.research;
                maxPossibleScore += weights.research * 0.2 * 100;
            }

            // Practical orientation (20% weight)
            if (scores.practical !== undefined && weights.practical) {
                matchScore += weights.practical * 0.2 * scores.practical;
                maxPossibleScore += weights.practical * 0.2 * 100;
            }

            // Calculate final percentage
            const matchPercentage = maxPossibleScore > 0 
                ? Math.round((matchScore / maxPossibleScore) * 100) 
                : 0;

            recommendations.push({
                university: university,
                matchPercentage: Math.min(matchPercentage, 100)
            });
        }

        // Sort by match percentage
        recommendations.sort((a, b) => b.matchPercentage - a.matchPercentage);

        // Return top 3
        return recommendations.slice(0, 3);
    } catch (error) {
        console.error('Error calculating recommendations:', error);
        return [];
    }
};

// Process quiz results
const processQuizResults = async (req, res) => {
    try {
        const { stream, answers, studentInfo } = req.body;

        // Calculate scores from answers
        let scores = {
            [stream]: 0,
            budget: 'medium',
            research: 0,
            practical: 0
        };

        let totalScore = 0;

        // Process each answer
        answers.forEach((answer, index) => {
            if (answer.weights) {
                // Add weights to respective categories
                for (const [key, value] of Object.entries(answer.weights)) {
                    if (key === 'budget') {
                        scores.budget = value;
                    } else if (typeof scores[key] === 'number') {
                        scores[key] += value;
                    }
                }
            }
            totalScore += answer.score || 0;
        });

        // Normalize scores to 0-100 range
        const maxStreamScore = answers.length * 3; // Assuming max 3 points per question
        scores[stream] = Math.round((scores[stream] / maxStreamScore) * 100);
        scores.research = Math.min(Math.round((scores.research / maxStreamScore) * 100), 100);
        scores.practical = Math.min(Math.round((scores.practical / maxStreamScore) * 100), 100);

        // Get recommendations
        const recommendations = await calculateRecommendations(stream, answers, scores);

        // Calculate overall quiz score
        const quizScore = Math.round((totalScore / (answers.length * 3)) * 100);

        // Save lead if student info provided
        if (studentInfo && studentInfo.email) {
            const lead = new Lead({
                studentName: studentInfo.name,
                email: studentInfo.email,
                phone: studentInfo.phone,
                city: studentInfo.city,
                stream: stream,
                quizScore: quizScore,
                quizAnswers: answers,
                recommendedUniversities: recommendations.map(r => ({
                    universityId: r.university._id,
                    matchPercentage: r.matchPercentage
                })),
                source: 'quiz'
            });

            await lead.save();
        }

        res.json({
            success: true,
            quizScore: quizScore,
            recommendations: recommendations.map(r => ({
                id: r.university._id,
                name: r.university.name,
                location: r.university.location,
                ranking: r.university.ranking,
                image: r.university.bannerImage,
                matchPercentage: r.matchPercentage
            }))
        });

    } catch (error) {
        console.error('Error processing quiz:', error);
        res.status(500).json({
            success: false,
            message: 'Error processing quiz results'
        });
    }
};

module.exports = {
    processQuizResults,
    calculateRecommendations
};
