const Course = require("../models/Course");
const Categeoty = require("../models/Categeoty");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");



// createCourse handler function

exports.createCourse = async (req, res) =>  {

    try {

        // fetch all data from creating the course
        const {courseName, courseDescription, whatYouWillLearn, price, Categeoty} = req.body;

        // get thumbnail using req.files.fileName
        const thumbnail = req.files.thumbnailName;

        // Validation for all data 
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !Categeoty || !thumbnail){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // check for instructor
        const userId = req.user.id;
        const instructorDtails = await User.findById(userId);
        // TODO: Verify that userId and instructorDtails._ are same or not ?

        console.log("Instructor Details: ",instructorDtails);
        if(!instructorDtails){
            return res.status(404).json({
                success: false,
                message: "Instructor Details not found",
            });
        }

        // check given Categeoty is valid or not 
        const CategeotyDetails = await Categeoty.findById(Categeoty);
        if(!CategeotyDetails){
            return res.status(404).json({
                success: false,
                message: "Categeoty Details not found",
            });
        }

        // Uplaod Image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        // create an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDtails._id,
            whatYouWillLearn,
            price,
            Categeoty: CategeotyDetails._id,
            thumbnail: thumbnailImage.secure_url,
        });

        // update the new course to the user schema of Instructor 
        await User.findByIdAndUpdate(
            {_id: instructorDtails._id},
            {
                $push:{
                    coures: newCourse._id,
                }
            },
            {new: true}
        );

        // update the Categeoty ka schema 

        await Categeoty.findByIdAndUpdate(
            {_id: CategeotyDetails._id},
            {
                $push: {
                    coures: newCourse._id,
                }
            }
        );

        // return response 
        return res.stastu(200).json({
            success: true,
            message: "Course Created successfully",
        });
        
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            success: false,
            message: "fail to create course",
            error: error.message,
        })
        
    }

}



// getAllCourses handler function

exports.showAllCourses = async (req, res) => {

    try {

        // TODO: change the below statement with testing 
        const allCourse = await Course.find({});
        
        return res.status(200).json({
            success: true,
            message: "Data for all courses fetched successfully",
            data: allCourse, 
        })
        
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Cannot fetch course data ",
            error: error.message,
        })
        
    }

}
