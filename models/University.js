const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    established: {
        type: Number,
        required: true
    },
    description: String,
    bannerImage: String,
    logo: String,
    type: {
        type: String,
        enum: ['Private', 'Government', 'Deemed'],
        default: 'Private'
    },
    accreditation: String,
    ranking: String,
    website: String,
    students: String,
    faculty: String,
    campusSize: String,
    feeRange: String,
    fee: Number,
    
    // New fields for card display
    globalRanking: Number,
    mastersPrograms: Number,
    scholarships: Number,
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.0,
        min: 0,
        max: 5
    },
    programmes: [{
        type: String,
        enum: [
            'engineering',
            'management',
            'computer',
            'law',
            'medical',
            'sciences',
            'arts',
            'architecture',
            'pharmacy',
            'design',
            'education',
            'commerce'
        ]
    }],
    
    // Programs as array of objects
// In models/University.js, update the programmes enum:
programmes: [{
    type: String,
    enum: [
        'engineering',
        'management',
        'computer',
        'law',
        'medical',
        'sciences',
        'arts',
        'architecture',
        'pharmacy',
        'design',
        'education',
        'commerce',
        'dental'  // ADD THIS LINE
    ]
}],
    
    // Facilities as array of strings
    facilities: [String],
    
    // Placements as object
    placements: {
        percentage: Number,
        averagePackage: String,
        highestPackage: String,
        topRecruiters: [String]
    },
    
    // Admission process as array of strings
    admissionProcess: [String],
    
    // Contact info as object
    contactInfo: {
        phone: String,
        email: String,
        address: String
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    },
    
    // In your university model, add coordinates field:
    coordinates: {
        lat: Number,
        lng: Number
    },
    address: String
});

module.exports = mongoose.model('University', universitySchema);