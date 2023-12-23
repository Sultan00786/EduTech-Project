
const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();


// creat handle for subsection
exports.createSubSection = async (req, res) => {

    /**
     * Step: 1 --> fetch data from req.body
     * Step: 2 --> fetch file from req.files.fileName
     * Step: 3 --> validation
     * Step: 4 --> upload video to cloudinary
     * Step: 5 --> create a sub section
     * Step: 6 --> update section with this sub section ObjectId
     * Step: 7 --> return res
     */

    try {

        // * Step: 1 --> fetch data from req.body
        const {sectionId, title, timeDuration, description} = req.body;

        // * Step: 2 --> fetch file from req.files.fileName
        const video = req.files.videoFile;
        
        // * Step: 3 --> validation
        if(!sectionId || !title || !timeDuration || !description){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // * Step: 4 --> upload video to cloudinary
        const uplaodDetials = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        // * Step: 5 --> create a sub section
        const SubSectionDetails = await SubSection.create({
            title: title,
            timeDuration: timeDuration,
            description: description,
            videoUrl: uplaodDetials.secure_url,
        });
        
        // * Step: 6 --> update section with this sub section ObjectId
        // hw: log updated section here using populate query
        const updatedSection = await Section.findByIdAndUpdate(
            {_id: sectionId},
            {
                $push:{
                    subSection:SubSectionDetails._id,
                }
            },
            {new: true}
        );

        // * Step: 7 --> return res
        return res.status(200).json({
            success: true,
            message: "Sub section created successfully",
        });
        
        
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal server Error",
            error: error.message,
        });
        
        
    }
}



// update handle for subsection
exports.updateSubSectionl = async (req, res) => {

    /**
     * Step: 1 --> data fetch
     * Step: 2 --> validation of data
     * Step: 3 --> update the data
     * Step: 4 --> return res
     */

    try {

        // * Step: 1 --> data fetch
        const {title, subSectionId} = req.body;

        // * Step: 2 --> validation of data
        if(!title || !subSectionId){
            return res.status(400).json({
                success: false,
                message: "missing properties",
            });
        }

        // * Step: 3 --> update the data
        const updateDetails = await SubSection.findByIdAndUpdate(
            {_id: subSectionId},
            {title: title},
            {new: true},
        );

        // * Step: 4 --> return res
        return res.status(200).json({
            success: true,
            message: "Sub Section created successfully",
        });
        
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal server Error",
            error: error.message,
        });
        
        
    }
}



// delete handle for subsection

exports.deleteSubSection = async(req, res) =>{

    /**
     * Step: 1 --> get ID
     * Step: 2 --> use findByIdandDelet
     * Step: 3 --> return res
     */

    try {

        // * Step: 1 --> get ID
        // Assuming Id we are sending through route params
        const {subSectionId} = req.params;

        // * Step: 2 --> use findByIdandDelet
        // TODO: do we need to delete the entry from the course schema ??
        await Section.findByIdAndDelete(subSectionId);

        // * Step: 3 --> return res
        return res.status(200).json({
            success: true,
            message: "Sub Section Deleted Successfully",
        })
        
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Unable to delete the Sub Section, please try again",
            error: error.message,
        });
        
        
    }

}
