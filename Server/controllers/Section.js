const Section = require("../models/Section");
const Course = require("../models/Course");


// Handler function for Create the section 
exports.createSection = async (req, res) => {

    /**
     * Step: 1 --> data fetch
     * Step: 2 --> validation of data
     * Step: 3 --> create section
     * Step: 4 --> update course with sectin ObjectID
     * Step: 5 --> return res
     */

    try {

        // Step: 1 --> data fetch
        const {sectionName, courseId} = req.body;

        // Step: 2 --> validation of data
        if(!sectionName || !courseId){
            return res.status(400).json({
                success: false,
                message: "missing properties",
            });
        }

        // Step: 3 --> create section
        const newSection = await Section.create({sectionName});

        // Step: 4 --> update course with sectin ObjectID
        // HW: use populate to replace section or subSection both in updatedCouseDetails
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            {_id: courseId},
            {
                $push:{
                    courseContent: newSection._id,
                }
            }
        ).populate("Section").populate("SubSection").exec();

        // Step: 5 --> return res
        return res.status(200).json({
            success: true,
            message: "Section created successfully",
            updatedCourseDetails,
        });
        
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Unable to create Section, please try again",
            error: error.message,
        });
        
    }
}



// Handler function for update the section 

exports.updateSection = async (req, res) =>{

    /**
     * Step: 1 --> data fetch
     * Step: 2 --> validation of data
     * Step: 3 --> update the data
     * Step: 4 --> return res
     */

    try {

        // Step: 1 --> data fetch
        const {sectionName, sectionId} = req.body;

        // Step: 2 --> validation of data
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success: false,
                message: "missing properties",
            });
        }

        // Step: 3 --> update the data
        const section = await Section.findByIdAndUpdate(
            sectionId, 
            {sectionName},
            {new: true},
        );

        //  Step: 4 --> return res
        return res.status(200).json({
            success: true,
            message: "Section created successfully",
        });
        
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Unable to update the Section, please try again",
            error: error.message,
        });
        
    }
}



exports.deleteSection = async(req, res) =>{

    /**
     * Step: 1 --> get ID
     * Step: 2 --> use findByIdandDelet
     * Step: 3 --> return res
     */

    try {

        // * Step: 1 --> get ID
        // Assuming Id we are sending through route params
        const {sectionId} = req.params;

        // * Step: 2 --> use findByIdandDelet
        // TODO: do we need to delete the entry from the course schema ??
        await Section.findByIdAndDelete(sectionId);

        // * Step: 3 --> return res
        return res.status(200).json({
            success: true,
            message: "Section Deleted Successfully",
        })
        
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Unable to delete the Section, please try again",
            error: error.message,
        });
        
        
    }

}
