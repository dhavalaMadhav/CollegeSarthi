const Lead = require('../models/Lead');
const University = require('../models/University');
const { sendLeadNotificationToCA, sendConfirmationToStudent } = require('../utils/emailService');
const { sendWhatsAppToCA } = require('../utils/whatsappService');

// Create new lead from contact form
const createLead = async (req, res) => {
    try {
        const { studentName, email, phone, city, stream, courseInterested, notes, source } = req.body;

        // Create lead
        const lead = new Lead({
            studentName,
            email,
            phone,
            city,
            stream,
            courseInterested,
            notes,
            source: source || 'contact_form'
        });

        await lead.save();

        // Prepare data for notifications
        const leadData = {
            studentName,
            email,
            phone,
            city,
            stream,
            courseInterested,
            notes,
            source: source || 'contact_form'
        };

        // Send notifications (don't wait for them)
        sendLeadNotificationToCA(leadData).catch(err => console.error('Email error:', err));
        sendWhatsAppToCA(leadData).catch(err => console.error('WhatsApp error:', err));
        sendConfirmationToStudent(leadData).catch(err => console.error('Confirmation error:', err));

        res.json({
            success: true,
            message: 'Your request has been submitted successfully. Our guidance team will contact you shortly.'
        });

    } catch (error) {
        console.error('Error creating lead:', error);
        res.status(500).json({
            success: false,
            message: 'Error submitting your request. Please try again.'
        });
    }
};

// Create lead from quiz with recommendations
const createLeadFromQuiz = async (req, res) => {
    try {
        const { studentName, email, phone, city, stream, quizScore, recommendedUniversities } = req.body;

        // Get university details
        const universities = await University.find({
            '_id': { $in: recommendedUniversities.map(r => r.universityId) }
        });

        const lead = new Lead({
            studentName,
            email,
            phone,
            city,
            stream,
            quizScore,
            recommendedUniversities: recommendedUniversities,
            source: 'quiz'
        });

        await lead.save();

        // Prepare notification data
        const leadData = {
            studentName,
            email,
            phone,
            city,
            stream,
            quizScore,
            recommendedUniversities: universities.map(uni => {
                const match = recommendedUniversities.find(r => r.universityId.toString() === uni._id.toString());
                return {
                    name: uni.name,
                    matchPercentage: match.matchPercentage
                };
            }),
            source: 'quiz'
        };

        // Send notifications
        sendLeadNotificationToCA(leadData).catch(err => console.error('Email error:', err));
        sendWhatsAppToCA(leadData).catch(err => console.error('WhatsApp error:', err));
        sendConfirmationToStudent(leadData).catch(err => console.error('Confirmation error:', err));

        res.json({
            success: true,
            message: 'Thank you! Our counselling team will contact you soon with detailed guidance.'
        });

    } catch (error) {
        console.error('Error creating quiz lead:', error);
        res.status(500).json({
            success: false,
            message: 'Error submitting your information.'
        });
    }
};

module.exports = {
    createLead,
    createLeadFromQuiz
};
