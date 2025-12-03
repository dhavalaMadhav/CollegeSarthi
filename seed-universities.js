require('dotenv').config();
const mongoose = require('mongoose');
const University = require('./models/University');

mongoose.connect(process.env.MONGODB_URI);

const universities = [
    {
        name: "Swaminarayan University",
        location: "Kalol, Gujarat",
        established: 2017,
        description: "A leading private university offering diverse programs in Engineering, Management, Pharmacy, and more with strong industry connections.",
        bannerImage: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1920&q=80",
        logo: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=200&q=80",
        type: "Private",
        accreditation: "NAAC A+ | UGC Approved",
        ranking: "NIRF Rank: 150-200",
        website: "https://swaminarayanuniversity.ac.in",
        students: "5000+",
        faculty: "200+",
        campusSize: "50 acres",
        feeRange: "₹1.5 - 3.5 LPA",
        programs: [
            {
                name: "B.Tech Computer Science",
                duration: "4 years",
                eligibility: "12th PCM with 60%+",
                fees: "₹3,50,000",
                seats: 120
            },
            {
                name: "MBA",
                duration: "2 years",
                eligibility: "Graduation with 50%+",
                fees: "₹4,00,000",
                seats: 60
            },
            {
                name: "B.Pharmacy",
                duration: "4 years",
                eligibility: "12th PCB/PCM with 60%+",
                fees: "₹2,50,000",
                seats: 60
            }
        ],
        facilities: [
            "Modern Library with 50,000+ books",
            "State-of-the-art Computer Labs",
            "Sports Complex & Gymnasium",
            "Separate Boys & Girls Hostels",
            "24/7 Medical Facility",
            "Wi-Fi Enabled Campus",
            "Cafeteria & Food Court",
            "Auditorium (1000+ capacity)"
        ],
        placements: {
            percentage: 92,
            averagePackage: "₹4.5 LPA",
            highestPackage: "₹18 LPA",
            topRecruiters: ["TCS", "Infosys", "Wipro", "Capgemini", "Cognizant", "Amazon"]
        },
        admissionProcess: [
            "Fill online application form",
            "Submit required documents",
            "Entrance test (if applicable)",
            "Personal interview",
            "Final admission & fee payment"
        ],
        contactInfo: {
            phone: "+91-2764-286444",
            email: "admission@swaminarayanuniversity.ac.in",
            address: "Swaminarayan University, Kalol-Gandhinagar Highway, Kalol - 382721, Gujarat"
        }
    },
    {
        name: "Ganpat University",
        location: "Mehsana, Gujarat",
        established: 2005,
        description: "Premier university with focus on Engineering, Pharmacy, Management, and Dental Sciences. Known for excellent placement records.",
        bannerImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80",
        logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=200&q=80",
        type: "Private",
        accreditation: "NAAC A | UGC Approved",
        ranking: "NIRF Rank: 100-150",
        website: "https://ganpatuniversity.ac.in",
        students: "8000+",
        faculty: "350+",
        campusSize: "300 acres",
        feeRange: "₹1.8 - 4 LPA",
        programs: [
            {
                name: "B.Tech Mechanical Engineering",
                duration: "4 years",
                eligibility: "12th PCM with 60%+",
                fees: "₹3,20,000",
                seats: 180
            },
            {
                name: "BBA",
                duration: "3 years",
                eligibility: "12th any stream with 50%+",
                fees: "₹2,10,000",
                seats: 120
            },
            {
                name: "BDS (Dental)",
                duration: "5 years",
                eligibility: "12th PCB with 60%+ & NEET",
                fees: "₹15,00,000",
                seats: 100
            }
        ],
        facilities: [
            "Digital Library & E-Resources",
            "Advanced Engineering Labs",
            "Dental Hospital & Clinic",
            "Olympic Size Swimming Pool",
            "Indoor Sports Stadium",
            "AC Hostels with Modern Amenities",
            "Entrepreneurship Development Cell",
            "International Student Exchange Programs"
        ],
        placements: {
            percentage: 88,
            averagePackage: "₹4.2 LPA",
            highestPackage: "₹22 LPA",
            topRecruiters: ["L&T", "Reliance", "Adani", "Sun Pharma", "Cipla", "Torrent"]
        },
        admissionProcess: [
            "Online registration",
            "Document verification",
            "Entrance exam/Merit-based",
            "Counselling session",
            "Admission confirmation"
        ],
        contactInfo: {
            phone: "+91-2762-286080",
            email: "info@ganpatuniversity.ac.in",
            address: "Ganpat Vidyanagar, Mehsana-Gozaria Highway, Kherva - 384012, Gujarat"
        }
    },
    {
        name: "Nirma University",
        location: "Ahmedabad, Gujarat",
        established: 2003,
        description: "One of Gujarat's top private universities offering world-class education in Engineering, Law, Management, and Sciences.",
        bannerImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80",
        logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=200&q=80",
        type: "Private",
        accreditation: "NAAC A++ | UGC Approved | NBA Accredited",
        ranking: "NIRF Rank: 60-80",
        website: "https://nirmauni.ac.in",
        students: "10,000+",
        faculty: "500+",
        campusSize: "120 acres",
        feeRange: "₹4 - 8 LPA",
        programs: [
            {
                name: "B.Tech Computer Science & Engineering",
                duration: "4 years",
                eligibility: "12th PCM with 70%+ & JEE Main",
                fees: "₹7,20,000",
                seats: 240
            },
            {
                name: "MBA",
                duration: "2 years",
                eligibility: "Graduation with 50%+ & CAT/MAT",
                fees: "₹8,40,000",
                seats: 180
            },
            {
                name: "B.A. LL.B (Hons.)",
                duration: "5 years",
                eligibility: "12th with 50%+ & CLAT",
                fees: "₹6,00,000",
                seats: 120
            }
        ],
        facilities: [
            "World-class Infrastructure",
            "Research Centers & Innovation Labs",
            "International Collaborations",
            "Moot Court for Law Students",
            "Business Incubation Center",
            "Premium Hostel Facilities",
            "Health & Wellness Center",
            "Conference & Convention Center"
        ],
        placements: {
            percentage: 95,
            averagePackage: "₹7.5 LPA",
            highestPackage: "₹45 LPA",
            topRecruiters: ["Microsoft", "Amazon", "Goldman Sachs", "Deloitte", "KPMG", "Google"]
        },
        admissionProcess: [
            "Apply online with entrance scores",
            "Shortlisting based on merit",
            "Group Discussion & Interview",
            "Final merit list",
            "Admission & fee payment"
        ],
        contactInfo: {
            phone: "+91-79-71652000",
            email: "admission@nirmauni.ac.in",
            address: "Nirma University, Sarkhej-Gandhinagar Highway, Ahmedabad - 382481, Gujarat"
        }
    }
];

async function seedUniversities() {
    try {
        // Clear existing universities
        await University.deleteMany({});
        console.log('🗑️  Cleared existing universities');
        
        // Insert new universities
        const inserted = await University.insertMany(universities);
        
        console.log('✅ Universities seeded successfully!');
        console.log(`📊 Total universities added: ${inserted.length}`);
        console.log('\n📚 Universities:');
        inserted.forEach((uni, index) => {
            console.log(`${index + 1}. ${uni.name} - ${uni.location}`);
        });
        
        console.log('\n🌐 You can now access:');
        console.log('   - Universities page: http://localhost:3000/universities');
        console.log('   - Homepage: http://localhost:3000/');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding universities:', error);
        process.exit(1);
    }
}

seedUniversities();
