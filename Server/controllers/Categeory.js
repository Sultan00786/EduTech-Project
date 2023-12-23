const Categeoty = require("../models/Categeoty");



// createe Categeoty ka handler function

exports.createrCategeoty = async (req, res) => {

    /**
     * Step: 1 --> data fetch
     * Step: 2 --> validation of data
     * Step: 3 --> create entry in DB
     * Step: 4 --> return res
     */

    try {

        // fetch data 
        const {name, description} = req.body;

        // data validation
        if(!name || !description){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        //  create entry in DB
        const CategeotyDetails = await Categeoty.create({
            name: name,
            description: description,
        });
        console.log("Categeoty Details is: ",CategeotyDetails);

        // return res
        return res.status(200).json({
            success: truek,
            message: "Categeoty created successfully",
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }

}



// Get All Categeotys ka handler function

exports.showAllCategeotys = async(req, res) => {
    try {

        const allCategeotys = await Categeoty.find(
            // find all Categeotys 
            {},
            // name and description is mendatary
            {
                name:true,
                description: true,
            }
        );

        return res.status(200).json({
            success: true,
            message: "All Categeotys returned successfully",
            allCategeotys,
        })

        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

