const Testimonial = require('../models/testimonialModel')
const mongoose = require('mongoose')

//get all testimonials
const getTestimonials =async (req,res) =>{
    const testimonials = await Testimonial.find({}).sort({createdAt: -1});

    res.status(200).json(testimonials);
}
//get a single testimonial
const getTestimonial =async (req,res) =>{
    const {id} = req.params;


    //check if the id is valid
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error:"No such testimonial"});
    }
    const testimonial = await Testimonial.findById(id);

    if(!testimonial)
    {
        return res.status(404).json({error:"no such testimonial"});
    }

    res.status(200).json(testimonial);
}

//create a testimonial
const createTestimonial = async (req,res) =>{
    const {testimony,companyName,publish,user_id} = req.body

    let emptyFields = []

    if(!testimony)
    {
        emptyFields.push('testimony');
    }
    if(!companyName)
    {
            emptyFields.push('companyName');
    }

    if(emptyFields.length>0)
    {
        return res.status(400).json({error:'Please fill in all the required fields',emptyFields})
    }
    try {
        const testimonial = await Testimonial.create({testimony,companyName,publish,user_id});
        res.status(200).json(testimonial);

    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

//delete a testimonial
const deleteTestimonial = async (req,res) =>{
    const {id} = req.params;


    //check if the id is valid
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error:"No such testimonial"});
    }
    const testimonial = await Testimonial.findOneAndDelete({_id:id});
    if(!testimonial)
    {
        return res.status(404).json({error:"No such testimonial"});
    }
    res.status(200).json(testimonial)

}


//update a testimonial
const updateTestimonial = async (req,res) =>{
    const {id} = req.params;

    //check if the id is valid
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error:"No such testimonial"});
    }
    const testimonial = await Testimonial.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if(!testimonial)
    {
            return res.status(404).json({error:"No such testimonial"});
    }
    res.status(200).json(testimonial)

}

module.exports = {
    getTestimonial,
    getTestimonials,
    createTestimonial,
    deleteTestimonial,
    updateTestimonial
}

