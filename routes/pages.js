const express = require('express');
const router = express.Router();
const University = require('../models/University');
const Lead = require('../models/Lead');
const { authenticateToken, checkAuthenticated } = require('../middleware/auth');

// Homepage
router.get('/', async (req, res) => {
    try {
        const universities = await University.find().limit(5);
        const testimonials = [
            {
                name: "Rahul Sharma",
                university: "Global Tech University",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
                course: "B.Tech Computer Science",
                review: "The career guidance team helped me find the perfect university for my engineering dreams. Their personalized approach made all the difference!"
            },
            {
                name: "Priya Patel",
                university: "Imperial Business School",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
                course: "MBA Finance",
                review: "Thanks to this platform, I got admitted to my dream business school. The assessment quiz was incredibly accurate in understanding my goals."
            },
            {
                name: "Arjun Kumar",
                university: "National Medical Institute",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80",
                course: "MBBS",
                review: "The guidance office was extremely helpful throughout my admission process. Now I'm studying at one of India's top medical institutes!"
            },
            {
                name: "Sneha Reddy",
                university: "Creative Arts Academy",
                image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
                course: "B.Des Fashion Design",
                review: "I never thought finding the right design school would be so easy. The counsellors really understood my creative aspirations!"
            }
        ];
        
        res.render('index', { 
            universities,
            testimonials,
            title: 'EduPath - Your Career Guidance Partner'
        });
    } catch (error) {
        console.error('Error loading homepage:', error);
        res.status(500).send('Error loading page');
    }
});

// Quiz page
router.get('/quiz', (req, res) => {
    res.render('quiz', {
        title: 'Career Assessment Quiz - EduPath'
    });
});

// Quiz results page
router.get('/quiz-results', (req, res) => {
    res.render('quiz-results', {
        title: 'Your Career Guidance Results - EduPath'
    });
});

// Universities listing page
router.get('/universities', async (req, res) => {
    try {
        // Fetch all universities from database
        const universities = await University.find();
        
        console.log(`📚 Fetched ${universities.length} universities from database`);
        
        res.render('universities', {
            title: 'Universities - EduPath',
            universities: universities
        });
    } catch (error) {
        console.error('❌ Error fetching universities:', error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'Unable to load universities'
        });
    }
});


// University detail page
router.get('/university/:id', async (req, res) => {
    try {
        const university = await University.findById(req.params.id);
        
        if (!university) {
            return res.status(404).render('error', {
                title: 'Not Found',
                message: 'University not found'
            });
        }
        
        console.log('✅ Loaded university:', university.name);
        
        res.render('university-detail', {
            title: university.name,
            university: university
        });
    } catch (error) {
        console.error('❌ Error loading university:', error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'Error loading university details'
        });
    }
});

// Contact page
router.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact Us - EduPath'
    });
});

// Admin login page
router.get('/admin', checkAuthenticated, (req, res) => {
    res.render('admin/login', {
        title: 'Admin Login - EduPath',
        error: null
    });
});

// Admin dashboard (Protected with JWT)
router.get('/admin/dashboard', authenticateToken, async (req, res) => {
    try {
        const leads = await Lead.find()
            .populate('recommendedUniversities.universityId')
            .sort({ createdAt: -1 })
            .limit(50);
        
        const stats = {
            total: await Lead.countDocuments(),
            new: await Lead.countDocuments({ status: 'new' }),
            contacted: await Lead.countDocuments({ status: 'contacted' }),
            converted: await Lead.countDocuments({ status: 'converted' })
        };
        
        res.render('admin/dashboard', {
            title: 'Admin Dashboard - EduPath',
            leads,
            stats
        });
    } catch (error) {
        console.error('Error loading dashboard:', error);
        res.status(500).send('Error loading dashboard');
    }
});

// Admin logout
router.get('/admin/logout', (req, res) => {
    res.clearCookie('adminToken');
    res.redirect('/admin');
});


// University detail page
router.get('/university/:id', async (req, res) => {
    try {
        const university = await University.findById(req.params.id);
        
        if (!university) {
            return res.status(404).send('University not found');
        }
                
        res.render('university-detail', {
            title: university.name,
            university: university
        });
    } catch (error) {
        console.error('Error fetching university:', error);
        res.status(500).send('Error loading university');
    }
});

module.exports = router;
