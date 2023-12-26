const Category = require("../models/Category");



// createe Category ka handler function

exports.createCategory = async (req, res) => {

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
        const CategoryDetails = await Category.create({
            name: name,
            description: description,
        });
        console.log("Category Details is: ",CategoryDetails);

        // return res
        return res.status(200).json({
            success: truek,
            message: "Category created successfully",
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }

}



// Get All Categorys ka handler function

exports.showAllCategories = async(req, res) => {
    try {

        const allCategorys = await Category.find(
            // find all Categorys 
            {},
            // name and description is mendatary
            {
                name:true,
                description: true,
            }
        );

        return res.status(200).json({
            success: true,
            message: "All Categorys returned successfully",
            allCategorys,
        })

        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


// categoryPageDetail
exports.categoryPageDetails = async (req, res) => {

    /**
     * Step: 1 --> get categoryId
     * Step: 2 --> get cousrses for specified categoryId
     * Step: 3 --> validation
     * Step: 4 --> get course for different categorie
     * Step: 5 --> get top selling courses
     * Step: 6 --> return res
     */

	try {

        // * Step: 1 --> get categoryId
        const {categoryId} = req.body;

        // * Step: 2 --> get cousrses for specified categoryId
        const selectedCetogry = await Category.findById(categoryId)
            .populate("courses")
            .exec();

        // * Step: 3 --> validation
        if(!selectedCetogry){
            return res.status(404).json({
                success: false,
                message: "Data Not Found",
            });
        }

        // * Step: 4 --> get course for different categorie
        const differentCategories = await Category.find(
            {_id: {$ne: categoryId}},
        )
        .populate("courses")
        .exec();

        // * Step: 5 --> get top selling courses
        // Hw

        // * Step: 6 --> return res
        return res.status(200).json({
            success: true,
            data: {
                selectedCetogry,
                differentCategories,
            }
        });
		
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};

