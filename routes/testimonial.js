const express = require('express');
const {

    createTestimonial,
    getTestimonial,
    getTestimonials,    
    deleteTestimonial,
    updateTestimonial
} = require('../controllers/testimonialController')

const router = express.Router();

router.get('/',getTestimonials)

router.get('/:id',getTestimonial)

router.post('/',createTestimonial)

router.delete('/:id',deleteTestimonial)
router.patch('/:id',updateTestimonial)

module.exports = router;