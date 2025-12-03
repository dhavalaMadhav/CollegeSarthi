const University = require('../models/University');

// Get all universities
const getAllUniversities = async (req, res) => {
    try {
        const universities = await University.find().sort({ ranking: 1 });
        res.json({
            success: true,
            universities
        });
    } catch (error) {
        console.error('Error fetching universities:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching universities'
        });
    }
};

// Get university by ID
const getUniversityById = async (req, res) => {
    try {
        const university = await University.findById(req.params.id);
        if (!university) {
            return res.status(404).json({
                success: false,
                message: 'University not found'
            });
        }
        res.json({
            success: true,
            university
        });
    } catch (error) {
        console.error('Error fetching university:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching university details'
        });
    }
};

module.exports = {
    getAllUniversities,
    getUniversityById
};
