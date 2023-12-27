const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");



// createCourse handler function

exports.createCourse = async (req, res) =>  {

    try {

        // fetch all data from creating the course
        const {courseName, courseDescription, whatYouWillLearn, price, CategoryId} = req.body;

        // get thumbnail using req.files.fileName
        const thumbnail = req.files.thumbnailName;
        console.log(courseName, courseDescription, whatYouWillLearn, price, CategoryId)
        

        // Validation for all data 
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !CategoryId || !thumbnail){
            // (courseName && courseDescription && whatYouWillLearn && price && CategoryId && thumbnail)
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

        // check given Category is valid or not 
        // console.log("Category ID: ", CategoryId);
        const CategoryDetails = await Category.findById(CategoryId);
        if(!CategoryDetails){
            return res.status(404).json({
                success: false,
                message: "Category Details not found",
            });
        }
        // console.log("Category ID: ", Category);

        // Uplaod Image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        // create an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDtails._id,
            whatYouWillLearn,
            price,
            Category: CategoryDetails._id,
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

        // update the Category ka schema 

        await Category.findByIdAndUpdate(
            {_id: CategoryDetails._id},
            {
                $push: {
                    coures: newCourse._id,
                }
            },
            { new: true }
        );

        // return response 
        return res.status(200).json({
            success: true,
            message: "Course Created successfully",
            newCourse
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

exports.getAllCourses = async (req, res) => {

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



// getCourseDetails

exports.getCourseDetails = async(req, res) => {
    try {

        // get id 
        const {courseId} = req.body;

        // get course full details
        const courseDetail = await Course.find(

            {_id: courseId},

        )
        .populate(
            {
                path:"instructor",
                populate:{
                    path:"additionalDetails",
                }
            }
        )
        .populate("category")
        // .populate("ratingAndreviews")
        .populate(
            {
                path:"courseContent",
                populate:{
                    path:"subSection",
                }
            }
        )
        .exec();

        // validation
        if(!courseDetail){
            return res.stastu(400).json({
                success: false,
                message: `Could Not Faild The Course With ${courseId}`,
            })
        }

        // return response
        return res.status(200).json({
            success: true,
            message: "Course Details Fetched Successfully",
            data: courseDetail,
        })
        
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
        
    }
}

