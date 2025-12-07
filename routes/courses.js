const express = require('express');
const router = express.Router();
const University = require('../models/University'); // Add this import

// Course data with programme mapping
const coursesData = {
    engineering: [
        {
            name: 'Computer Science Engineering',
            slug: 'computer-science',
            programmeType: 'computer', // Maps to university.programmes
            description: 'Learn programming, algorithms, data structures, AI, and software development',
            fullDescription: 'Computer Science Engineering is one of the most sought-after programs that combines theoretical computer science with practical engineering. Students learn programming languages, data structures, algorithms, artificial intelligence, machine learning, web development, mobile app development, database management, and software engineering principles. The curriculum includes hands-on projects, internships, and industry collaborations to prepare students for careers in technology.',
            icon: 'fas fa-laptop-code',
            duration: '4 Years',
            degree: 'B.Tech/BE',
            eligibility: '10+2 with Physics, Chemistry, Mathematics (Min 60%)',
            averageFees: '₹2-8 Lakhs per year',
            careerOptions: ['Software Developer', 'Data Scientist', 'AI Engineer', 'Full Stack Developer', 'Cloud Architect', 'Cybersecurity Analyst'],
            topRecruiters: ['Google', 'Microsoft', 'Amazon', 'TCS', 'Infosys', 'Wipro'],
            skills: ['Programming', 'Problem Solving', 'Data Structures', 'Algorithms', 'Web Development', 'Database Management']
        },
        {
            name: 'Mechanical Engineering',
            slug: 'mechanical',
            programmeType: 'engineering',
            description: 'Study mechanics, thermodynamics, robotics, and manufacturing processes',
            fullDescription: 'Mechanical Engineering deals with the design, analysis, manufacturing, and maintenance of mechanical systems. It is one of the oldest and broadest engineering disciplines covering areas like thermodynamics, fluid mechanics, materials science, structural analysis, and manufacturing processes.',
            icon: 'fas fa-cogs',
            duration: '4 Years',
            degree: 'B.Tech/BE',
            eligibility: '10+2 with Physics, Chemistry, Mathematics (Min 60%)',
            averageFees: '₹1.5-6 Lakhs per year',
            careerOptions: ['Mechanical Engineer', 'Automation Engineer', 'CAD Designer', 'Production Manager', 'Quality Control Engineer'],
            topRecruiters: ['Tata Motors', 'Mahindra', 'L&T', 'Bosch', 'Siemens'],
            skills: ['CAD', 'Thermodynamics', 'Manufacturing', 'Design', 'Analysis']
        },
        {
            name: 'Civil Engineering',
            slug: 'civil',
            programmeType: 'engineering',
            description: 'Design and build infrastructure including buildings, bridges, and roads',
            fullDescription: 'Civil Engineering involves the design, construction, and maintenance of physical infrastructure including roads, bridges, dams, and buildings. Students learn structural analysis, geotechnical engineering, transportation engineering, and environmental engineering.',
            icon: 'fas fa-hard-hat',
            duration: '4 Years',
            degree: 'B.Tech/BE',
            eligibility: '10+2 with Physics, Chemistry, Mathematics (Min 60%)',
            averageFees: '₹1-5 Lakhs per year',
            careerOptions: ['Civil Engineer', 'Structural Engineer', 'Construction Manager', 'Urban Planner'],
            topRecruiters: ['L&T', 'Shapoorji Pallonji', 'DLF', 'PWD'],
            skills: ['AutoCAD', 'Structural Design', 'Project Management', 'Site Planning']
        }
    ],
    medical: [
        {
            name: 'Bachelor of Medicine (MBBS)',
            slug: 'mbbs',
            programmeType: 'medical',
            description: 'Comprehensive medical education to become a qualified doctor',
            fullDescription: 'MBBS is the undergraduate medical degree for becoming a doctor. It covers anatomy, physiology, biochemistry, pharmacology, pathology, and clinical practice with extensive hospital training and patient interaction.',
            icon: 'fas fa-stethoscope',
            duration: '5.5 Years',
            degree: 'MBBS',
            eligibility: 'NEET qualification with Physics, Chemistry, Biology (Min 50%)',
            averageFees: '₹5-25 Lakhs per year',
            careerOptions: ['General Physician', 'Surgeon', 'Medical Officer', 'Specialist Doctor', 'Medical Researcher'],
            topRecruiters: ['AIIMS', 'Apollo Hospitals', 'Fortis Healthcare', 'Max Healthcare'],
            skills: ['Patient Care', 'Diagnosis', 'Medical Knowledge', 'Clinical Skills', 'Emergency Care']
        },
        {
            name: 'Bachelor of Dental Surgery',
            slug: 'bds',
            programmeType: 'dental',
            description: 'Study dentistry, oral health, and dental surgery procedures',
            fullDescription: 'BDS is an undergraduate dental program focusing on oral health, dental diseases, and surgical procedures. Students learn dental anatomy, oral pathology, periodontology, and clinical dentistry.',
            icon: 'fas fa-tooth',
            duration: '5 Years',
            degree: 'BDS',
            eligibility: 'NEET qualification with Physics, Chemistry, Biology',
            averageFees: '₹3-15 Lakhs per year',
            careerOptions: ['Dentist', 'Orthodontist', 'Oral Surgeon', 'Dental Consultant'],
            topRecruiters: ['Dental Clinics', 'Hospitals', 'Private Practice'],
            skills: ['Dental Procedures', 'Patient Care', 'Oral Surgery', 'Diagnosis']
        },
        {
            name: 'Bachelor of Pharmacy',
            slug: 'pharmacy',
            programmeType: 'pharmacy',
            description: 'Learn pharmaceutical sciences, drug development, and patient care',
            fullDescription: 'B.Pharm focuses on pharmaceutical sciences, drug formulation, pharmacology, and medicinal chemistry. Students learn about drug manufacturing, quality control, and pharmaceutical marketing.',
            icon: 'fas fa-pills',
            duration: '4 Years',
            degree: 'B.Pharm',
            eligibility: '10+2 with Physics, Chemistry, Biology/Mathematics',
            averageFees: '₹1-4 Lakhs per year',
            careerOptions: ['Pharmacist', 'Drug Inspector', 'Medical Representative', 'Research Scientist'],
            topRecruiters: ['Cipla', 'Sun Pharma', 'Dr. Reddy\'s', 'Lupin'],
            skills: ['Pharmaceutical Knowledge', 'Drug Formulation', 'Quality Control', 'Research']
        }
    ],
    management: [
        {
            name: 'Bachelor of Business Administration',
            slug: 'bba',
            programmeType: 'management',
            description: 'Business fundamentals, management principles, and entrepreneurship',
            fullDescription: 'BBA provides foundation in business management, covering marketing, finance, human resources, and operations. Students develop leadership skills and business acumen.',
            icon: 'fas fa-briefcase',
            duration: '3 Years',
            degree: 'BBA',
            eligibility: '10+2 from any stream (Min 50%)',
            averageFees: '₹1-5 Lakhs per year',
            careerOptions: ['Business Analyst', 'Marketing Manager', 'HR Manager', 'Entrepreneur'],
            topRecruiters: ['Deloitte', 'KPMG', 'Amazon', 'Flipkart'],
            skills: ['Leadership', 'Business Strategy', 'Communication', 'Analytics']
        },
        {
            name: 'Master of Business Administration',
            slug: 'mba',
            programmeType: 'management',
            description: 'Advanced management, leadership, strategy, and business analytics',
            fullDescription: 'MBA is a postgraduate program focusing on advanced business management, leadership, and strategic thinking. Specializations include finance, marketing, HR, operations, and consulting.',
            icon: 'fas fa-chart-line',
            duration: '2 Years',
            degree: 'MBA',
            eligibility: 'Graduation in any discipline + CAT/MAT/XAT',
            averageFees: '₹5-25 Lakhs per year',
            careerOptions: ['Management Consultant', 'Business Development Manager', 'Product Manager', 'Investment Banker'],
            topRecruiters: ['McKinsey', 'BCG', 'Bain', 'Goldman Sachs'],
            skills: ['Strategic Thinking', 'Leadership', 'Financial Analysis', 'Consulting']
        }
    ],
    science: [
        {
            name: 'Data Science',
            slug: 'data-science',
            programmeType: 'computer',
            description: 'Analytics, machine learning, statistics, and big data technologies',
            fullDescription: 'Data Science combines statistics, programming, and domain knowledge to extract insights from data using machine learning and analytics. Students learn Python, R, SQL, and various ML frameworks.',
            icon: 'fas fa-database',
            duration: '3 Years',
            degree: 'BSc',
            eligibility: '10+2 with Mathematics',
            averageFees: '₹1-5 Lakhs per year',
            careerOptions: ['Data Scientist', 'Data Analyst', 'ML Engineer', 'Business Analyst'],
            topRecruiters: ['Google', 'Amazon', 'Flipkart', 'Microsoft'],
            skills: ['Python', 'Machine Learning', 'Statistics', 'Data Visualization']
        }
    ],
    commerce: [
        {
            name: 'Bachelor of Commerce',
            slug: 'bcom',
            programmeType: 'commerce',
            description: 'Accounting, finance, taxation, and business economics',
            fullDescription: 'B.Com provides comprehensive knowledge of accounting, taxation, business law, and financial management. Students learn about financial statements, auditing, and business operations.',
            icon: 'fas fa-calculator',
            duration: '3 Years',
            degree: 'B.Com',
            eligibility: '10+2 with Commerce (preferred)',
            averageFees: '₹20,000-2 Lakhs per year',
            careerOptions: ['Accountant', 'Tax Consultant', 'Financial Analyst', 'Auditor'],
            topRecruiters: ['Big 4 Firms', 'Banks', 'Financial Institutions'],
            skills: ['Accounting', 'Taxation', 'Financial Analysis', 'Auditing']
        }
    ],
    arts: [
        {
            name: 'Bachelor of Arts',
            slug: 'ba',
            programmeType: 'arts',
            description: 'Literature, history, sociology, psychology, and philosophy',
            fullDescription: 'BA offers diverse specializations in humanities including literature, history, political science, sociology, and psychology. Students develop critical thinking and analytical skills.',
            icon: 'fas fa-book',
            duration: '3 Years',
            degree: 'BA',
            eligibility: '10+2 from any stream',
            averageFees: '₹15,000-1.5 Lakhs per year',
            careerOptions: ['Civil Services', 'Content Writer', 'Teacher', 'Social Worker'],
            topRecruiters: ['Government', 'NGOs', 'Media Houses', 'Educational Institutions'],
            skills: ['Critical Thinking', 'Writing', 'Research', 'Communication']
        },
        {
            name: 'Law (LLB)',
            slug: 'law',
            programmeType: 'law',
            description: 'Legal studies, constitutional law, and legal practice',
            fullDescription: 'LLB provides comprehensive legal education covering constitutional law, criminal law, corporate law, and legal procedures. Students learn legal research, argumentation, and courtroom procedures.',
            icon: 'fas fa-gavel',
            duration: '3-5 Years',
            degree: 'LLB/BA-LLB',
            eligibility: '10+2 for BA-LLB or Graduation for LLB',
            averageFees: '₹1-5 Lakhs per year',
            careerOptions: ['Lawyer', 'Legal Advisor', 'Judge', 'Corporate Counsel'],
            topRecruiters: ['Law Firms', 'Corporate Legal Departments', 'Courts'],
            skills: ['Legal Research', 'Argumentation', 'Contract Drafting', 'Litigation']
        }
    ],
    design: [
        {
            name: 'Architecture',
            slug: 'architecture',
            programmeType: 'architecture',
            description: 'Building design, urban planning, and architectural engineering',
            fullDescription: 'Architecture combines art and science to design buildings and structures with focus on aesthetics, functionality, and sustainability. Students learn design principles, structural engineering, and urban planning.',
            icon: 'fas fa-building',
            duration: '5 Years',
            degree: 'B.Arch',
            eligibility: 'NATA qualification with 10+2 (Math mandatory)',
            averageFees: '₹2-8 Lakhs per year',
            careerOptions: ['Architect', 'Urban Planner', 'Interior Designer', 'Landscape Architect'],
            topRecruiters: ['Architecture Firms', 'Construction Companies', 'Government'],
            skills: ['Design', 'AutoCAD', 'Revit', '3D Modeling', 'Urban Planning']
        },
        {
            name: 'Fashion Design',
            slug: 'fashion-design',
            programmeType: 'design',
            description: 'Clothing design, textiles, fashion merchandising, and styling',
            fullDescription: 'Fashion Design covers clothing design, textile science, fashion illustration, and garment manufacturing. Students learn about fashion trends, design software, and fashion business.',
            icon: 'fas fa-tshirt',
            duration: '3-4 Years',
            degree: 'BDes',
            eligibility: '10+2 from any stream',
            averageFees: '₹2-6 Lakhs per year',
            careerOptions: ['Fashion Designer', 'Stylist', 'Fashion Merchandiser', 'Textile Designer'],
            topRecruiters: ['Fashion Houses', 'Retail Brands', 'Design Studios'],
            skills: ['Design', 'Pattern Making', 'Textiles', 'Fashion Illustration']
        }
    ]
};

// GET /courses - Main courses listing page
router.get('/', async (req, res) => {
    try {
        const allCourses = [];
        Object.keys(coursesData).forEach(category => {
            coursesData[category].forEach(course => {
                allCourses.push({
                    ...course,
                    category: category,
                    categoryName: category.charAt(0).toUpperCase() + category.slice(1)
                });
            });
        });
        
        res.render('courses', { 
            courses: allCourses,
            title: 'Explore Courses - Unipick'
        });
    } catch (error) {
        console.error('Error loading courses:', error);
        res.status(500).send('Error loading courses: ' + error.message);
    }
});

// GET /courses/:category - Display courses by category
router.get('/:category', async (req, res) => {
    try {
        const category = req.params.category.toLowerCase();
        
        if (!coursesData[category]) {
            return res.status(404).send('Category not found');
        }
        
        const courses = coursesData[category].map(course => ({
            ...course,
            category: category,
            categoryName: category.charAt(0).toUpperCase() + category.slice(1)
        }));
        
        res.render('courses', { 
            courses: courses,
            title: `${category.charAt(0).toUpperCase() + category.slice(1)} Courses - Unipick`
        });
    } catch (error) {
        console.error('Error loading category:', error);
        res.status(500).send('Error loading category');
    }
});

// GET /courses/:category/:slug - Display individual course details
// GET /courses/:category/:slug - Display individual course details
router.get('/:category/:slug', async (req, res) => {
    try {
        const category = req.params.category.toLowerCase();
        const slug = req.params.slug.toLowerCase();
        
        if (!coursesData[category]) {
            return res.status(404).send('Category not found');
        }
        
        const course = coursesData[category].find(c => c.slug === slug);
        
        if (!course) {
            return res.status(404).send('Course not found');
        }
        
        // Fetch ONLY FEATURED universities offering this course
        const universities = await University.find({
            programmes: course.programmeType,
            featured: true  // ADD THIS LINE - Only fetch featured universities
        })
        .sort({ rating: -1 })
        .limit(12);
        
        res.render('course-detail', { 
            course: course,
            category: category,
            categoryName: category.charAt(0).toUpperCase() + category.slice(1),
            universities: universities,
            title: `${course.name} - Unipick`
        });
    } catch (error) {
        console.error('Error loading course:', error);
        res.status(500).send('Error loading course');
    }
});


module.exports = router;
