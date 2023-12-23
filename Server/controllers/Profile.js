const { TopologyDescriptionChangedEvent } = require("mongodb");
const Profile = require("../models/Profile");
const User = require("../models/User");



// udate Profile
exports.updateProfile = async (req, res) => {

    /**
     * Step: 1 --> fetch data 
     * Step: 2 --> get userId
     * Step: 3 --> validation
     * Step: 4 --> find profile from db
     * Step: 5 --> update profile in db
     * Step: 6 --> return res
     */

    try {

        // * Step: 1 --> fetch data 
        const {dateOfBirth="", about="", contactNumber, gender} = req.body;

        // * Step: 2 --> get userId
        const Id = req.user.id;

        // * Step: 3 --> validation
        if(!contactNumber || !gender || Id){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // * Step: 4 --> find profile from db
        const userDetails = await User.findById(Id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        // * Step: 5 --> update profile in db
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNamber = contactNumber;

        await profileDetails.save();
        
        // * Step: 6 --> return res
        return res.status(200).json({
            success:true,
            message: "profile Upload successfully",
        });

        
    } catch (error) {

        return res.status(500).json({
            success: false,
            error: error.message,
        })
        
    }
}



// delete Account
// Explore -> how can we schedule delete option

exports.deleteAccount = async (req, res )=> {

    /**
     * Step: 1 --> get userId
     * Step: 2 --> validation
     * Step: 3 --> delete profile from db
     * Step: 4 --> delete User in db
     * Step: 5 --> return res
     */

    try {

        //  * Step: 1 --> get userId
        const id = req.user.id;

        //  * Step: 2 --> validation
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        //  * Step: 3 --> delete profile from db
        await Profile.findByIdAndDelete({_id: userDetails.additionalDetails});

        //  * Step: 4 --> delete User in db
        // TODO: hw uneroll user from all enrolled courses
        await User.findByIdAndDelete({_id:id});

        //  * Step: 5 --> return res
        return res.status(200).json({
            success: true,
            message: "User deteled Successfully"
        })
        
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}


// get all user details 

exports.getAllUserDetails = async (req, res) => {
    try {

        const id = req.user.id;

        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        return res.status(200).json({
            success: true,
            message: "We get Successfully all user details",
            userDetails,
        })
        
    } catch (error) {

        return res.status(500).json({
            success: false,
            error: error.message,
        });
        
    }
}

